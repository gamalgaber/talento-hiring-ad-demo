"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "swiper/css";
import Reveal from "@/components/Reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARD_KEYS = ["speed", "coverage", "culture", "noFees", "manager", "evaluation"] as const;

export default function WhyUsMarquee() {
  const t = useTranslations("whyUs");

  return (
    <section className="bg-talento-primary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="mx-auto mb-8 max-w-2xl lg:px-6 text-left rtl:text-right lg:text-center">
          <Reveal>
            <h2 className="text-talento-primary lg:whitespace-break-spaces">{t("heading")}</h2>
          </Reveal>
        </div>
        <div className="talento-slider-horizontal">
          <Swiper
            modules={[Autoplay, Navigation]}
            className="talento-why-swiper"
            slidesPerView="auto"
            centeredSlides
            spaceBetween={24}
            loop
            speed={600}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ nextEl: ".talento-why-next", prevEl: ".talento-why-prev" }}
          >
            {CARD_KEYS.map((key) => (
              <SwiperSlide key={key}>
                <div className="talento-why-card">
                  <div className="talento-why-card-top">
                    <div className="talento-why-card-bar">
                      <h5 className="talento-why-card-header">{t(`cards.${key}.title`)}</h5>
                    </div>
                    <div className="talento-why-card-content">
                      <p className="talento-why-card-text">{t(`cards.${key}.text`)}</p>
                    </div>
                  </div>
                  <div className="talento-why-card-bottom">
                    <Image
                      src="/assets/images/prototype.jpg"
                      alt={t(`cards.${key}.title`)}
                      fill
                      sizes="500px"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="talento-why-nav">
            <button className="talento-why-prev" aria-label="Previous slide">
              <ChevronLeft />
            </button>
            <button className="talento-why-next" aria-label="Next slide">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>

  );
}
