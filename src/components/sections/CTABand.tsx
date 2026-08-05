"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import DriftWall from "../DriftWall";

const items = [
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls' },
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls' },
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls' },
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls' },
];

export default function CTABand() {
  const t = useTranslations("ctaBand");

  return (
    <section className="mx-4 lg:mx-auto max-w-7xl overflow-hidden rounded-2xl bg-talento-primary">
      <div className="flex w-full flex-col items-center lg:flex-row lg:items-stretch">
        <Reveal className="w-full px-5 py-8 text-start sm:px-6 sm:py-10 lg:w-[45%] lg:shrink-0 lg:ps-12 lg:pe-0 lg:py-0 lg:flex lg:flex-col lg:justify-center">
          <h2 className="font-heading text-2xl whitespace-pre-line font-bold text-white sm:text-3xl lg:text-4xl">
            {t("heading")} <span className="text-talento-green whitespace-pre-line">{t("headingHighlight")}</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/70 sm:mt-4 sm:text-base">{t("subtext")}</p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href="#lead-form"
              className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-7" })}
            >
              {t("ctaSecondary")}
            </Link>
            <Link
              href="#lead-form"
              className={buttonVariants({
                size: "lg",
                className: "bg-talento-green text-talento-primary hover:bg-talento-green-dark rounded-full px-7",
              })}
            >
              {t("ctaPrimary")}
            </Link>
          </div>
        </Reveal>

        <div className="relative h-[260px] w-full  sm:h-[380px] lg:h-[560px] lg:w-[55%]">
          <DriftWall
            items={items}
            columns={3}
            tileWidth={200}
            tileHeight={198}
            gap={18}
            tilt={26}
            turn={-12}
            perspective={1200}
            depth={120}
            speed={25}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.6}
            dim={0.55}
            overlayColor="#000000"
            radius={14}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
          />
        </div>
      </div>
    </section>
  );
}
