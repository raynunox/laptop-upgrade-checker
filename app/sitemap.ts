import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://laptop-upgrade-checker.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://laptop-upgrade-checker.vercel.app/checker",
      lastModified: new Date(),
    },
  ];
}
