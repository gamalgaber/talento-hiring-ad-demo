"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import FeaturePanel from "./FeaturePanel";
import { PANEL_KEYS, THEME, type PanelKey } from "./theme";
import { Highlighter } from "@/components/ui/highlighter";

// Ported from seellr's FeatureStackCards (src/features/home/components/FeatureStackCards.tsx):
// plain CSS `position: sticky` + a scroll-progress-driven fade, instead of the
// old ScrollStack component's per-frame rAF loop recomputing translate/scale
// transforms by hand. Sticky positioning is the browser's own job — nothing
// to keep in sync with layout shifts, no rAF loop running forever, no jerk.
const STICKY_BASE = 88; // clears the sticky header
const STICKY_STEP = 20;

interface StackCardProps {
  panelKey: PanelKey;
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
}

function StackCard({ panelKey, index, total, containerProgress }: StackCardProps) {
  const shadeStart = (index + 0.6) / total;
  const shadeEnd = Math.min((index + 1) / total, 1);
  const shadeOpacity = useTransform(containerProgress, [shadeStart, shadeEnd], [0, 0.28]);

  return (
    <div
      className="relative"
      style={{
        position: "sticky",
        top: STICKY_BASE + index * STICKY_STEP,
        marginTop: index > 0 ? -(total - index) * 20 : 0,
        marginBottom: (total - 1 - index) * 20,
        zIndex: index + 1,
        paddingBottom: 20,
      }}
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)]",
          THEME[panelKey].bg,
        )}
      >
        <FeaturePanel panelKey={panelKey} />
      </article>

      {/* Shade: fades in as the next card slides over this one */}
      {index < total - 1 && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-white"
          style={{ opacity: shadeOpacity }}
        />
      )}
    </div>
  );
}

export default function FeatureShowcase() {
  const t = useTranslations("featureShowcase");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 py-16 px-4 sm:px-6">
      <Reveal className="mx-auto mb-8 max-w-2xl text-left rtl:lg:text-center rtl:text-right lg:text-center">
        <h2 className="text-balance text-talento-primary lg:whitespace-break-spaces">
          {t("heading")}{" "}
          <Highlighter action="highlight" strokeWidth={1} color="#57dfa6" animationDuration={400}>
            {t("headingHighlight")}
          </Highlighter>
        </h2>
      </Reveal>

      <div ref={containerRef} className="relative pt-2">
        {PANEL_KEYS.map((key, i) => (
          <StackCard key={key} panelKey={key} index={i} total={PANEL_KEYS.length} containerProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
