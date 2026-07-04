"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Map } from "./Map";
import { defaultColor } from "./mapAssets";
import { ShowAll } from "./ShowAll";
import { PageHead } from "./PageHead";
import { apiBase, siteBase, titleBase } from "@/lib/constants";

export function Odvodo({ list: listProp, all: allProp }) {
  const params = useParams();
  const list = listProp ?? params?.list;
  const all = allProp ?? params?.all;
  const [currentList, setCurrentList] = useState(undefined);
  const [globalTime, setGlobalTime] = useState(undefined);
  const odvodoTitle = "Otevřené dvorky a domy";

  const { data: lists } = useQuery({
    queryKey: ["odvodo-lists"],
    queryFn: () =>
      fetch(apiBase + "entries/c/odvodo")
        .then((res) => res.json())
        .then((data) => {
          const _lists = [];
          data.map(({ title, slug }) => _lists.push({ title, slug }));
          return _lists;
        }),
  });

  const { data: entries } = useQuery({
    queryKey: [`markers-${currentList?.slug ? currentList.slug : "index"}`],
    enabled: Boolean(currentList),
    queryFn: () => {
      if (!currentList) return [];

      return fetch(apiBase + "entry/" + currentList.slug)
        .then((res) => res.json())
        .then((data) => {
          setGlobalTime(data[0].global_time);
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "page_view", {
              page_title: currentList.title,
              page_location: siteBase + currentList.slug,
            });
          }
          return data[0].related;
        });
    },
  });

  useEffect(() => {
    if (!lists) return;

    if (list && list !== "all") {
      setCurrentList(lists.find((item) => item.slug === list));
    } else {
      setCurrentList(lists[0]);
    }
  }, [list, lists]);

  return (
    <>
      <PageHead
        title={
          (currentList
            ? currentList.title + " ✡︎ " + odvodoTitle
            : odvodoTitle) + titleBase
        }
      />
      <div className="App" style={{ backgroundColor: defaultColor }}>
        {all === "all" && entries && (
          <ShowAll entries={entries} list={currentList} globalTime={globalTime} />
        )}
        {all !== "all" && (
          <Map entries={entries} list={currentList} lists={lists} />
        )}
      </div>
    </>
  );
}
