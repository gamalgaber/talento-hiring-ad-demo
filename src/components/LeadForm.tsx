"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ROLE_KEYS, COUNTRY_KEYS } from "@/lib/form-options";
import { submitLead } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

// Dark-variant field styling, shared by the two Inputs and two Selects below.
// `placeholder:` and `data-placeholder:` are distinct Tailwind variants from
// the base `text-muted-foreground` classes baked into Input/SelectTrigger, so
// each has to be overridden explicitly — setting `text-white` alone doesn't
// touch them. The chevron icon inside SelectTrigger is a hardcoded
// `text-muted-foreground` on the svg itself (not reachable via the trigger's
// className prop), so it's overridden via a `[&_svg]:` descendant selector
// instead, which wins on specificity regardless of class order.
const DARK_FIELD =
  "border-white/30 bg-white/12 text-white placeholder:text-white/55 focus-visible:border-white/55 focus-visible:ring-white/20";
const DARK_SELECT_TRIGGER = cn(DARK_FIELD, "data-placeholder:text-white/55 [&_svg]:text-white/60");

type FormValues = {
  companyName: string;
  email: string;
  role: string;
  country: string;
  website?: string;
};

export default function LeadForm({
  id,
  title,
  subtitle,
  submitLabel,
  trustText,
  variant = "light",
  className,
}: {
  id?: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  trustText?: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const t = useTranslations("leadForm");
  const tRoles = useTranslations("roles");
  const tCountries = useTranslations("countries");

  const schema = z.object({
    companyName: z.string().min(1, t("requiredError")),
    email: z.string().email(t("emailError")),
    role: z.string().min(1, t("roleError")),
    country: z.string().min(1, t("countryError")),
    // Honeypot — real users never see or fill this field.
    website: z.string().max(0).optional(),
  });

  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const dark = variant === "dark";

  async function onSubmit(values: FormValues) {
    try {
      await submitLead(values);

      setSubmitted(true);
      sileo.success({
        title: t("successTitle"),
        description: t("successDesc"),
      });
    } catch (err) {
      sileo.error({
        title: t("errorTitle"),
        description: err instanceof Error ? err.message : t("errorDescDefault"),
      });
    }
  }

  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl p-8",
        dark
          ? "bg-talento-primary text-white"
          : "bg-white text-talento-dark border border-talento-border",
        className,
      )}
    >
      <p className={cn("mb-1 text-sm font-semibold", dark ? "text-talento-green" : "text-talento-primary")}>
        {subtitle}
      </p>
      <h3 className="mb-6 text-balance whitespace-pre-line">{title}</h3>

      {submitted ? (
        <div
          className={cn(
            "rounded-xl p-4 text-sm font-medium",
            dark
              ? "bg-white/10 text-white"
              : "bg-talento-green-100 text-talento-primary",
          )}
        >
          {t("successDesc")}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Honeypot — hidden from real users via CSS, bots fill every field */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor={`${id ?? "form"}-website`}>Website</label>
            <input
              id={`${id ?? "form"}-website`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className={dark ? "text-white" : undefined}>{t("companyName")}</Label>
            <Input
              placeholder={t("companyNamePlaceholder")}
              {...register("companyName")}
              className={dark ? DARK_FIELD : undefined}
            />
            {errors.companyName && (
              <p className="text-xs text-red-400">{errors.companyName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className={dark ? "text-white" : undefined}>{t("email")}</Label>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              {...register("email")}
              className={dark ? DARK_FIELD : undefined}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className={dark ? "text-white" : undefined}>{t("position")}</Label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={cn("w-full", dark && DARK_SELECT_TRIGGER)}
                  >
                    <SelectValue placeholder={t("positionPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {tRoles(key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className={dark ? "text-white" : undefined}>{t("country")}</Label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={cn("w-full", dark && DARK_SELECT_TRIGGER)}
                  >
                    <SelectValue placeholder={t("countryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {tCountries(key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="outline"
          >
            {isSubmitting ? t("submitting") : submitLabel}
          </Button>
        </form>
      )}
    </div>
  );
}
