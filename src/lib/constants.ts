const DAILY_SECONDS = 86400;
const WEEKLY_SECONDS = 604800;
const MONTHLY_SECONDS = 2592000;

export const CACHE_CONTROL = {
  DAILY: `public, max-age=${DAILY_SECONDS}, stale-while-revalidate=${WEEKLY_SECONDS}`,
  WEEKLY: `public, max-age=${WEEKLY_SECONDS}, stale-while-revalidate=${MONTHLY_SECONDS}`,
  MONTHLY: `public, max-age=${MONTHLY_SECONDS}, stale-while-revalidate=${MONTHLY_SECONDS * 3}`,
} as const;
