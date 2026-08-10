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
      <Reveal className="mx-auto mb-8 max-w-2xl px-6 text-left rtl:lg:text-center rtl:text-right lg:text-center">
        <h2 className="text-talento-primary lg:whitespace-break-spaces">{t("heading")}</h2>
      </Reveal>

      {/* One real <table> at every breakpoint. Below the point where the 4
          columns stop fitting, it scrolls horizontally — but the Feature
          column is sticky (start-0) so it stays put as a frame of reference
          while the Talento/Agencies/Platforms columns scroll underneath it,
          instead of the whole row losing its label off the left edge. */}
      <Reveal delay={0.1} className="px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-talento-border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-100 border-collapse text-xs sm:min-w-140 sm:text-sm">
              <thead>
                <tr className="border-b border-talento-border">
                  <th className="sticky start-0 z-10 p-2.5 text-start bg-[#E2E8F0] font-semibold text-talento-dark sm:static sm:p-5">
                    {t("featureHeader")}
                  </th>
                  <th className="bg-talento-primary p-2.5 text-center sm:p-5">
                    <span className="font-rosebay! text-xs font-bold text-white sm:text-base">{t("talento")}</span>
                  </th>
                  <th className="p-2.5 text-center bg-[#E2E8F0] font-semibold text-talento-muted sm:p-5">{t("agencies")}</th>
                  <th className="p-2.5 text-center bg-[#E2E8F0] font-semibold text-talento-muted sm:p-5">{t("platforms")}</th>
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
                    <td
                      className={cn(
                        "sticky start-0 z-10 p-2.5 font-medium text-talento-dark sm:static sm:p-5",
                        i % 2 === 1 ? "bg-talento-primary-50/30" : "bg-white",
                        "sm:bg-transparent",
                      )}
                    >
                      {t(`rows.${row.key}`)}
                    </td>
                    <td className="bg-talento-primary-50/60 p-2.5 text-center sm:p-5">
                      <Mark ok={row.talento} />
                    </td>
                    <td className="p-2.5 text-center sm:p-5">
                      <Mark ok={row.agencies} />
                    </td>
                    <td className="p-2.5 text-center sm:p-5">
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
