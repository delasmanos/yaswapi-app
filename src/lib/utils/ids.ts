export const extractId = (url: string): string => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? ""; // Handle undefined if url is empty
};
