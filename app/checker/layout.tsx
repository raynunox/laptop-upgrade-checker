import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laptop SSD & RAM Upgrade Compatibility Checker",
  description:
    "Check whether your laptop supports a RAM or SSD upgrade. Explore documented memory limits, SSD form factors, interfaces, and capacity options before buying.",
  alternates: {
    canonical: "/checker",
  },
  openGraph: {
    title: "Laptop SSD & RAM Upgrade Compatibility Checker",
    description:
      "Check laptop RAM and SSD compatibility using documented specifications before choosing an upgrade.",
    url: "https://laptop-upgrade-checker.vercel.app/checker",
    siteName: "Laptop Upgrade Checker",
    type: "website",
  },
};

export default function CheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
