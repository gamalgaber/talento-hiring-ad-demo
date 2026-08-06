"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const ROW_META = [
  { key: "speed", talento: true, agencies: false, platforms: false },
  { key: "quality", talento: true, agencies: false, platforms: false },
  { key: "payment", talento: true, agencies: true, platforms: false },
  { key: "guarantee", talento: true, agencies: false, platforms: false },
  { key: "specialization", talento: true, agencies: false, platforms: true },
] as const;

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-talento-green sm:h-7 sm:w-7">
      <Check className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" strokeWidth={3} />
    </span>
  ) : (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-talento-border/70 sm:h-7 sm:w-7">
      <X className="h-3.5 w-3.5 text-talento-muted sm:h-4 sm:w-4" strokeWidth={3} />
    </span>
  );
}

export default function ComparisonTable() {
  const t = useTranslations("comparison");

  return (
    <section className="mx-auto max-w-7xl pt-0 pb-16 lg:py-16">
      <Reveal className="mx-auto mb-8 max-w-2xl px-6 text-center">
        <h2 className="text-talento-primary whitespace-pre-line">{t("heading")}</h2>
      </Reveal>

      {/* Below sm: a real <table> just gets cropped by overflow-x-auto (the
          4th column scrolls off, as flagged) — a horizontal scrollbar on a
          5-row comparison isn't discoverable UX either. Stacked cards (one
          per feature, three-way icon row underneath) show every column at
          once with no scrolling. sm+ keeps the original table, which has
          the room for it. */}
      <Reveal delay={0.1} className="flex flex-col gap-3 px-4 sm:hidden">
        {ROW_META.map((row) => (
          <div key={row.key} className="rounded-xl border border-talento-border p-4">
            <p className="mb-3 text-sm font-semibold text-talento-dark">{t(`rows.${row.key}`)}</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center gap-2.5 rounded-lg bg-talento-primary py-2.5">
                <span className="text-[14px] font-bold font-rosebay tracking-wide text-white">{t("talento")}</span>
                <Mark ok={row.talento} />
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5  rounded-lg bg-talento-grey-background py-2.5">
                <span className="text-[12px] font-medium text-center text-talento-muted">{t("agencies")}</span>
                <Mark ok={row.agencies} />
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5  rounded-lg bg-talento-grey-background py-2.5">
                <span className="text-[12px] font-medium text-center text-talento-muted">{t("platforms")}</span>
                <Mark ok={row.platforms} />
              </div>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="hidden px-4 sm:block sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-talento-border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-120 border-collapse text-xs sm:min-w-140 sm:text-sm">
              <thead>
                <tr className="border-b border-talento-border">
                  <th className="p-3 text-start bg-[#E2E8F0] font-semibold text-talento-dark sm:p-5">
                    {t("featureHeader")}
                  </th>
                  <th className="bg-talento-primary p-3 text-center sm:p-5">
                    <span className="font-rosebay text-sm font-bold text-white sm:text-base">{t("talento")}</span>
                  </th>
                  <th className="p-3 text-center bg-[#E2E8F0] font-semibold text-talento-muted sm:p-5">{t("agencies")}</th>
                  <th className="p-3 text-center bg-[#E2E8F0] font-semibold text-talento-muted sm:p-5">{t("platforms")}</th>
                </tr>
              </thead>
              <tbody>
                {ROW_META.map((row, i) => (
                  <tr
                    key={row.key}
                    className={cn(
                      "border-b border-talento-border last:border-b-0",
                      i % 2 === 1 && "bg-talento-primary-50/30",
                    )}
                  >
                    <td className="p-3 font-medium text-talento-dark sm:p-5">{t(`rows.${row.key}`)}</td>
                    <td className="bg-talento-primary-50/60 p-3 text-center sm:p-5">
                      <Mark ok={row.talento} />
                    </td>
                    <td className="p-3 text-center sm:p-5">
                      <Mark ok={row.agencies} />
                    </td>
                    <td className="p-3 text-center sm:p-5">
                      <Mark ok={row.platforms} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
