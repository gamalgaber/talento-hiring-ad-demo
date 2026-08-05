"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

type FormValues = {
  companyName: string;
  email: string;
  role: string;
  country: string;
  website?: string;
};

export default function FooterForm() {
  const t = useTranslations("footer");
  const tRoles = useTranslations("roles");
  const tCountries = useTranslations("countries");

  const schema = z.object({
    companyName: z.string().min(1, t("formRequiredError")),
    email: z.string().email(t("formEmailError")),
    role: z.string().min(1, t("formRoleError")),
    country: z.string().min(1, t("formCountryError")),
    website: z.string().optional(), // honeypot
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      await submitLead(values);

      reset();
      sileo.success({
        title: t("formSuccessTitle"),
        description: t("formSuccessDesc"),
      });
    } catch (err) {
      sileo.error({
        title: t("formErrorTitle"),
        description: err instanceof Error ? err.message : t("formErrorDefault"),
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full flex-col gap-5 rounded-2xl border border-talento-border bg-white p-6 sm:p-10"
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="footer-website">Website</label>
        <input id="footer-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="footer-name" className="text-base text-talento-muted">
          {t("formFullName")}
        </Label>
        <Input
          id="footer-name"
          placeholder={t("formFullNamePlaceholder")}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p className="text-xs text-red-500">{errors.companyName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="footer-email" className="text-base text-talento-muted">
          {t("formEmail")}
        </Label>
        <Input
          id="footer-email"
          type="email"
          placeholder={t("formEmailPlaceholder")}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-base text-talento-muted">{t("formRole")}</Label>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("formRolePlaceholder")} />
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
        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-base text-talento-muted">{t("formCountry")}</Label>
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("formCountryPlaceholder")} />
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
        {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="mt-1 w-full">
        {isSubmitting ? t("formSubmitting") : t("formSubmit")}
      </Button>
    </form>
  );
}
