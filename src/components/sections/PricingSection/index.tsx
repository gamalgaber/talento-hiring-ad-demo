"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import FloatingLogoCluster from "./FloatingLogoCluster";

const BULLET_KEYS = ["noUpfront", "noFee", "guarantee", "fixed"] as const;

export default function PricingSection() {
  const t = useTranslations("pricing");

  return (
    <section className="py-16 px-6 lg:px-0">
      <div className="mx-auto max-w-7xl py-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="flex flex-col justify-center items-center lg:items-start px-4 lg:px-0">
              <h2 className="font-heading text-balance text-center lg:text-left text-talento-primary">{t("heading")}</h2>
              <p className="mt-4 text-center lg:text-left max-w-lg lg:max-w-md text-lg text-talento-muted">{t("subheading")}</p>
            </div>
          </Reveal>

          <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-xl lg:max-w-2xl overflow-hidden">
            <FloatingLogoCluster />

            {/* Card centered — logo ring (already symmetric, full 360°) frames
                it evenly on every side, matching lemni.com/pricing's "Visuals". */}
            <Reveal
              delay={0.1}
              className="absolute inset-8 z-10 flex items-center justify-center sm:inset-14 lg:inset-16"
            >
              <div className="w-full rounded-2xl bg-white p-5 border border-talento-border text-center shadow-xl sm:p-8">
                <p className="text-xs font-medium uppercase tracking-wide text-talento-green">
                  {t("planLabel")}
                </p>
                <div className="font-heading text-talento-primary my-3 text-2xl font-extrabold sm:text-3xl">
                  {t("priceText")}
                </div>
                <p className="mb-5 text-sm text-talento-dark/60">{t("subtext")}</p>

                <ul className="mb-6 flex flex-col gap-2.5 text-start p-3 border border-talento-border rounded-lg sm:p-4">
                  {BULLET_KEYS.map((key) => (
                    <li key={key} className="flex items-start gap-2 font-medium text-xs text-talento-dark/75 sm:text-sm">
                      <Check className="text-talento-green mt-0.5 h-4 w-4 shrink-0" />
                      {t(`bullets.${key}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#lead-form"
                  className={buttonVariants({
                    size: "lg",
                    className: "bg-talento-primary hover:bg-talento-primary-dark w-full rounded-full",
                  })}
                >
                  {t("cta")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
