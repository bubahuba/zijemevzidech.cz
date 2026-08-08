const isCiBuild =
  process.env.CI === "true" ||
  process.env.CF_PAGES === "1" ||
  process.env.WORKERS_CI === "1" ||
  process.env.SKIP_API_FETCH === "1";

// CF Workers Builds cannot reach CF-proxied origins (hairpin). Skip network there.
// Local builds still fetch; override with SKIP_API_FETCH=0|1.
const skipApiFetch =
  process.env.SKIP_API_FETCH === "0" ? false : isCiBuild;

const FETCH_TIMEOUT_MS = skipApiFetch ? 1 : 8_000;
const FETCH_RETRIES = skipApiFetch ? 0 : 1;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function safeFetchJson(url, options = {}) {
  if (skipApiFetch) {
    console.warn(`[api] skipped at build (CI): ${url}`);
    return null;
  }

  let lastError;

  for (let attempt = 0; attempt <= FETCH_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options);
      if (!res.ok) {
        console.warn(`[api] ${res.status} ${url}`);
        return null;
      }
      return await res.json();
    } catch (error) {
      lastError = error;
      if (attempt < FETCH_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
  }

  const cause = lastError?.cause;
  const detail =
    cause?.code || cause?.message || cause || lastError?.message || lastError;
  console.warn(`[api] fetch failed ${url}:`, detail);
  return null;
}
