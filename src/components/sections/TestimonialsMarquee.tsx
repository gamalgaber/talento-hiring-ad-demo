"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import Reveal from "@/components/Reveal";
import Image from "next/image";

const TESTIMONIAL_KEYS = ["hatem", "abdulaziz", "khalid"] as const;

const AVATAR_IMGS: Record<(typeof TESTIMONIAL_KEYS)[number], string> = {
  hatem: "/assets/images/web-04.png",
  abdulaziz: "/assets/images/web-05.png",
  khalid: "/assets/images/web-06.png",
};

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
      {/* overflow-x-hidden scoped to this section's own wrapper, not
          html/body — see the matching note in WhyUsMarquee.tsx and
          globals.css. .talento-testimonials-swiper also deliberately bleeds
          past its own box via overflow:visible !important. */}
      <div className="mx-auto max-w-7xl overflow-x-hidden px-4 sm:px-6 py-10 lg:py-16">
        <Reveal className="mx-auto mb-4 lg:mb-8 max-w-2xl px-6 text-left rtl:lg:text-center rtl:text-right lg:text-center">
          <h2 className="text-talento-primary lg:whitespace-pre-line">{t("heading")}</h2>
        </Reveal>

        {/* Below sm: the vertical auto-scroll-forever marquee is a poor fit
            for a single narrow column (it already collapsed to one column
            below 580px via the CSS media query) — a swipeable carousel
            gives the user control over pacing through the 3 quotes instead.
            Same edge-fade + nav-arrow pattern as WhyUsMarquee's swiper
            (slidesPerView="auto" + centeredSlides, not a fixed 1.05 peek —
            that hard-clipped sliver of the next card at the container edge
            is what read as a stray right-side border). sm+ keeps the
            vertical marquee, which has room for columns. */}
        <div className="sm:hidden! talento-slider-horizontal ">
          <Swiper
            modules={[Autoplay, Navigation]}
            className="talento-testimonials-swiper"
            slidesPerView="auto"
            centeredSlides
            spaceBetween={16}
            loop
            speed={600}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ nextEl: ".talento-testimonials-next", prevEl: ".talento-testimonials-prev" }}
          >
            {TESTIMONIAL_KEYS.map((key) => (
              <SwiperSlide key={key}>
                <TCard
                  avatar={AVATAR_IMGS[key]}
                  name={t(`items.${key}.name`)}
                  role={t(`items.${key}.role`)}
                  company={t(`items.${key}.company`)}
                  quote={t(`items.${key}.quote`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="talento-testimonials-nav">
            <button className="talento-testimonials-prev" aria-label="Previous testimonial">
              <ChevronLeft />
            </button>
            <button className="talento-testimonials-next" aria-label="Next testimonial">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* hidden/sm:block on this outer wrapper, not on the
            .tha-marquee-section element itself: that class sets a plain
            (unlayered) `display: grid` in globals.css, which beats
            Tailwind's `hidden` utility at equal specificity — both would
            render simultaneously on mobile if combined on the same node. */}
        <div className="hidden sm:block">
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
                      avatar={AVATAR_IMGS[key]}
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
      </div>
    </section>
  );
}
