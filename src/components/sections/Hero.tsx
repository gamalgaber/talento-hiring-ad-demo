"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";
import ShinyText from "../ShinyText";
import { BorderBeam } from "../ui/border-beam";
import { Highlighter } from "../ui/highlighter";

const LOGO_COUNT = 32;
const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => `Artboard ${i + 1}.svg`);

const SHINY_SPEED = 4;
const SHINY_DELAY = 1;
// ShinyText (yoyo=false) loops every speed+delay seconds: sweep for
// SHINY_SPEED, hold for SHINY_DELAY, repeat. BorderBeam loops continuously
// with no hold, so matching its `duration` to that same total keeps both
// animations landing back at their start in lockstep.
const BEAM_DURATION = SHINY_SPEED + SHINY_DELAY;

function TrustedLogos({ label }: { label: string }) {
  return (
    <div className="relative mt-12 w-full max-w-full lg:max-w-[95%] rounded-2xl border border-talento-border lg:mt-30 bg-white pt-4 pb-4">
      <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-1 sm:px-4 text-sm font-medium text-talento-muted">
        <ShinyText
          text={label}
          speed={SHINY_SPEED}
          delay={SHINY_DELAY}
          color="var(--talento-primary)"
          shineColor="var(--talento-green)"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
        />
      </span>
      {/* react-fast-marquee measures container width and drives its own
          translateX loop assuming LTR — under the page's dir="rtl" that math
          breaks and the whole strip renders off-screen (empty-looking).
          Isolating it in its own dir="ltr" box keeps its internal layout
          math correct regardless of page direction; it's a decorative logo
          strip, not reading-order content, so forcing ltr here is safe. */}
      <div dir="ltr">
        <Marquee gradient gradientColor="255,255,255" gradientWidth={60} speed={30}>
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
      <BorderBeam
        duration={BEAM_DURATION}
        size={100}
        className="from-transparent via-talento-green to-transparent"
      />
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tForm = useTranslations("leadForm");

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-5 lg:gap-0 px-4 pb-5 lg:pb-10 pt-16 lg:pt-24 sm:px-6 lg:grid-cols-2">
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-full flex-col justify-center items-start">
          <div className="flex flex-col justify-start items-start gap-10">
            <div className="flex flex-col justify-start items-start gap-5">
              <h1 className="text-balance whitespace-pre-line text-talento-primary">
                {t("titlePrefix")} <span className="text-talento-orange">{" "}<Highlighter action="underline" color="#f75c03" animationDuration={400}>{t("titleHighlight")}</Highlighter></span>
              </h1>
              <p className="max-w-xl lg:max-w-md text-lg font-normal text-talento-muted">{t("subheading")}</p>
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
        </div>
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
