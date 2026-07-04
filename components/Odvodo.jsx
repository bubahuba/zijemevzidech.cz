"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Map } from "./Map";
import { defaultColor } from "./mapAssets";
import { ShowAll } from "./ShowAll";
import { GtagPageView } from "./GtagPageView";
import { apiBase, siteBase } from "@/lib/constants";

export function Odvodo({
  list: listProp,
  all: allProp,
  initialLists,
  initialCurrentList,
  initialEntries,
  initialGlobalTime,
}) {
  const params = useParams();
  const list = listProp ?? params?.list;
  const all = allProp ?? params?.all;

  const { data: lists } = useQuery({
    queryKey: ["odvodo-lists"],
    queryFn: () =>
      fetch(apiBase + "entries/c/odvodo")
        .then((res) => res.json())
        .then((data) => data.map(({ title, slug }) => ({ title, slug }))),
    initialData: initialLists,
    staleTime: 1000 * 60 * 10,
  });

  const currentList =
    list && list !== "all"
      ? lists?.find((item) => item.slug === list) ?? initialCurrentList
      : initialCurrentList ?? lists?.[0];

  const { data: entries } = useQuery({
    queryKey: [`markers-${currentList?.slug ?? "index"}`],
    enabled: Boolean(currentList),
    queryFn: () =>
      fetch(apiBase + "entry/" + currentList.slug)
        .then((res) => res.json())
        .then((data) => data[0].related),
    initialData: initialEntries,
    staleTime: 1000 * 60 * 10,
  });

  const globalTime = initialGlobalTime;

  return (
    <>
      <GtagPageView
        title={currentList?.title}
        location={siteBase + (currentList?.slug ?? "map")}
      />
      <div className="App" style={{ backgroundColor: defaultColor }}>
        {all === "all" && entries && (
          <ShowAll
            entries={entries}
            list={currentList}
            globalTime={globalTime}
          />
        )}
        {all !== "all" && (
          <Map entries={entries} list={currentList} lists={lists} />
        )}
      </div>
    </>
  );
}
