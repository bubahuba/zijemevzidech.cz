import { Layout } from "@/components/Layout";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  return <Layout category={category} />;
}
