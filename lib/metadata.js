import { siteBase, titleBase } from "./constants";

export function stripHtml(value) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function pageMetadata({ title, description, images, path = "" }) {
  const ogImages = (images?.length ? images : ["/images/og-image.png"]).map(
    (image) => (typeof image === "string" ? image : image.url),
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteBase}${path.replace(/^\//, "")}`,
      images: ogImages,
      type: "website",
      locale: "cs_CZ",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  };
}

export function categoryMetadata(categoryTitle, category) {
  const title = categoryTitle
    ? `${stripHtml(categoryTitle)}${titleBase}`
    : `Žijeme v Židech`;

  return pageMetadata({
    title,
    description: "Spolek pro rozvoj Židovské čtvrti v Třebíči",
    images: ["/images/og-image.png"],
    path: category ? `${category}/` : "",
  });
}

export function entryMetadata(entry, category, entrySlug) {
  const { title, intro, galerie } = entry;
  const pageTitle = `${stripHtml(title)}${titleBase}`;

  return pageMetadata({
    title: pageTitle,
    description: stripHtml(intro) || undefined,
    images: galerie?.map((item) => item.large) ?? ["/images/og-image.png"],
    path: category ? `${category}/${entrySlug}` : entrySlug,
  });
}

export function mapMetadata(listTitle) {
  const odvodoTitle = "Otevřené dvorky a domy";
  const title = listTitle
    ? `${stripHtml(listTitle)} ✡︎ ${odvodoTitle}${titleBase}`
    : `${odvodoTitle}${titleBase}`;

  return pageMetadata({
    title,
    description: "Mapa otevřených dvorků a domů v Třebíči",
    images: ["/images/og-image.png"],
    path: "map",
  });
}
