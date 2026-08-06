"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const FAQ_KEYS = ["duration", "fees", "plan", "guarantee", "roles"] as const;

export default function FAQSection() {
  const t = useTranslations("faq");

  return (
    <section className="bg-talento-primary-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="flex flex-col justify-center items-start">
            <h2 className="mb-0 lg:mb-6 text-balance text-talento-primary whitespace-pre-line">{t("heading")}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion className="gap-4">
              {FAQ_KEYS.map((key, i) => (
                <AccordionItem
                  key={key}
                  value={`item-${i}`}
                  className="rounded-2xl border border-talento-border bg-white transition-colors hover:border-talento-primary/30"
                >
                  <AccordionTrigger className="px-6 py-5 text-start text-base font-semibold text-talento-dark hover:no-underline  hover:cursor-pointer">
                    {t(`items.${key}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-[15px] leading-relaxed text-talento-dark/60">
                    {t(`items.${key}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
