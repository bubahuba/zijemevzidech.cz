import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Map } from "./Map";
import { defaultColor } from "./mapAssets";
import { apiBase, siteBase, titleBase } from "./Layout";
import { Helmet } from "react-helmet";
import { ShowAll } from "./ShowAll";
import { useQuery } from "@tanstack/react-query";

export const Odvodo = () => {
  const [currentList, setCurrentList] = useState(undefined);
  const [globalTime, setGlobalTime] = useState(undefined);
  const { list, all } = useParams()
  const odvodoTitle = 'Otevřené dvorky a domy'


  const { data: lists } = useQuery({
    queryKey: ['odvodo-lists'],
    staleTime: 1000 * 60 * 10,
    queryFn: () =>
      fetch(apiBase + 'entries/c/odvodo').then((res) =>
        res.json(),
      ).then((data) => {
        const _lists = [];
        data.map(({ title, slug }) => _lists.push({ title, slug }));
        return _lists;
      }),
  })


  const { data: entries } = useQuery({
    queryKey: [`markers-${currentList?.slug ? currentList.slug : 'index'}`],
    staleTime: 1000 * 60 * 10,
    queryFn: () => {
      if (!currentList) return [];

      return fetch(apiBase + 'entry/' + currentList.slug).then((res) =>
        res.json(),
      ).then((data) => {
        setGlobalTime(data[0].global_time);
        if (window.gtag) window.gtag("event", "page_view", { page_title: currentList.title, page_location: siteBase + currentList.slug });

        return data[0].related;
      })
    },
  })

  useEffect(() => {
    if (!lists) return;

    if (list && list !== 'all') {
      setCurrentList(lists.find((item) => item.slug === list))
    } else {
      setCurrentList(lists[0])
    }
  }, [list, lists])


  return (
    <>
      <Helmet>
        <title>{currentList ? currentList.title + ' ✡︎ ' + odvodoTitle : odvodoTitle}{titleBase}</title>
      </Helmet>
      <div className="App" style={{ backgroundColor: defaultColor }}>
        {all === 'all' && entries && <ShowAll entries={entries} list={currentList} globalTime={globalTime} />}
        {!all  &&
          <Map
            entries={entries}
            list={currentList}
            lists={lists}
          />}
      </div>
    </>
  );
};

