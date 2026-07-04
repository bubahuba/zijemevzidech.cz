import { apiBase } from "./constants";

const fetchOptions = { next: { revalidate: 600 } };

export async function fetchMenu() {
  const res = await fetch(`${apiBase}menu`, fetchOptions);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCategoryEntries(category) {
  const res = await fetch(`${apiBase}entries/c/${category}`, fetchOptions);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchEntry(slug) {
  const res = await fetch(`${apiBase}entry/${slug}`, fetchOptions);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchOdvodoLists() {
  const data = await fetchCategoryEntries("odvodo");
  if (!Array.isArray(data)) return null;
  return data.map(({ title, slug }) => ({ title, slug }));
}

export async function fetchAllCategoryParams() {
  const menu = await fetchMenu();
  if (!menu) return [];
  return menu.map(({ slug }) => ({ category: slug }));
}

export async function fetchAllEntryParams() {
  const menu = await fetchMenu();
  if (!menu) return [];

  const params = [];
  for (const { slug: category } of menu) {
    const entries = await fetchCategoryEntries(category);
    if (!Array.isArray(entries)) continue;
    for (const { slug: entry } of entries) {
      params.push({ category, entry });
    }
  }
  return params;
}

export async function fetchAllOdvodoListParams() {
  const lists = await fetchOdvodoLists();
  if (!lists) return [];
  return lists.map(({ slug }) => ({ list: slug }));
}

export async function getLayoutPageData(category, entry) {
  const cat = category || "aktivity";
  const [navItems, data] = await Promise.all([
    fetchMenu(),
    entry ? fetchEntry(entry) : fetchCategoryEntries(cat),
  ]);

  const categoryTitle = navItems?.find((item) => item.slug === cat)?.title;
  const isError = !data || (Array.isArray(data) && data.length === 0);

  return { navItems, data, categoryTitle, isError };
}

export async function getOdvodoPageData(listSlug) {
  const lists = await fetchOdvodoLists();
  if (!lists?.length) {
    return {
      lists: null,
      currentList: null,
      entries: null,
      globalTime: null,
    };
  }

  const currentList =
    listSlug && listSlug !== "all"
      ? lists.find((item) => item.slug === listSlug) ?? lists[0]
      : lists[0];

  const entryData = await fetchEntry(currentList.slug);

  return {
    lists,
    currentList,
    entries: entryData?.[0]?.related ?? null,
    globalTime: entryData?.[0]?.global_time ?? null,
  };
}
