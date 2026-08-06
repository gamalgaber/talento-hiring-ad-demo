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
            className="block aspect-16/7 w-full cursor-pointer object-cover"
            poster="/assets/images/product-demo-poster.jpg"
            autoPlay
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            onClick={togglePlay}
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

          {/* No native controls attribute at all (that's what brought the
              browser's own scrubber/fullscreen/PiP/cast bar); disablePictureInPicture
              + disableRemotePlayback + controlsList + onContextMenu strip the
              remaining hover-triggered fullscreen/cast icons and the
              right-click "Save video as" menu that survive even without it. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4"
            style={{ background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)" }}
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t("pauseAria") : t("playAria")}
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:cursor-pointer sm:h-14 sm:w-14"
            >
              {playing ? (
                <Pause className="h-4 w-4 fill-talento-primary text-talento-primary sm:h-5 sm:w-5" />
              ) : (
                <Play className="h-4 w-4 fill-talento-primary text-talento-primary sm:h-5 sm:w-5" />
              )}
            </button>

            <div className="text-end text-white">
              <p className="text-sm font-semibold sm:text-base">{t("overlayTitle")}</p>
              <p className="text-xs text-white/75 sm:text-sm">{t("overlayRole")}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
