import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const url = siteUrl();
  return {
    rules: allowIndexing() ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    ...(url && { sitemap: new URL("/sitemap.xml", url).href }),
  };
}
