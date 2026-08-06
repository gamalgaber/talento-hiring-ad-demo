"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import SideRays from "@/components/SideRays";

const BULLET_KEYS = ["noUpfront", "noFee", "guarantee", "fixed"] as const;

export default function PricingSection() {
  const t = useTranslations("pricing");

  return (
    <section className="relative overflow-hidden py-16 px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="flex flex-col justify-center items-center lg:items-start px-4 lg:p-8">
            <h2 className="text-balance text-left rtl:text-right lg:text-left text-talento-primary">{t("heading")}</h2>
            <p className="mt-4 text-left rtl:text-right lg:text-left max-w-lg lg:max-w-md text-lg text-talento-muted">{t("subheading")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-lg">
          <div className="relative overflow-hidden rounded-3xl border border-talento-border bg-white p-6 text-center shadow-2xl shadow-talento-primary/10 sm:p-10">

            <p className="text-xs font-medium uppercase tracking-wide text-talento-green">
              {t("planLabel")}
            </p>
            <div className="text-talento-primary my-3 text-3xl font-extrabold sm:text-4xl">
              {t("priceText")}
            </div>
            <p className="mb-6 text-sm text-talento-dark/60">{t("subtext")}</p>

            <ul className="mb-6 flex flex-col gap-3 text-start p-4 border border-talento-border rounded-xl sm:p-5">
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
                className: "bg-talento-primary w-full rounded-full",
              })}
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
