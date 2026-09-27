import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}
      >
        <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a
              href="/"
              className="font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Laptop Upgrade Checker
            </a>

            <ThemeToggle />
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
