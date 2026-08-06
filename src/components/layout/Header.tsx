"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-3 z-50 px-4 sm:px-0">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between rounded-full backdrop-blur-2xl bg-talento-primary-50">
        <Link href="/" className="flex items-center px-3 py-3 sm:px-4 sm:py-3.5">
          <Image
            src="/assets/images/Icon Talento Logo.svg"
            alt="Talento"
            width={160}
            height={160}
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <div className="flex items-center gap-3 pe-3 sm:gap-5 sm:pe-4">
          <LanguageSwitcher />

          <Link
            href="#lead-form"
            className={buttonVariants({ size: "lg" })}
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
