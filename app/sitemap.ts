import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabase";
import { guides } from "../data/guides";
import { SITE_URL } from "../lib/site";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/checker`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tips-guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/tips-guides/${guide.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const { data: laptops, error } = await supabase
    .from("laptops")
    .select("brand, model, last_verified_at");

  if (error || !laptops) {
    console.error("Error fetching laptops for sitemap:", error);
    return [...staticPages, ...guidePages];
  }

  const laptopPages: MetadataRoute.Sitemap = laptops.map((laptop) => ({
    url: `${SITE_URL}/laptop/${slugify(`${laptop.brand}-${laptop.model}`)}`,
    ...(laptop.last_verified_at
      ? { lastModified: new Date(laptop.last_verified_at) }
      : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...guidePages, ...laptopPages];
}
