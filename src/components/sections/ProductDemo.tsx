"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Native <video> — a player library (react-player, next-video, vidstack)
 * would just re-wrap these same browser-native attributes/events at the
 * cost of extra JS; the browser's own decoder + controls bar is the
 * fastest and lightest path for a local mp4.
 */
export default function ProductDemo() {
  const t = useTranslations("productDemo");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (ended) {
      video.currentTime = 0;
      setEnded(false);
    }
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-5 lg:pb-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl sm:rounded-3xl bg-talento-grey-background p-0 sm:p-4 border border-talento-border"
      >
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_-20px_rgba(15,76,130,0.2)]">
          <video
            ref={videoRef}
            className="block aspect-16/7 w-full object-cover"
            poster="/assets/images/product-demo-poster.jpg"
            autoPlay
            muted
            playsInline
            controls
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
              setEnded(true);
            }}
          >
            {/* webm (VP9) first — ~35% smaller than the mp4 fallback, modern browsers pick it up automatically */}
            <source src="/assets/videos/product-demo.webm" type="video/webm" />
            <source src="/assets/videos/product-demo.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bottom-12 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t("pauseAria") : t("playAria")}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:cursor-pointer sm:h-20 sm:w-20"
            >
              {playing ? (
                <Pause className="h-6 w-6 fill-talento-primary text-talento-primary sm:h-7 sm:w-7" />
              ) : (
                <Play className="h-6 w-6 fill-talento-primary text-talento-primary sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
