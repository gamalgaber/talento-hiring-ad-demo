"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-3 z-50 px-2 sm:px-0">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between rtl:flex-row-reverse rounded-full backdrop-blur-3xl bg-talento-primary-50">
        <Link href="/" className="flex items-center px-2.5 py-2.5 sm:px-4 sm:py-3.5">
          {/* width/height match the SVG's real viewBox (811.55 x 171.8, a
              ~4.7:1 wide icon+wordmark lockup despite the "Vertical-" in
              the filename) — next/image uses these props to compute the
              image's aspect ratio, not the file's actual content. The
              previous 160x160 (square) values forced a false 1:1 ratio,
              which squeezed the wordmark down to an imperceptible sliver
              and left only the icon looking normal-sized. */}
          <Image
            src="/assets/images/Vertical-Talento-Logo.svg"
            alt="Talento"
            width={812}
            height={172}
            className="h-8 w-auto sm:h-10 rtl:h-7 rtl:sm:h-9"
          />
        </Link>

        <div className="flex items-center gap-2 pe-3 sm:gap-3 sm:pe-4 rtl:flex-row-reverse rtl:ps-3 rtl:sm:ps-4">
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
