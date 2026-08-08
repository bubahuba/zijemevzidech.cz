export const DEFAULT_COLOR = "#00A4D5";
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// NEXT_PUBLIC_* is required for client components (Layout, Odvodo).
// Server code can also use API_BASE / EE_BASE / SITE_BASE.
export const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.API_BASE ||
  "https://api.zijemevzidech.cz/json/";
export const eeBase =
  process.env.NEXT_PUBLIC_EE_BASE ||
  process.env.EE_BASE ||
  "https://api.zijemevzidech.cz/index.php";
export const siteBase =
  process.env.NEXT_PUBLIC_SITE_BASE ||
  process.env.SITE_BASE ||
  "https://zijemevzidech.cz/";
export const titleBase = " ✡︎ Žijeme v Židech";
