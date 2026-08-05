import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const leadSchema = z.object({
  companyName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(180),
  role: z.string().trim().min(1).max(120),
  country: z.string().trim().min(1).max(120),
  // Honeypot — bots fill every field; humans never see it (hidden via CSS).
  // No length constraint here so a filled value doesn't surface as a
  // validation error — it's handled silently below instead.
  website: z.string().optional(),
});

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // ---- Origin check — reject cross-site form posts in production ----
  const origin = req.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (
    process.env.NODE_ENV === "production" &&
    allowedOrigin &&
    origin &&
    origin !== allowedOrigin
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ---- Rate limit (best-effort, per IP) ----
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`lead:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests, please try again shortly." },
      { status: 429 },
    );
  }

  // ---- Validate body ----
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const { companyName, email, role, country, website } = parsed.data;

  // Honeypot tripped — silently pretend success so bots don't learn.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resendApiKey || !toEmail) {
    console.warn(
      "[api/lead] RESEND_API_KEY or LEAD_TO_EMAIL not set — skipping email send. See .env.example.",
    );
    return NextResponse.json({ ok: true, mailSkipped: true });
  }

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: `Talento Hiring <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New hiring lead — ${escapeHtml(companyName)}`,
      html: `
        <h2>New hiring lead</h2>
        <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Position required:</strong> ${escapeHtml(role)}</p>
        <p><strong>Target country:</strong> ${escapeHtml(country)}</p>
      `,
    });
  } catch (err) {
    console.error("[api/lead] Resend send failed:", err);
    return NextResponse.json(
      { error: "Could not send your request, please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
