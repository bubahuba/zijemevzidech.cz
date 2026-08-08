import { Layout } from "@/components/Layout";
import { fetchAllEntryParams, fetchEntry, getLayoutPageData } from "@/lib/api";
import { entryMetadata, pageMetadata } from "@/lib/metadata";

export const revalidate = 600;
export const dynamicParams = true; // new CMS slugs work without rebuilding static-paths

export async function generateStaticParams() {
  return fetchAllEntryParams();
}

export async function generateMetadata({ params }) {
  const { category, entry } = await params;
  const data = await fetchEntry(entry);

  if (!data?.[0]) {
    return pageMetadata({ title: "404 — Not found" });
  }

  return entryMetadata(data[0], category, entry);
}

export default async function EntryPage({ params }) {
  const { category, entry } = await params;
  const { navItems, data, isError, offline } = await getLayoutPageData(
    category,
    entry,
  );

  return (
    <Layout
      category={category}
      entry={entry}
      initialNavItems={navItems}
      initialData={data}
      initialError={isError}
      offline={offline}
    />
  );
}
