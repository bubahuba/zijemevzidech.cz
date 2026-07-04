export const dynamic = "force-dynamic";

import { Odvodo } from "@/components/Odvodo";

export default async function MapListAllPage({ params }) {
  const { list } = await params;
  return <Odvodo list={list} all="all" />;
}
