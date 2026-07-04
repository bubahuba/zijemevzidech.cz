"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Gallery, Item } from "react-photoswipe-gallery";
import { FileIcon } from "./FileIcon";
import { ContactForm } from "./ContactForm";
import { RelatedEntries } from "./RelatedEntries";
import { PageHead } from "./PageHead";
import { siteBase, titleBase } from "@/lib/constants";

export function Entry({ data }) {
  const params = useParams();
  const category = params?.category;
  const entry = params?.entry;

  if (!data[0]) return null;

  const {
    title,
    intro,
    galerie,
    fulltext,
    files,
    date,
    related,
    slug,
    mapa,
    global_time,
  } = data[0];
  const needGallery = galerie.length > 1;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const itemDate = new Date(Number(date) * 1000).toLocaleDateString(
    "cs-CZ",
    dateOptions,
  );

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: siteBase + (category ? category + "/" + entry : ""),
    });
  }

  return (
    <>
      <PageHead
        title={title.replace("&amp;", "&") + titleBase}
        description={intro || undefined}
        ogImages={galerie.map((item) => item.large)}
      />
      <h1>
        <span dangerouslySetInnerHTML={{ __html: title }} />{" "}
        <span className="date">{itemDate}</span>
      </h1>
      <p dangerouslySetInnerHTML={{ __html: intro }} />
      <div dangerouslySetInnerHTML={{ __html: fulltext }} />
      {files && (
        <div className="files">
          {files.map((item, i) => {
            const file_name = item.file.split("/").pop();
            const extension = file_name.split(".").pop();
            const fileName = file_name.split(".").shift();

            return (
              <a
                href={`${item.file}?${new Date().getTime()}`}
                download={`${fileName}.${extension}`}
                className={"file " + extension}
                key={i}
              >
                <FileIcon />
                <span className="fileName">
                  <span className={fileName.length > 10 ? "overflow" : undefined}>
                    {fileName}
                  </span>
                  .{extension}
                </span>
              </a>
            );
          })}
        </div>
      )}
      {galerie[0] && !mapa && (
        <img
          src={galerie[0].large}
          alt={galerie[0].title}
          style={{ width: "100%" }}
          className="poster"
          tabIndex="0"
        />
      )}
      {galerie[0] && mapa && (
        <Link href={mapa} title="Zobrazit mapu">
          <img
            src={galerie[0].large}
            alt={galerie[0].title}
            style={{ width: "100%" }}
            className="poster"
            tabIndex="0"
          />
        </Link>
      )}
      {needGallery && (
        <Gallery withCaption>
          <div className="galerie">
            {galerie.slice(1, galerie.length).map((item, i) => (
              <Item
                original={item.large}
                thumbnail={item.small}
                caption={item.title}
                width={item.width}
                height={item.height}
                key={i}
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={item.small}
                    alt={item.title}
                  />
                )}
              </Item>
            ))}
          </div>
        </Gallery>
      )}
      {related && (
        <RelatedEntries
          entries={related}
          link={`/map/${slug}`}
          globalTime={global_time}
        />
      )}
      <ContactForm />
    </>
  );
}
