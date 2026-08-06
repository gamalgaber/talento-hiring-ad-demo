"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

const PILL_KEYS = ["expansion", "qualified", "days"] as const;

export default function CompleteTeamSection() {
  const t = useTranslations("completeTeam");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-2 lg:gap-6 lg:grid-cols-2 border border-talento-border rounded-2xl shadow-sm">
        <Reveal className="p-3 lg:p-6">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/prototype.jpg"
              alt={t("badgeCompany")}
              width={821}
              height={541}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 md:inset-x-4  bottom-0 md:bottom-4 grid lg:grid-cols-3 grid-cols-3 gap-3.5 md:gap-1.5">
              {PILL_KEYS.map((key) => (
                <div key={key} className="min-w-28 lg:min-w-30 rounded-xl bg-talento-primary pl-4 rtl:pr-4 rtl:pl-0 pr-0 py-2 lg:px-5 lg:py-4">
                  <h4 className="text-talento-green text-lg lg:text-2xl font-extrabold">
                    {t(`pills.${key}.value`)}
                  </h4>
                  <p className="mt-1 whitespace-pre-line text-xs font-medium text-white">
                    {t(`pills.${key}.label`)}
                  </p>
                </div>
              ))}
            </div>
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
