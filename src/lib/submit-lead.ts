import { ROLE_EN_LABELS, COUNTRY_EN_LABELS } from "@/lib/form-options";

export type LeadFormValues = {
  companyName: string;
  email: string;
  role: string;
  country: string;
  website?: string;
};

/**
 * POSTs a lead to /api/lead. Role/country are re-mapped to their fixed
 * English label (see form-options.ts) so the leads the internal team
 * receives stay consistent regardless of the UI locale the form was
 * submitted in. Shared by LeadForm.tsx and FooterForm.tsx — same payload
 * shape, same endpoint, only the surrounding form UI/copy differs.
 */
export async function submitLead(values: LeadFormValues): Promise<void> {
  const payload = {
    ...values,
    role: ROLE_EN_LABELS[values.role as keyof typeof ROLE_EN_LABELS] ?? values.role,
    country: COUNTRY_EN_LABELS[values.country as keyof typeof COUNTRY_EN_LABELS] ?? values.country,
  };

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? "Something went wrong");
  }
}
