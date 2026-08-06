"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import Image from "next/image";

const TESTIMONIAL_KEYS = ["hatem", "abdulaziz", "khalid"] as const;

function TCard({
  name,
  avatar,
  role,
  company,
  quote,
}: {
  name: string;
  avatar: string;
  role: string;
  company: string;
  quote: string;
}) {
  return (
    <div className="tha-t-card">
      <div className="tha-t-card__header">
        <div
          className="tha-t-card__avatar flex items-center justify-center"
          aria-hidden="true"
        >
          <Image
            src={avatar}
            alt={name}
            width={44}
            height={44}
            className="h-full w-full rounded-full"
          />
        </div>
        <div>
          <div className="tha-t-card__name">{name}</div>
          <div className="tha-t-card__role">
            {role} <strong>{company}</strong>
          </div>
        </div>
      </div>
      <p className="tha-t-card__quote">{quote}</p>
    </div>
  );
}

/**
 * React port of theme-customizations/hiring-ad/marquee.js — clones each
 * column's cards to fill 2x viewport height, then sets --tha-shift and
 * flips on .is-ready so the CSS animation (globals.css) can loop seamlessly.
 */
function useVerticalMarquee(sectionRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tracks = Array.from(
      section.querySelectorAll<HTMLDivElement>(".tha-marquee-track"),
    );

    tracks.forEach((track) => {
      if (track.dataset.thaInit) return;
      track.dataset.thaInit = "1";

      const originals = Array.from(track.children) as HTMLElement[];
      if (!originals.length) return;

      const setHeight = track.scrollHeight;
      if (!setHeight) return;

      const copies = Math.ceil((window.innerHeight * 2) / setHeight) + 1;
      for (let k = 0; k < copies; k++) {
        for (const original of originals) {
          track.appendChild(original.cloneNode(true));
        }
      }

      track.style.setProperty("--tha-shift", `-${setHeight}px`);
      track.classList.add("is-ready");
    });
  }, [sectionRef]);
}

export default function TestimonialsMarquee() {
  const t = useTranslations("testimonials");
  const sectionRef = useRef<HTMLDivElement>(null);
  useVerticalMarquee(sectionRef);

  const columns = [1, 2, 3];

  return (
    <section className="bg-talento-primary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <Reveal className="mx-auto mb-12 max-w-2xl px-6 text-center">
          <h2 className="text-talento-primary whitespace-pre-line">{t("heading")}</h2>
        </Reveal>

        <div className="tha-marquee-section" ref={sectionRef}>
          {columns.map((col) => (
            <div
              key={col}
              className={col === 2 ? "tha-marquee-col tha-marquee-col--offset" : "tha-marquee-col"}
            >
              <div className="tha-marquee-track">
                {TESTIMONIAL_KEYS.map((key) => (
                  <TCard
                    key={`col${col}-${key}`}
                    avatar="/assets/images/avatar.avif"
                    name={t(`items.${key}.name`)}
                    role={t(`items.${key}.role`)}
                    company={t(`items.${key}.company`)}
                    quote={t(`items.${key}.quote`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
