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
    <section className="mx-4 max-w-7xl overflow-hidden rounded-2xl bg-talento-primary sm:mx-auto">
      <div className="flex w-full flex-col items-center lg:flex-row lg:items-stretch">
        <Reveal className="w-full px-6 py-10 text-start lg:w-[50%] lg:shrink-0 lg:ps-12 lg:pe-0 lg:py-0 lg:flex lg:flex-col lg:justify-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {t("heading")} <span className="text-talento-green">{t("headingHighlight")}</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-white/70">{t("subtext")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="relative h-[380px] w-full overflow-hidden lg:h-[560px] lg:w-[50%]">
          <DriftWall
            items={items}
            columns={6}
            tileWidth={200}
            tileHeight={198}
            gap={18}
            tilt={16}
            turn={-14}
            perspective={1200}
            depth={120}
            speed={42}
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
