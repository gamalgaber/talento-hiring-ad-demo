"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      <span className="text-talento-orange">{suffix}</span>
    </span>
  );
}

export default function StatsBand() {
  const t = useTranslations("stats");

  const STATS = [
    { value: 8850, suffix: "+", label: t("professionals"), background: "bg-talento-primary-50" },
    { value: 5, suffix: t("daysSuffix"), label: t("firstBatch"), background: "bg-white" },
    { value: 98, suffix: "%", label: t("satisfaction"), background: "bg-talento-primary-50" },
    { value: 55, suffix: "+", label: t("clients"), background: "bg-white" },
  ];

  return (
    <section className="pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-talento-border bg-white">
          <div className="flex flex-col divide-y divide-talento-border sm:flex-row sm:divide-x sm:divide-y-0">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className={`flex flex-col flex-1 justify-between items-center lg:items-start p-6 sm:p-6 ${stat.background}`}>
                <p className="text-sm font-medium text-talento-dark order-2 lg:order-1">{stat.label}</p>
                <div className="font-heading mt-0 lg:mt-4 text-3xl font-extrabold text-talento-primary order-1 lg:order-2 sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
