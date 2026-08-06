export const PANEL_KEYS = ["sourcing", "matching", "vetting", "guarantee"] as const;
export type PanelKey = (typeof PANEL_KEYS)[number];

export const THEME: Record<PanelKey, { bg: string; text: string; eyebrowClass: string }> = {
  sourcing: { bg: "bg-talento-primary-light", text: "text-white", eyebrowClass: "bg-talento-primary text-talento-green" },
  matching: { bg: "bg-talento-orange", text: "text-white", eyebrowClass: "bg-white text-talento-orange" },
  vetting: { bg: "bg-talento-green", text: "text-talento-primary", eyebrowClass: "bg-white text-talento-primary" },
  guarantee: { bg: "bg-talento-dark", text: "text-white", eyebrowClass: "bg-talento-green text-talento-primary" },
};
