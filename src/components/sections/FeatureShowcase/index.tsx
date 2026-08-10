"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import FeaturePanel from "./FeaturePanel";
import { PANEL_KEYS, THEME } from "./theme";
import { Highlighter } from "@/components/ui/highlighter";

// Card stack (position:sticky, scroll-progress fade) removed entirely: it
// needed its sticky elements resolving against the true viewport scroll
// container, which put it in direct conflict with clipping horizontal
// overflow anywhere upstream (html/body or any shared ancestor) — any
// container between it and the viewport with a non-visible overflow axis
// breaks it. A plain alternating Z-pattern layout (mobile: stacked normally,
// lg+: image/content sides swap per card) has no such dependency.
export default function FeatureShowcase() {
  const t = useTranslations("featureShowcase");

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 py-8 lg:py-16 px-4 sm:px-6">
      <Reveal className="mx-auto mb-4 lg:mb-8 max-w-2xl text-left rtl:lg:text-center rtl:text-right lg:text-center">
        <h2 className="text-balance text-talento-primary lg:whitespace-break-spaces">
          {t("heading")}{" "}
          <Highlighter action="highlight" strokeWidth={1} color="#57dfa6" animationDuration={400}>
            {t("headingHighlight")}
          </Highlighter>
        </h2>
      </Reveal>

      <div className="flex flex-col gap-3 lg:gap-8">
        {PANEL_KEYS.map((key, i) => (
          <Reveal key={key} delay={i * 0.05}>
            <article className={cn("overflow-hidden rounded-2xl", THEME[key].bg)}>
              <FeaturePanel panelKey={key} reversed={i % 2 === 1} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
