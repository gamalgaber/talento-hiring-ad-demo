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
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-balance text-talento-primary">{t("heading")}</h2>
            <p className="mt-4 max-w-md text-lg text-talento-muted">{t("subheading")}</p>
          </Reveal>

          <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-hidden">
            <FloatingLogoCluster />

            <Reveal delay={0.1} className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-talento-dark/50">
                  {t("planLabel")}
                </p>
                <div className="font-heading text-talento-primary my-3 text-3xl font-extrabold">
                  {t("priceText")}
                </div>
                <p className="mb-5 text-sm text-talento-dark/60">{t("subtext")}</p>

                <ul className="mb-6 flex flex-col gap-2.5 text-start">
                  {BULLET_KEYS.map((key) => (
                    <li key={key} className="flex items-start gap-2.5 text-sm text-talento-dark/75">
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
