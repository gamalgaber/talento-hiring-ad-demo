export const PANEL_KEYS = ["sourcing", "matching", "vetting", "guarantee"] as const;
export type PanelKey = (typeof PANEL_KEYS)[number];

export type HighlightKey = "h1" | "h2" | "h3";

export const THEME: Record<
  PanelKey,
  { bg: string; text: string; eyebrowClass: string; highlightKeys: readonly HighlightKey[] }
> = {
  sourcing: {
    bg: "bg-talento-primary-light",
    text: "text-white",
    eyebrowClass: "bg-talento-primary text-talento-green",
    highlightKeys: ["h1", "h2", "h3"],
  },
  matching: {
    bg: "bg-talento-orange",
    text: "text-white",
    eyebrowClass: "bg-white text-talento-orange",
    highlightKeys: ["h1", "h2", "h3"],
  },
  // Only h1/h2 exist in messages/{en,ar}.json for this panel — hardcoding
  // h1/h2/h3 for every panel here made the cycle reach for a nonexistent
  // h3 on this one, throwing MISSING_MESSAGE.
  vetting: {
    bg: "bg-talento-green",
    text: "text-talento-primary",
    eyebrowClass: "bg-white text-talento-primary",
    highlightKeys: ["h1", "h2"],
  },
  guarantee: {
    bg: "bg-talento-dark",
    text: "text-white",
    eyebrowClass: "bg-talento-green text-talento-primary",
    highlightKeys: ["h1", "h2", "h3"],
  },
};
