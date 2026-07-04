"use client";

import { useEffect } from "react";

export function GtagPageView({ title, location }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && title) {
      window.gtag("event", "page_view", {
        page_title: title,
        page_location: location,
      });
    }
  }, [title, location]);

  return null;
}
