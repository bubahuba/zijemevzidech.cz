import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Map } from "./Map";
import { defaultColor } from "./mapAssets";
import { apiBase, siteBase, titleBase } from "./Layout";
import { Helmet } from "react-helmet";
import { ShowAll } from "./ShowAll";

export const Odvodo = () => {
  const [entries, setEntries] = useState([]);
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(undefined);
  const [globalTime, setGlobalTime] = useState(undefined);
  const { list, all } = useParams()
  const odvodoTitle = 'Otevřené dvorky a domy'

  useEffect(() => {
    if (!lists[0]) {
      const API_lists = apiBase + 'entries/c/odvodo';
      const fetchLists = async () => {
        await fetch(API_lists)
          .then((response) => response.json())
          .then((data) => {
            const _lists = [];
            data.map(({ title, slug }) => _lists.push({ title, slug }));
            setLists(_lists);
          })
          .catch(function (ex) {
            console.log("parsing failed", ex);
          })
      }
      fetchLists()

    } else if ((!list && currentList) || (currentList && list === currentList.slug)) {
      const API_entries = apiBase + 'entry/' + currentList.slug;
      const fetchEntries = async () => {
        await fetch(API_entries)
          .then((response) => response.json())
          .then((data) => {
            setEntries(data[0].related);
            setGlobalTime(data[0].global_time);
          })
          .catch(function (ex) {
            console.log("parsing failed", ex);
          });
      }
      fetchEntries()

      if (window.gtag) window.gtag("event", "page_view", { page_title: currentList.title, page_location: siteBase + currentList.slug });
    }
  }, [lists, currentList, list]);

  useEffect(() => {
    setEntries([])
    if (list && lists[0]) {
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
        {all === 'all' && <ShowAll entries={entries} list={currentList} globalTime={globalTime} />}
        {!all &&
          <Map
            entries={entries}
            list={currentList}
            lists={lists}
          />}
      </div>
    </>
  );
};

