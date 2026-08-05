"use client";

import { useTranslations } from "next-intl";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack/ScrollStack";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import FeaturePanel from "./FeaturePanel";
import { PANEL_KEYS, THEME } from "./theme";

export default function FeatureShowcase() {
  const t = useTranslations("featureShowcase");

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24">
      <div className="pt-16 pb-0 md:pb-10 lg:pt-16 lg:pb-16">
        <Reveal className="mx-auto mb-8 max-w-2xl px-6 text-center">
          <h2 className="text-balance whitespace-pre-line text-talento-primary">{t("heading")}</h2>
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
              <FeaturePanel panelKey={key} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
