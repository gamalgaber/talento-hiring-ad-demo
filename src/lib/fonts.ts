import localFont from "next/font/local";

/**
 * Gotham — main body/UI typeface (EN).
 * Weight map mirrors the WP theme's font-text.css:
 * no dedicated 600 file → bold covers 600, no dedicated 800/900 → ultra covers both.
 */
export const gotham = localFont({
  src: [
    { path: "../fonts/gotham/gotham-light.otf", weight: "300", style: "normal" },
    { path: "../fonts/gotham/gotham-book.otf", weight: "400", style: "normal" },
    { path: "../fonts/gotham/gotham-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/gotham/gotham-bold.otf", weight: "600", style: "normal" },
    { path: "../fonts/gotham/gotham-bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/gotham/gotham-ultra.otf", weight: "800", style: "normal" },
    { path: "../fonts/gotham/gotham-ultra.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-gotham",
  display: "swap",
});

/** Rosebay — titles & statements typeface (EN headings). */
export const rosebay = localFont({
  src: [
    { path: "../fonts/rosebay/rosebay-regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/rosebay/rosebay-oblique.otf", weight: "400", style: "oblique" },
  ],
  variable: "--font-rosebay",
  display: "swap",
});

/**
 * PingAR — Arabic typeface, covers both body and headings for [dir="rtl"].
 * No dedicated 600 file → bold covers 600, matching font-text.css.
 */
export const pingAR = localFont({
  src: [
    { path: "../fonts/pingar/pingar-light.otf", weight: "300", style: "normal" },
    { path: "../fonts/pingar/pingar-regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/pingar/pingar-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/pingar/pingar-bold.otf", weight: "600", style: "normal" },
    { path: "../fonts/pingar/pingar-bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/pingar/pingar-heavy.otf", weight: "800", style: "normal" },
    { path: "../fonts/pingar/pingar-black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-pingar",
  display: "swap",
});
