"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const DISMISS_KEY = "talento-join-us-dismissed";

export default function JoinUsBar() {
  const t = useTranslations("joinUs");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem(DISMISS_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
        >
          <div className="bg-talento-primary mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl px-6 py-5 shadow-2xl sm:flex-row sm:justify-between sm:px-8">
            <div className="text-center sm:text-start">
              <p className="font-heading text-lg font-bold text-white">{t("title")}</p>
              <p className="mt-1 text-sm text-white/60">{t("description")}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link href="#" className={buttonVariants({ size: "lg", variant: "outline" })}>
                {t("cta")}
              </Link>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
