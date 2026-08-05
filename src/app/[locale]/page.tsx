import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/sections/Hero";
import ProductDemo from "@/components/sections/ProductDemo";
import StatsBand from "@/components/sections/StatsBand";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import WhyUsMarquee from "@/components/sections/WhyUsMarquee";
import ComparisonTable from "@/components/sections/ComparisonTable";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import CompleteTeamSection from "@/components/sections/CompleteTeamSection";
import FAQSection from "@/components/sections/FAQSection";
import PricingSection from "@/components/sections/PricingSection";
import CTABand from "@/components/sections/CTABand";
import LogoGrid from "@/components/sections/LogoGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProductDemo />
      <StatsBand />
      <WhyUsMarquee />
      <FeatureShowcase />
      <ComparisonTable />
      <TestimonialsMarquee />
      <CompleteTeamSection />
      <FAQSection />
      <PricingSection />
      <CTABand />
      <LogoGrid />
    </>
  );
}
