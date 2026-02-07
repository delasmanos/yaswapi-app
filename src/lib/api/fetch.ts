const TIMEOUT = 2000;

export async function fetchWithTimeout(
  url: string,
  timeoutMs = TIMEOUT,
  retries = 2,
  config: NextFetchRequestConfig = {},
) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "force-cache",
        ...config,
      });
      //   console.log(res);
      //   if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
    } finally {
      clearTimeout(id);
    }
  }
}
