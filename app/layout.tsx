import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laptop Upgrade Checker | Check RAM & SSD Upgrades",
  description:
    "Check whether your laptop can be upgraded with more RAM or SSD storage. Search your laptop model and find documented upgrade limits and compatibility.",
  verification: {
    google: "wSMx9XJV6Hrs6vRctIWcLN1mTDLhcoTxBtGbKcQonXw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased flex flex-col min-h-screen`}>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
