import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import FooterForm from "@/components/FooterForm";
import {
  LinkedInIcon,
  FacebookIcon,
  XIcon,
  YouTubeIcon,
  WhatsAppIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons/social";

const SOCIALS = [
  { Icon: LinkedInIcon, label: "LinkedIn", link: "https://www.linkedin.com/company/talento-expert/" },
  { Icon: WhatsAppIcon, label: "WhatsApp", link: "https://api.whatsapp.com/send/?phone=201149820913&text&type=phone_number&app_absent=0" },
  { Icon: InstagramIcon, label: "Instagram", link: "https://www.instagram.com/talento_expert" },
  { Icon: TikTokIcon, label: "TikTok", link: "https://www.tiktok.com/@talento_expert" },
  { Icon: YouTubeIcon, label: "YouTube", link: "https://www.youtube.com/@Talento-Mena" },
  { Icon: FacebookIcon, label: "Facebook", link: "https://www.facebook.com/people/Talento/61563338247454/?mibextid=wwXIfr&rdid=U17LC0RHZwlJj4nE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1MbS5tenCT%2F%3Fmibextid%3DwwXIfr" },
  { Icon: XIcon, label: "X", link: "https://x.com/talento_expert" },
];

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
      <div className="flex flex-col gap-6 py-16">
        {/* Top bar — text left, CTA right */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-talento-grey-background px-6 py-8 sm:flex-row sm:items-center sm:px-10 sm:py-10">
          <h2 className="text-balance text-talento-dark">{t("excited")}</h2>
          <Link href="#lead-form" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
            {t("getPlan")}
          </Link>
        </div>

        {/* Logo block + form block */}
        <div className="flex flex-col gap-6 lg:flex-row">
          <Link
            href="/"
            className="flex min-h-52 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-talento-primary p-8 transition-transform hover:-translate-y-0.5 sm:p-12 lg:w-2/5 lg:p-16"
          >
            <Image
              src="/assets/images/Icon Talento Logo.svg"
              alt="Talento"
              width={200}
              height={200}
              className="h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            />
            <p className="font-rosebay text-4xl text-white sm:text-5xl lg:text-7xl">
              {t("badge")}
            </p>
          </Link>

          <div className="flex w-full flex-col items-center gap-6 rounded-2xl bg-talento-grey-background p-6 sm:p-8 lg:w-3/5">
            <div className="w-full">
              <FooterForm />
            </div>

            <div className="flex flex-col justify-center text-xs text-talento-muted sm:flex-row sm:items-center">
              <p>
                © {new Date().getFullYear()} {t("badge")}. {t("copyright")}
              </p>
            </div>
          </div>
        </div>

        {/* Social cards */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:grid-cols-7">
          {SOCIALS.map(({ Icon, label, link }) => (
            <Link
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex aspect-square items-center justify-center rounded-2xl bg-talento-grey-background text-talento-primary transition-transform hover:-translate-y-0.5"
            >
              <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
