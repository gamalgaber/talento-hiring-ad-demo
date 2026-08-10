"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LABELS: Record<Locale, string> = { en: "EN", ar: "AR" };

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ToggleGroup
      value={[locale]}
      onValueChange={(value) => {
        const next = value[0] as Locale | undefined;
        if (next && next !== locale) router.replace(pathname, { locale: next });
      }}
      size="sm"
      aria-label="Change language"
      className="rounded-lg! bg-talento-grey-background p-0.5 gap-0.5 rtl:flex-row-reverse"
    >
      {routing.locales.map((l) => (
        <ToggleGroupItem
          key={l}
          value={l}
          aria-label={LABELS[l]}
          className="rounded-md! border border-transparent px-2! text-[11px] leading-none font-semibold text-talento-muted transition data-[state=on]:border-talento-border data-[state=on]:bg-white data-[state=on]:text-talento-primary data-[state=on]:shadow-xl data-[state=off]:bg-transparent data-[state=off]:shadow-none data-[state=off]:hover:text-talento-dark"
        >
          {LABELS[l]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
