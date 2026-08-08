const FETCH_TIMEOUT_MS = 30_000;
const FETCH_RETRIES = 2;

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
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  const cause = lastError?.cause;
  const detail = cause?.code || cause?.message || cause || lastError?.message || lastError;
  console.warn(`[api] fetch failed ${url}:`, detail);
  return null;
}
