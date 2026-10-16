import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  if (!url) return [];
  return ["/", "/impressum/", "/datenschutz/"].map(route => ({ url: new URL(route, url).href }));
}
