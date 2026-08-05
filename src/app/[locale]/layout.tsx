import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sileo";
import { routing } from "@/i18n/routing";
import { gotham, rosebay, pingAR } from "@/lib/fonts";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JoinUsBar from "@/components/JoinUsBar";
import "../globals.css";

export const metadata: Metadata = {
  title: "Talento — Build Your Technical Team in One Week",
  description: "Technical recruitment in the MENA region.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering (SSG) — without this, next-intl's dynamic
  // request-locale lookup forces the whole route to render on-demand.
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${gotham.variable} ${rosebay.variable} ${pingAR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <JoinUsBar />
            <Toaster position="bottom-right" theme="light" />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
