import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  // Both locales prefixed ("/ar", "/en") so both pages can be fully
  // static (●). "as-needed" put ar at bare "/", which forces Next to
  // resolve that route via middleware per-request — it can never be
  // prerendered. Bare "/" now just redirects to "/ar" (proxy.ts).
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
