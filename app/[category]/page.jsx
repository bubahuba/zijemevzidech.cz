import { Layout } from "@/components/Layout";
import {
  fetchAllCategoryParams,
  fetchMenu,
  getLayoutPageData,
} from "@/lib/api";
import { categoryMetadata } from "@/lib/metadata";

export const revalidate = 600;

export async function generateStaticParams() {
  return fetchAllCategoryParams();
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const menu = await fetchMenu();
  const categoryTitle = menu?.find((item) => item.slug === category)?.title;
  return categoryMetadata(categoryTitle, category);
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const { navItems, data, isError, offline } = await getLayoutPageData(category);

  return (
    <Layout
      category={category}
      initialNavItems={navItems}
      initialData={data}
      initialError={isError}
      offline={offline}
    />
  );
}
