"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Lenis defaults to syncTouch:false (native touch scroll passthrough —
    // it only smooths wheel/mouse input), so it wasn't the direct cause of
    // the mobile scroll glitch. But it still runs its own rAF loop doing
    // real JS work every frame for as long as it's smoothing a wheel
    // gesture, and (pointer: coarse) devices have no wheel input at all —
    // there's nothing for it to do there but add main-thread overhead
    // alongside native touch scrolling. Skipping Lenis entirely on touch
    // devices instead of just tuning its options; native mobile scroll
    // physics don't need JS smoothing on top of them.
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    let lenis: Lenis | null = null;
    if (!isCoarsePointer) {
      // duration was 2.2s — any single dropped frame mid-ease reads as a
      // multi-hundred-ms "stuck" moment at that length. 1.2s is Lenis's own
      // typical default territory: still smooth, far less exposed to jank.
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const activeLenis = lenis;
      const raf = (time: number) => {
        activeLenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Smooth-scroll every in-page anchor link (every CTA pointing at
    // "#lead-form", "#how-it-works", etc.). Lenis only intercepts
    // wheel/touch scroll by default, not anchor clicks — without this,
    // those links still did the browser's instant native jump regardless
    // of the Lenis instance existing. On touch devices (no Lenis instance),
    // falls back to a plain native scrollTo with the same header-clearing
    // offset — scrollIntoView doesn't support a pixel offset directly.
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
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -96 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
