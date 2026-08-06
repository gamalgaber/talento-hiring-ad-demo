"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth-scroll every in-page anchor link (every CTA pointing at
    // "#lead-form", "#how-it-works", etc.) through this same Lenis instance.
    // Lenis only intercepts wheel/touch scroll by default, not anchor
    // clicks — without this, those links still did the browser's instant
    // native jump regardless of the Lenis instance existing.
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // Negative offset clears the sticky header so the target isn't
      // scrolled to right underneath it.
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
