import { Odvodo } from "@/components/Odvodo";
import { fetchOdvodoLists, getOdvodoPageData } from "@/lib/api";
import { mapMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata() {
  const lists = await fetchOdvodoLists();
  return mapMetadata(lists?.[0]?.title);
}

export default async function MapPage() {
  const { lists, currentList, entries, globalTime } =
    await getOdvodoPageData();

  return (
    <Odvodo
      initialLists={lists}
      initialCurrentList={currentList}
      initialEntries={entries}
      initialGlobalTime={globalTime}
    />
  );
}
