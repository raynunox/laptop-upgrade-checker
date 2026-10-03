
import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabase";
import { guides } from "../data/guides";

const baseUrl = "https://laptop-upgrade-checker.vercel.app";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: laptops, error } = await supabase
    .from("laptops")
    .select("brand, model, last_verified_at");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/checker`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tips-guides`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
  ];

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/tips-guides/${guide.slug}`,
    lastModified: new Date(),
  }));

  if (error || !laptops) {
    console.error("Error fetching laptops for sitemap:", error);
    return [...staticPages, ...guidePages];
  }

  const laptopPages: MetadataRoute.Sitemap = laptops.map((laptop) => ({
    url: `${baseUrl}/laptop/${slugify(`${laptop.brand}-${laptop.model}`)}`,
    lastModified: laptop.last_verified_at
      ? new Date(laptop.last_verified_at)
      : new Date(),
  }));

  return [...staticPages, ...guidePages, ...laptopPages];
}
