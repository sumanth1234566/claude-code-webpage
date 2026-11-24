import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...products.map((p) => `/${p.slug}`), "/coverage", "/about", "/support", "/contact", "/privacy", "/terms"];
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.8 }));
}
