"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";

const LOGO_COUNT = 32;
const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => `Artboard ${i + 1}.svg`);

function TrustedLogos({ label }: { label: string }) {
  return (
    <div className="relative mt-30 w-full max-w-[95%] rounded-2xl border border-talento-border bg-white pt-4 pb-4">
      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-4 text-sm font-medium text-talento-muted">
        {label}
      </span>
      <Marquee gradient gradientColor="255,255,255" gradientWidth={60} speed={30} pauseOnHover>
        {LOGOS.map((file, i) => (
          <div key={file} className="flex h-9 items-center">
            <Image
              src={`/assets/images/logos/${file}`}
              alt={`Partner logo ${i + 1}`}
              width={100}
              height={36}
              className="h-14 w-auto max-w-40 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tForm = useTranslations("leadForm");

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-0 px-4 pb-10 pt-24 sm:px-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col justify-start items-start gap-6">
          <div className="flex flex-col justify-start items-start gap-5">
            <h1 className="text-balance text-talento-primary">
              {t("titlePrefix")} <span className="text-talento-orange">{t("titleHighlight")}</span>
            </h1>
            <p className="max-w-md text-lg font-normal text-talento-muted">{t("subheading")}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="#lead-form" className={buttonVariants({ size: "lg" })}>
              {t("ctaPrimary")}
            </Link>
            <Link href="#how-it-works" className={buttonVariants({ size: "lg", variant: "outline" })}>
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <TrustedLogos label={t("trustedLabel")} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <LeadForm
          id="lead-form"
          variant="dark"
          subtitle={tForm("subtitle")}
          title={tForm("title")}
          submitLabel={tForm("submit")}
          trustText={tForm("trustText")}
          className="h-full"
        />
      </motion.div>
    </section >
  );
}
