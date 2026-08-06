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

const HIGHLIGHT_KEYS = ["h1", "h2", "h3"] as const;

export default function FeaturePanel({ panelKey, isLast = false }: { panelKey: PanelKey; isLast?: boolean }) {
  const t = useTranslations("featureShowcase");
  const theme = THEME[panelKey];
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHighlightIndex((i) => (i + 1) % HIGHLIGHT_KEYS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const activeHighlightKey = HIGHLIGHT_KEYS[highlightIndex];

  return (
    // pb-12 lg:-mb-12 reserves stacking room for the next card sliding in
    // underneath (ScrollStack overlap) — the last card has nothing stacking
    // after it, so it gets no reserve instead of an unused 48px gap.
    <div className={cn("grid h-full grid-cols-1 gap-0 lg:grid-cols-2", isLast ? "pb-0" : "pb-12 lg:-mb-12")}>
      <div className="flex flex-col justify-between gap-8 px-6 pt-8 pb-6 sm:px-8 lg:ps-12 lg:pt-12 lg:pb-16 lg:pe-0">
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
            <Link href="#lead-form" className={buttonVariants({ size: "default", variant: "outline" })}>
              {t(`panels.${panelKey}.secondaryCta`)}
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
