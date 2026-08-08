import staticPaths from "@/data/static-paths.json";
import { apiBase } from "./constants";
import { safeFetchJson } from "./fetch";

const useStaticPathsOnly =
  process.env.SKIP_API_FETCH === "0"
    ? false
    : process.env.SKIP_API_FETCH === "1" ||
      process.env.CI === "true" ||
      process.env.CF_PAGES === "1" ||
      process.env.WORKERS_CI === "1";

const fetchOptions =
  process.env.STATIC_EXPORT === "1"
    ? { cache: "force-cache" }
    : { next: { revalidate: 600 } };

export async function fetchMenu() {
  return safeFetchJson(`${apiBase}menu`, fetchOptions);
}

export async function fetchCategoryEntries(category) {
  return safeFetchJson(`${apiBase}entries/c/${category}`, fetchOptions);
}

export async function fetchEntry(slug) {
  return safeFetchJson(`${apiBase}entry/${slug}`, fetchOptions);
}

export async function fetchOdvodoLists() {
  const data = await fetchCategoryEntries("odvodo");
  if (!Array.isArray(data)) return null;
  return data.map(({ title, slug }) => ({ title, slug }));
}

export async function fetchAllCategoryParams() {
  if (useStaticPathsOnly) {
    console.warn("[api] CI build: using static category paths");
    return staticPaths.categories;
  }
  const menu = await fetchMenu();
  if (menu) return menu.map(({ slug }) => ({ category: slug }));
  console.warn("[api] using fallback category paths");
  return staticPaths.categories;
}

export async function fetchAllEntryParams() {
  if (useStaticPathsOnly) {
    console.warn("[api] CI build: using static entry paths");
    return staticPaths.entries;
  }
  const menu = await fetchMenu();
  if (!menu) {
    console.warn("[api] using fallback entry paths");
    return staticPaths.entries;
  }

  const params = [];
  for (const { slug: category } of menu) {
    const entries = await fetchCategoryEntries(category);
    if (!Array.isArray(entries)) continue;
    for (const { slug: entry } of entries) {
      params.push({ category, entry });
    }
  }

  return params.length ? params : staticPaths.entries;
}

export async function fetchAllOdvodoListParams() {
  if (useStaticPathsOnly) {
    console.warn("[api] CI build: using static map list paths");
    return staticPaths.lists;
  }
  const lists = await fetchOdvodoLists();
  if (lists) return lists.map(({ slug }) => ({ list: slug }));
  console.warn("[api] using fallback map list paths");
  return staticPaths.lists;
}

export async function getLayoutPageData(category, entry) {
  const cat = category || "aktivity";

  if (useStaticPathsOnly) {
    return {
      navItems: undefined,
      data: undefined,
      categoryTitle: undefined,
      isError: false,
      offline: true,
    };
  }

  const [navItems, data] = await Promise.all([
    fetchMenu(),
    entry ? fetchEntry(entry) : fetchCategoryEntries(cat),
  ]);

  // Any failed API call → let the browser refetch (don't seed RQ with null).
  if (navItems === null || data === null) {
    return {
      navItems: navItems ?? undefined,
      data: undefined,
      categoryTitle: navItems?.find((item) => item.slug === cat)?.title,
      isError: false,
      offline: true,
    };
  }

  const categoryTitle = navItems.find((item) => item.slug === cat)?.title;
  const isError = !data || (Array.isArray(data) && data.length === 0);

  return { navItems, data, categoryTitle, isError, offline: false };
}

export async function getOdvodoPageData(listSlug) {
  if (useStaticPathsOnly) {
    return {
      lists: undefined,
      currentList: undefined,
      entries: undefined,
      globalTime: undefined,
      offline: true,
    };
  }

  const lists = await fetchOdvodoLists();

  if (!lists?.length) {
    return {
      lists: undefined,
      currentList: undefined,
      entries: undefined,
      globalTime: undefined,
      offline: lists === null,
    };
  }

  const currentList =
    listSlug && listSlug !== "all"
      ? lists.find((item) => item.slug === listSlug) ?? lists[0]
      : lists[0];

  const entryData = await fetchEntry(currentList.slug);

  if (entryData === null) {
    return {
      lists,
      currentList,
      entries: undefined,
      globalTime: undefined,
      offline: true,
    };
  }

  return {
    lists,
    currentList,
    entries: entryData?.[0]?.related ?? null,
    globalTime: entryData?.[0]?.global_time ?? null,
    offline: false,
  };
}
