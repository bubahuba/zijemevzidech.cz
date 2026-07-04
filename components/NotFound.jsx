"use client";

import Link from "next/link";

export function NotFound({ marginLeft }) {
  return (
    <div
      className="main content notFound"
      style={marginLeft > -1 ? { marginLeft: marginLeft } : {}}
    >
      <Link className="logo" href="/" />
      <div className="title">404</div>
      <p>Not found</p>
    </div>
  );
}
