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
    // { label: "People", href: "/people" },
  ],
} as const;
