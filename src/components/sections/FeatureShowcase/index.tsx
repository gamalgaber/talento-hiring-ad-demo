"use client";

import { useTranslations } from "next-intl";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack/ScrollStack";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import FeaturePanel from "./FeaturePanel";
import { PANEL_KEYS, THEME } from "./theme";
import { Highlighter } from "@/components/ui/highlighter";

export default function FeatureShowcase() {
  const t = useTranslations("featureShowcase");

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 pt-16 pb-0 md:pb-10 lg:pt-16 lg:pb-0 px-4 sm:px-6">
      <Reveal className="mx-auto mb-8 max-w-2xl text-left rtl:lg:text-center rtl:text-right lg:text-center">
        <h2 className="text-balance text-talento-primary lg:whitespace-break-spaces">{t("heading")}{" "}<Highlighter action="highlight" strokeWidth={1} color="#57dfa6" animationDuration={400}>{t("headingHighlight")}</Highlighter></h2>
      </Reveal>

      <ScrollStack
        useWindowScroll
        itemDistance={0}
        itemScale={0.05}
        itemStackDistance={30}
        stackPosition="15%"
        scaleEndPosition="8%"
        baseScale={0.9}
      >
        {PANEL_KEYS.map((key, i) => (
          <ScrollStackItem
            key={key}
            itemClassName={cn(
              "rounded-2xl",
              THEME[key].bg,
              i === PANEL_KEYS.length - 1 && "overflow-visible rounded-b-2xl",
            )}
          >
            <FeaturePanel panelKey={key} isLast={i === PANEL_KEYS.length - 1} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section >
  );
}
