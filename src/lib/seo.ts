import { SITE, absoluteUrl } from "./site";

type HeadInput = {
  path: string;
  title: string;
  description: string;
  /** Absolute https URL of the share image. Defaults to the site OG image. */
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export const OG_IMAGE = `${SITE.url}/og-image.jpg`;

/**
 * Builds a complete, unique head() payload for a route:
 * title, description, canonical, Open Graph and Twitter card.
 */
export function pageHead({
  path,
  title,
  description,
  image = OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: HeadInput) {
  const url = absoluteUrl(path);
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE.name },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });

  const scripts = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      }))
    : undefined;

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    ...(scripts ? { scripts } : {}),
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
