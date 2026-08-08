"use client";

import { useEffect } from "react";
import Link from "next/link";
import MarkerIcon from "./assets/markerIcon.svg";
import { LogoZz2 } from "./LogoZz2";
import { DEFAULT_COLOR } from "@/lib/constants";

export function Icon({ number }) {
  return (
    <div className="markerIcon">
      <span>{number}</span>
      <MarkerIcon color={DEFAULT_COLOR} />
    </div>
  );
}

export function RelatedEntries({ entries, link, globalTime }) {
  useEffect(() => {
    setTimeout(() => window.refreshFsLightbox?.(), 400);
  }, [link, entries]);

  return (
    <>
      <h2 style={{ fontWeight: 300 }}>
        <b>O</b>tevřené <b>Dvo</b>rky a <b>Do</b>my
      </h2>
      <div className="page entries" style={{ marginTop: 20 }}>
        {entries.map((entry, i) => (
          <div className="entry" key={i}>
            <h3>{entry.title}</h3>
            <p>
              <i>
                <b>{entry.intro}</b>
              </i>
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: globalTime ? globalTime : entry.fulltext,
              }}
              style={{ fontSize: "smaller" }}
            />
            {entry.galerie[0] && (
              <a
                href={entry.galerie[0].large}
                data-fslightbox={link}
                className="thumb"
              >
                <img
                  src={entry.galerie[0].small}
                  alt={entry.galerie[0].title}
                  height={300}
                />
                <Icon number={i + 1} />
              </a>
            )}
          </div>
        ))}

        <Link
          className="entry"
          key="logo"
          style={{ justifyContent: "flex-end" }}
          href={link}
        >
          <LogoZz2 />
        </Link>
      </div>
    </>
  );
}
