import { Odvodo } from "@/components/Odvodo";
import {
  fetchAllOdvodoListParams,
  fetchOdvodoLists,
  getOdvodoPageData,
} from "@/lib/api";
import { mapMetadata } from "@/lib/metadata";

export const revalidate = 600;

export async function generateStaticParams() {
  return fetchAllOdvodoListParams();
}

export async function generateMetadata({ params }) {
  const { list } = await params;
  const lists = await fetchOdvodoLists();
  const currentList = lists?.find((item) => item.slug === list) ?? lists?.[0];
  return mapMetadata(currentList?.title);
}

export default async function MapListPage({ params }) {
  const { list } = await params;
  const { lists, currentList, entries, globalTime } =
    await getOdvodoPageData(list);

  return (
    <Odvodo
      list={list}
      initialLists={lists}
      initialCurrentList={currentList}
      initialEntries={entries}
      initialGlobalTime={globalTime}
    />
  );
}
