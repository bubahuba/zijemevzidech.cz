"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SunspotLoader } from "./SunspotLoader";
import { Sidebar } from "./Sidebar";
import { Entry } from "./Entry";
import { Category } from "./Category";
import { NotFound } from "./NotFound";
import { apiBase } from "@/lib/constants";

// Always re-check CMS in the browser so deletes/updates show without redeploy.
const cmsQueryOptions = {
  staleTime: 0,
  refetchOnMount: "always",
  refetchOnWindowFocus: true,
};

export function Layout({
  category: categoryProp,
  entry: entryProp,
  initialNavItems,
  initialData,
  initialError,
  offline,
}) {
  const params = useParams();
  const category = categoryProp ?? params?.category;
  const entry = entryProp ?? params?.entry;
  const cat = category ? category : "aktivity";

  const { data: navItems } = useQuery({
    queryKey: ["menu"],
    queryFn: () => fetch(apiBase + "menu").then((res) => res.json()),
    initialData: initialNavItems,
    ...cmsQueryOptions,
  });

  const { isPending, isError, isFetching, data, isFetched } = useQuery({
    queryKey: [entry ? "entry/" + entry : "entries/c/" + cat],
    retry: 1,
    queryFn: () =>
      fetch(
        entry ? apiBase + "entry/" + entry : apiBase + "entries/c/" + cat,
      ).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      }),
    initialData: initialData,
    ...cmsQueryOptions,
  });

  const categoryTitle = navItems?.find((item) => item.slug === cat)?.title;
  // Deleted CMS entries come back as [] — treat as gone after a live fetch.
  const entryGone =
    Boolean(entry) && isFetched && Array.isArray(data) && data.length === 0;
  const showError =
    !isFetching &&
    (isError ||
      entryGone ||
      (!offline && Boolean(initialError) && !data));

  if (showError) {
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
