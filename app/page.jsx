import { Layout } from "@/components/Layout";
import { fetchMenu, getLayoutPageData } from "@/lib/api";
import { categoryMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata() {
  const menu = await fetchMenu();
  const categoryTitle = menu?.find((item) => item.slug === "aktivity")?.title;
  return categoryMetadata(categoryTitle, "aktivity");
}

export default async function HomePage() {
  const { navItems, data, isError, offline } = await getLayoutPageData("aktivity");

  return (
    <Layout
      category="aktivity"
      initialNavItems={navItems}
      initialData={data}
      initialError={isError}
      offline={offline}
    />
  );
}
