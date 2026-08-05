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
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-talento-green">
      <Check className="h-4 w-4 text-white" strokeWidth={3} />
    </span>
  ) : (
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-talento-border/70">
      <X className="h-4 w-4 text-talento-muted" strokeWidth={3} />
    </span>
  );
}

export default function ComparisonTable() {
  const t = useTranslations("comparison");

  return (
    <section className="mx-auto max-w-7xl">
      <div className="py-16">
        <Reveal className="mx-auto mb-8 max-w-2xl px-6 text-center">
          <h2 className="text-talento-primary">{t("heading")}</h2>
        </Reveal>

        <Reveal delay={0.1} className="px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-talento-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-140 border-collapse text-sm">
                <thead>
                  <tr className="border-b border-talento-border">
                    <th className="p-5 text-start bg-[#E2E8F0] font-semibold text-talento-dark">
                      {t("featureHeader")}
                    </th>
                    <th className="bg-talento-primary p-5 text-center">
                      <span className="font-rosebay text-base font-bold text-white">{t("talento")}</span>
                    </th>
                    <th className="p-5 text-center bg-[#E2E8F0] font-semibold text-talento-muted">{t("agencies")}</th>
                    <th className="p-5 text-center bg-[#E2E8F0] font-semibold text-talento-muted">{t("platforms")}</th>
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
                      <td className="p-5 font-medium text-talento-dark">{t(`rows.${row.key}`)}</td>
                      <td className="bg-talento-primary-50/60 p-5 text-center">
                        <Mark ok={row.talento} />
                      </td>
                      <td className="p-5 text-center">
                        <Mark ok={row.agencies} />
                      </td>
                      <td className="p-5 text-center">
                        <Mark ok={row.platforms} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
