export const API_CONFIG = {
  BASE_URL: "https://swapi.dev/api",
  ENDPOINTS: {
    FILMS: "/films",
    PEOPLE: "/people",
    SPECIES: "/species",
    PLANETS: "/planets",
    VEHICLES: "/vehicles",
  },
} as const;

export const APP_CONFIG = {
  TITLE: "YASWAPI APP",
  DESCRIPTION: "Yet another Star Wars dictionary",
  NAV_ITEMS: [
    { label: "Home", href: "/" },
    { label: "Films", href: "/films" },
    { label: "People", href: "/people" },
  ],
} as const;

export const DAILY_SECONDS = 86400;
export const WEEKLY_SECONDS = 604800;
export const MONTHLY_SECONDS = 2592000;

export const CACHE_CONTROL = {
  DAILY: `public, max-age=${DAILY_SECONDS}, stale-while-revalidate=${WEEKLY_SECONDS}`,
  WEEKLY: `public, max-age=${WEEKLY_SECONDS}, stale-while-revalidate=${MONTHLY_SECONDS}`,
  MONTHLY: `public, max-age=${MONTHLY_SECONDS}, stale-while-revalidate=${MONTHLY_SECONDS * 3}`,
} as const;
