"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Bare, overlapping icon cluster behind the pricing card — exact port of
 * lemni.com/pricing's "Visuals" halo (no tile/border/background, just the
 * icon graphics themselves, tightly packed and rotated), built with our own
 * 31 partner logos instead of theirs. Positions are generated (not hand
 * placed) so radius scales with each icon's own size — bigger icons get
 * pushed further from center instead of piling on top of the card.
 */
const LOGO_COUNT = 31;

// Deterministic pseudo-random in [0, 1) — same technique as DriftWall's
// columnFactor. Pure function of the seed, so server/client render match.
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const FLOATING_LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => {
  const file = `Artboard ${i + 1}.svg`;
  const angle = (i / LOGO_COUNT) * Math.PI * 2;

  const size = Math.round((90 + pseudoRandom(i * 13 + 5) * 100) * 3); // 270–570px (3x)
  // The card sits inset from the container edge by a fixed amount at every
  // breakpoint (see PricingSection's inset-8/14/16), which keeps the card's
  // own edge at a near-constant ~40% radius from center regardless of
  // viewport — so a tight 36–44% band rings the logos right along that
  // edge, matching the reference (icons framing the card border) instead
  // of scattering deep into the container.
  const radius = 36 + pseudoRandom(i * 7 + 3) * 8;

  const top = 50 + Math.sin(angle) * radius;
  const left = 50 + Math.cos(angle) * radius;
  const rotate = Math.round((pseudoRandom(i * 17 + 11) - 0.5) * 60); // -30..30deg

  return { file, top: `${top}%`, left: `${left}%`, size, rotate, z: i % 2 === 0 ? 1 : 2 };
});

function FloatingLogo({
  file,
  top,
  left,
  size,
  rotate,
  z,
  index,
}: {
  file: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  z: number;
  index: number;
}) {
  // clamp() instead of a Tailwind breakpoint: shrinks logos on narrow
  // viewports (min bound) without fighting Framer's own inline `transform`
  // on the same element (a responsive Tailwind scale-* class would just get
  // overwritten by the animation's transform). Visible at every breakpoint
  // now — this used to be hidden below sm, which is why they never showed
  // up on mobile.
  const clampedSize = `clamp(${Math.round(size * 0.5)}px, 48vw, ${size}px)`;

  return (
    <motion.div
      className="absolute"
      style={{ top, left, width: clampedSize, height: clampedSize, zIndex: z }}
      initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={`/assets/images/logos/${file}`}
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain drop-shadow-[0_12px_20px_rgba(15,76,130,0.18)]"
      />
    </motion.div>
  );
}

export default function FloatingLogoCluster() {
  return (
    <>
      {FLOATING_LOGOS.map((logo, i) => (
        <FloatingLogo key={logo.file} {...logo} index={i} />
      ))}
    </>
  );
}
