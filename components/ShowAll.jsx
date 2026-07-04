"use client";

import Link from "next/link";
import { Icon } from "./RelatedEntries";

export function ShowAll({ entries, list, globalTime }) {
  if (!entries?.length || !list) return null;

  return (
    <div className="page entries" style={{ padding: 10 }}>
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
          <span className="thumb">
            <img
              src={entry.galerie[0].small}
              alt={entry.title}
              className="thumb"
            />
            <Icon number={i + 1} />
          </span>
        </div>
      ))}

      <Link
        className="entry"
        key="logo"
        style={{ justifyContent: "flex-end" }}
        href={`/map/${list.slug}`}
      >
        <img src="/images/logo-zz2.svg" alt="" />
      </Link>
    </div>
  );
}
