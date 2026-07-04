"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHead } from "./PageHead";
import { siteBase, titleBase } from "@/lib/constants";

export function Category({ data, categoryTitle }) {
  const params = useParams();
  const category = params?.category;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: category,
      page_location: siteBase + (category ? category + "/" : ""),
    });
  }

  const title = categoryTitle
    ? categoryTitle.replace("&amp;", "&") + titleBase
    : titleBase;

  return (
    <>
      <PageHead title={title} ogImages={["/images/og-image.png"]} />
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
