"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const FLAGS: Record<string, string> = { en: "🇬🇧", ar: "🇸🇦" };
const LANGUAGE_NAMES: Record<string, string> = { en: "English", ar: "العربية" };

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-0">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between rounded-full backdrop-blur-2xl bg-[#EDEDEDA3]">
        <Link href="/" className="flex items-center px-3 py-3 sm:px-4 sm:py-3.5">
          <Image
            src="/assets/images/Icon Talento Logo.svg"
            alt="Talento"
            width={160}
            height={160}
            className="h-10 w-auto sm:h-14"
          />
        </Link>

        <div className="flex items-center gap-3 pe-3 sm:gap-5 sm:pe-4">
          <Link
            href={pathname}
            locale={otherLocale}
            aria-label={`Switch to ${LANGUAGE_NAMES[otherLocale]}`}
            title={LANGUAGE_NAMES[otherLocale]}
            className="flex h-8 w-8 p-5 bg-white shrink-0 items-center justify-center rounded-full text-lg leading-none transition-transform hover:scale-110"
          >
            <span aria-hidden="true">{FLAGS[otherLocale]}</span>
          </Link>

          <Link
            href="#lead-form"
            className={buttonVariants({ size: "lg", className: "px-4 text-sm sm:px-5 sm:text-base" })}
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
