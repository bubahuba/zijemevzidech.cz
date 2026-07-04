"use client";

import { useEffect } from "react";

export function PageHead({ title, description, ogImages = [] }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    document
      .querySelectorAll('meta[property="og:image"][data-dynamic="true"]')
      .forEach((node) => node.remove());

    ogImages.forEach((url) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image");
      meta.setAttribute("data-dynamic", "true");
      meta.content = url;
      document.head.appendChild(meta);
    });
  }, [title, description, ogImages]);

  return null;
}
