"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SunspotLoader } from "./SunspotLoader";
import { Sidebar } from "./Sidebar";
import { Entry } from "./Entry";
import { Category } from "./Category";
import { NotFound } from "./NotFound";
import { apiBase } from "@/lib/constants";

export function Layout({ category: categoryProp, entry: entryProp }) {
  const params = useParams();
  const category = categoryProp ?? params?.category;
  const entry = entryProp ?? params?.entry;
  const cat = category ? category : "aktivity";

  const { data: navItems } = useQuery({
    queryKey: ["menu"],
    queryFn: () => fetch(apiBase + "menu").then((res) => res.json()),
  });

  const { isPending, isError, data } = useQuery({
    queryKey: [entry ? "entry/" + entry : "entries/c/" + cat],
    retry: false,
    queryFn: () =>
      fetch(
        entry ? apiBase + "entry/" + entry : apiBase + "entries/c/" + cat,
      ).then((res) => res.json()),
  });

  const categoryTitle = navItems?.find((item) => item.slug === cat)?.title;

  if (isError) {
    return (
      <div className="App">
        <Sidebar navItems={navItems} />
        <NotFound />
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar
        navItems={navItems}
        currentItem={category ? category : "aktivity"}
      />
      <div className="main content">
        {isPending || !data ? (
          <SunspotLoader
            gradientColors={["#00a4d5", "transparent"]}
            style={{ width: "100%" }}
            shadowColor="#3730A3"
            desktopSize="228px"
            mobileSize="100px"
          />
        ) : data &&
          data.length > 0 &&
          !isPending &&
          (entry || data.length === 1) ? (
          <Entry data={data} />
        ) : (
          <Category data={data} categoryTitle={categoryTitle} />
        )}
      </div>
    </div>
  );
}
