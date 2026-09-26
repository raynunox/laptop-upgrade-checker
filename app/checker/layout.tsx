import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laptop Upgrade Checker | RAM, SSD & Battery Compatibility",
  description:
    "Check whether your laptop can be upgraded with more RAM, SSD storage, or a replacement battery. Compare compatibility based on documented laptop configurations.",
};

export default function CheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
