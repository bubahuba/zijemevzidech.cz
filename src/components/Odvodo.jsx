import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Map } from "./Map";
import { defaultColor } from "./mapAssets";
import { siteBase } from "./Layout";

export const Odvodo = () => {
  const [entries, setEntries] = useState([]);
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(undefined);
  const { list } = useParams()

  useEffect(() => {
    if (!lists.length) {
      const API_lists =
        "https://sheets.googleapis.com/v4/spreadsheets/1ssjYdrST5QnaIeFizr-D2P3lHDgXHYpENLi_LMw4Amw?key=AIzaSyATJtmaYHWXJ3zXaYCexj4mfn_sjVIuJtk";

      fetch(API_lists)
        .then((response) => response.json())
        .then((data) => {
          const _lists = [];
          data.sheets.map(({ properties }) => _lists.push(properties.title));
          setLists(_lists);
          setCurrentList(list ? list : _lists[0]);
        })
        .catch(function (ex) {
          console.log("parsing failed", ex);
        });
    } else {
      const renderList = list ? list : lists[0];
      setEntries([]);
      const API_entries =
        "https://sheets.googleapis.com/v4/spreadsheets/1ssjYdrST5QnaIeFizr-D2P3lHDgXHYpENLi_LMw4Amw/values/" +
        encodeURIComponent(renderList) +
        "!A2:Z1000?key=AIzaSyATJtmaYHWXJ3zXaYCexj4mfn_sjVIuJtk";
      fetch(API_entries)
        .then((response) => response.json())
        .then((data) => {
          setEntries(data.values);
        })
        .catch(function (ex) {
          console.log("parsing failed", ex);
        });

      if (window.gtag) window.gtag("event", "page_view", { page_title: list, page_location: siteBase + encodeURI(list) });
    }
  }, [lists, list]);

  return (
    <div className="App" style={{ backgroundColor: defaultColor }}>
      <Map
        entries={entries}
        list={currentList}
        lists={lists}
      />
    </div>
  );
};

