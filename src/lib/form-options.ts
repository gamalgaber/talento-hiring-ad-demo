// Keys map to messages/{locale}.json under "roles"/"countries" for display,
// and to a fixed English label (below) for the value actually submitted —
// keeps emails/leads in one consistent language regardless of UI locale.

export const ROLE_KEYS = [
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "mobile",
  "uiux",
  "data",
  "other",
] as const;

export const COUNTRY_KEYS = [
  "egypt",
  "uae",
  "saudi",
  "kuwait",
  "bahrain",
  "qatar",
  "jordan",
  "other",
] as const;

export const ROLE_EN_LABELS: Record<(typeof ROLE_KEYS)[number], string> = {
  frontend: "React / Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Full Stack Developer",
  devops: "DevOps / Cloud Engineer",
  mobile: "Mobile Developer",
  uiux: "UI/UX Designer",
  data: "Data Engineer",
  other: "Other",
};

export const COUNTRY_EN_LABELS: Record<(typeof COUNTRY_KEYS)[number], string> = {
  egypt: "Egypt",
  uae: "United Arab Emirates",
  saudi: "Saudi Arabia",
  kuwait: "Kuwait",
  bahrain: "Bahrain",
  qatar: "Qatar",
  jordan: "Jordan",
  other: "Other",
};
