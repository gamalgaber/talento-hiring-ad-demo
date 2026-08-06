"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FLAGS: Record<Locale, string> = { en: "🇬🇧", ar: "🇸🇦" };
const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية" };

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      value={locale}
      onValueChange={(value) => router.replace(pathname, { locale: value as Locale })}
    >
      <SelectTrigger
        size="sm"
        aria-label="Change language"
        className="h-8 shrink-0 rounded-full! border-none bg-white border border-talento-border px-3! text-sm font-medium text-talento-dark shadow-none data-[size=sm]:h-8"
      >
        <SelectValue>
          <span aria-hidden="true">{FLAGS[locale]}</span>
          <span className="hidden sm:inline">{LANGUAGE_NAMES[locale]}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((l) => (
          <SelectItem key={l} value={l}>
            <span aria-hidden="true">{FLAGS[l]}</span>
            {LANGUAGE_NAMES[l]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
