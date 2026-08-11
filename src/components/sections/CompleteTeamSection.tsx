"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

const PILL_KEYS = ["expansion", "qualified", "days"] as const;

function Pill({
  pillKey,
  t,
}: {
  pillKey: (typeof PILL_KEYS)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="min-w-0 lg:min-w-30 rounded-lg bg-talento-primary px-2 py-1.5 sm:px-3 sm:py-2 lg:px-5 lg:py-4">
      <h4 className="text-talento-green text-xs sm:text-lg lg:text-2xl font-extrabold">
        {t(`pills.${pillKey}.value`)}
      </h4>
      <p className="mt-0.5 sm:mt-1 ltr:whitespace-pre-line text-[9px] sm:text-xs font-medium text-white">
        {t(`pills.${pillKey}.label`)}
      </p>
    </div>
  );
}

export default function CompleteTeamSection() {
  const t = useTranslations("completeTeam");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:py-16 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-2 lg:gap-6 lg:grid-cols-2 border border-talento-border rounded-2xl shadow-sm">
        <Reveal className="p-3 lg:p-6">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/assets/images/prototype.jpg"
              alt={t("badgeCompany")}
              width={821}
              height={541}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full object-cover"
            />
            {/* Desktop only: overlaid on the image, bottom-anchored. */}
            <div className="hidden md:grid absolute inset-x-4 bottom-4 grid-cols-3 gap-1.5">
              {PILL_KEYS.map((key) => (
                <Pill key={key} pillKey={key} t={t} />
              ))}
            </div>
          </div>

          {/* Mobile only: normal flow, right under the image instead of
              absolutely overlaid on it. */}
          <div className="grid grid-cols-3 gap-1 mt-2 md:hidden">
            {PILL_KEYS.map((key) => (
              <Pill key={key} pillKey={key} t={t} />
            ))}
          </div>
        </Reveal>

        <div className="flex h-full flex-col items-start justify-between gap-6 p-6 sm:p-8 lg:py-16 lg:ps-10 lg:pe-14">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <p className="text-talento-orange text-sm font-semibold">{t("badgeCompany")}</p>
              <h2 className="text-balance text-talento-primary">{t("heading")}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <p className=" text-talento-dark/60">{t("text")}</p>
              <Link href="#lead-form" className={buttonVariants({ size: "lg" })}>
                {t("cta")}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
