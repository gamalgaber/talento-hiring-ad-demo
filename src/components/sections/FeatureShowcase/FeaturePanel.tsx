"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PanelKey } from "./theme";
import { THEME } from "./theme";

export default function FeaturePanel({
  panelKey,
  reversed = false,
}: {
  panelKey: PanelKey;
  reversed?: boolean;
}) {
  const t = useTranslations("featureShowcase");
  const theme = THEME[panelKey];
  const highlightKeys = theme.highlightKeys;
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    // Was a module-level ["h1","h2","h3"] cycled for every panel regardless
    // of how many highlights that panel's messages actually define —
    // vetting only has h1/h2 in both locales, so reaching for h3 there
    // threw MISSING_MESSAGE. Cycling theme.highlightKeys instead, which is
    // sized per panel to match what's really in messages/{en,ar}.json.
    setHighlightIndex(0);
    if (highlightKeys.length <= 1) return;
    const id = setInterval(() => setHighlightIndex((i) => (i + 1) % highlightKeys.length), 4000);
    return () => clearInterval(id);
  }, [highlightKeys]);

  const activeHighlightKey = highlightKeys[highlightIndex];

  return (
    // Z-pattern: content is always first in source order (mobile stacks
    // content-then-image normally); on lg+, `reversed` panels flip the
    // image to the left by pushing content to order-last instead — same
    // trick as seellr's FeatureStackCards (card.reversed ? 'lg:[&>*:first-child]:order-last' : '').
    <div className={cn("grid h-full grid-cols-1 gap-0 lg:grid-cols-2", reversed && "lg:[&>*:first-child]:order-last")}>
      <div
        className={cn(
          "flex flex-col justify-between gap-8 px-6 pt-8 pb-6 sm:px-8 lg:pt-12 lg:pb-16",
          // Content padding assumes it's on the start side (ps-12/pe-0) —
          // when reversed pushes it to the end side visually instead, the
          // padding needs to flip with it or it'd hug the wrong edge.
          reversed ? "lg:ps-0 lg:pe-12" : "lg:ps-12 lg:pe-0",
        )}
      >
        <div className="flex flex-col items-stretch justify-start gap-4">
          <span
            className={cn(
              "w-fit rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase",
              theme.eyebrowClass,
            )}
          >
            {t(`panels.${panelKey}.eyebrow`)}
          </span>
          <div className="flex flex-col items-stretch justify-start gap-3">
            <h3 className={cn("text-balance", theme.text)}>
              {t(`panels.${panelKey}.titlePrefix`)} {t(`panels.${panelKey}.titleHighlight`)}
            </h3>
            <p className={cn("max-w-md opacity-70", theme.text)}>{t(`panels.${panelKey}.description`)}</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div className="min-h-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeHighlightKey}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className={cn("text-sm leading-snug", theme.text)}
              >
                <strong>{t(`panels.${panelKey}.highlights.${activeHighlightKey}.stat`)}</strong>{" "}
                <span className="opacity-70">{t(`panels.${panelKey}.highlights.${activeHighlightKey}.text`)}</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="#lead-form" className={buttonVariants({ size: "default" })}>
              {t("cta.primary")}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex min-h-full items-center justify-center px-6 pb-6 sm:px-8 lg:p-6">
        <Image
          src="/assets/images/prototype.jpg"
          alt={t(`panels.${panelKey}.eyebrow`)}
          width={546}
          height={662}
          sizes="(min-width: 1024px) 640px, 90vw"
          className="h-auto max-h-150 w-full max-w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
