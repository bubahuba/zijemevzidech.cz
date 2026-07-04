"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { GtagPageView } from "./GtagPageView";
import { siteBase } from "@/lib/constants";

export function Category({ data, categoryTitle }) {
  const params = useParams();
  const category = params?.category;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <GtagPageView
        title={categoryTitle || category}
        location={siteBase + (category ? category + "/" : "")}
      />
      <div className="category">
        {data.map((entry, i) => {
          const { title: entryTitle, intro, galerie, slug, date, category: cat } =
            entry;
          const itemDate = new Date(Number(date) * 1000).toLocaleDateString(
            "cs-CZ",
            dateOptions,
          );
          return (
            <Link
              key={i}
              className="item"
              href={`/${category ? category : cat}/${slug}`}
            >
              <h1>
                <span dangerouslySetInnerHTML={{ __html: entryTitle }} />{" "}
                <span className="date">{itemDate}</span>
              </h1>
              <p dangerouslySetInnerHTML={{ __html: intro }} />
              {galerie[0] ? (
                <img src={galerie[0].small} alt={galerie[0].title} />
              ) : (
                <img src="/images/logo-zz2.svg" alt="" style={{ width: "100%" }} />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
