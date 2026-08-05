import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

/**
 * Exact port of .talento-lgrid from the WP theme's css/talento-sections.css:
 * 6-col grid, CTA block spans rows 3-4 / cols 3-4. 32 logos fills the 6x6
 * grid exactly (32 cells + the CTA's 4 cells = 36 = 6 rows x 6 cols) — no
 * odd-count hiding needed. Responsive breakpoints live in globals.css.
 */

const LOGO_COUNT = 32;
const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => `Artboard ${i + 1}.svg`);

// CTA occupies cells 3-4 of row 3 and row 4 (grid-column: 3/5, grid-row: 3/4)
// in a 6-col grid — that's flat index position 14 (0-based).
const CTA_START_INDEX = 14;

export default async function LogoGrid() {
  const t = await getTranslations("logoGrid");
  const before = LOGOS.slice(0, CTA_START_INDEX);
  const after = LOGOS.slice(CTA_START_INDEX);

  return (
    <section className="w-full py-16">
      <div className="talento-lgrid">
        {before.map((file, i) => (
          <div className="talento-lgrid__cell" key={file}>
            <Image
              src={`/assets/images/logos/${file}`}
              alt={t("logoAlt", { n: i + 1 })}
              width={200}
              height={80}
              loading="lazy"
            />
          </div>
        ))}

        <div className="talento-lgrid__cta">
          <p className="talento-lgrid__cta-title">{t("ctaTitle")}</p>
          <Link href="#lead-form" className={buttonVariants({ size: "lg" })}>
            {t("cta")}
          </Link>
        </div>

        {after.map((file, i) => (
          <div className="talento-lgrid__cell" key={file}>
            <Image
              src={`/assets/images/logos/${file}`}
              alt={t("logoAlt", { n: before.length + i + 1 })}
              width={200}
              height={80}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
