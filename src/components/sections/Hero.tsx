"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";
import ProductDemo from "./ProductDemo";
import ShinyText from "../ShinyText";
import { BorderBeam } from "../ui/border-beam";
import { Highlighter } from "../ui/highlighter";

const LOGO_COUNT = 32;
const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => `Artboard ${i + 1}.svg`);

// ShinyText and BorderBeam used to run as two independent, continuous,
// overlapping loops — both animating at once with no relationship to each
// other. This alternates them like a relay baton instead: ShinyText sweeps
// the label for SHINY_SPEED seconds, then BorderBeam takes over and sweeps
// the card border for BEAM_SPEED seconds, then back to ShinyText.
const SHINY_SPEED = 4;
const BEAM_SPEED = 4;

function TrustedLogos({ label }: { label: string }) {
  const [phase, setPhase] = useState<"shiny" | "beam">("shiny");

  useEffect(() => {
    const ms = (phase === "shiny" ? SHINY_SPEED : BEAM_SPEED) * 1000;
    const timer = setTimeout(() => setPhase((p) => (p === "shiny" ? "beam" : "shiny")), ms);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative mt-12 w-full max-w-full lg:max-w-[95%] rounded-2xl border border-talento-border lg:mt-30 bg-white pt-4 pb-4">
      <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-1 sm:px-4 text-sm font-medium text-talento-muted">
        <ShinyText
          text={label}
          speed={SHINY_SPEED}
          delay={0}
          color="var(--talento-primary)"
          shineColor="var(--talento-green)"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={phase !== "shiny"}
        />
      </span>
      <div dir="ltr">
        <Marquee gradient gradientColor="255,255,255" gradientWidth={60} speed={30}>
          {LOGOS.map((file, i) => (
            // h-14 matches the image's own height below — a shorter row (was
            // h-9 against a h-14 image) let the image overflow its row by
            // 20px, which tripped .rfm-marquee-container's overflow-y:auto
            // (react-fast-marquee's own base CSS) into showing a real
            // vertical scrollbar — the gray bar over the marquee on mobile.
            <div key={file} className="flex h-11 lg:h-14 items-center">
              <Image
                src={`/assets/images/logos/${file}`}
                alt={`Partner logo ${i + 1}`}
                width={100}
                height={36}
                className="h-11 lg:h-14 w-auto max-w-40 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
      {/* Mounted only during its own phase (not paused/hidden) so it always
          starts a clean sweep from its own beginning each time — no state
          to resume mid-cycle, since it's purely decorative with no content
          of its own that needs to stay rendered while off. */}
      {phase === "beam" && (
        <BorderBeam
          duration={BEAM_SPEED}
          size={100}
          className="from-transparent via-talento-green to-transparent"
        />
      )}
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tForm = useTranslations("leadForm");

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-5 lg:gap-0 px-4 pb-5 lg:pb-10 pt-16 lg:pt-24 sm:px-6 lg:grid-cols-2">
      <motion.div
        className="order-1 h-full"
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

      {/* Mobile stacking order (grid-cols-1, plain source order = visual
          order): content -> video -> lead form, per request. At lg+
          (grid-cols-2) this needs to drop out of the 2-col row entirely and
          become its own full-width row below — lg:order-3 pushes it after
          both the content (order-1) and the lead form (lg:order-2) in the
          grid's auto-placement, and lg:col-span-2 makes it span both
          columns instead of trying to slot into row 1. */}
      <div className="order-2 lg:order-3 lg:col-span-2 pt-0 lg:pt-10">
        <ProductDemo />
      </div>

      <motion.div
        className="order-3 lg:order-2"
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
