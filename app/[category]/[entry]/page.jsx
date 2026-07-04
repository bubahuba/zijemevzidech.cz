import { Layout } from "@/components/Layout";

export default async function EntryPage({ params }) {
  const { category, entry } = await params;
  return <Layout category={category} entry={entry} />;
}
