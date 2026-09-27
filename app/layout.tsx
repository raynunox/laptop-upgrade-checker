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
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

            {/* BRAND */}
            <a
              href="/"
              className="group flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <img
                  src="/icon.png"
                  alt="Laptop Upgrade Checker"
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
                Laptop Upgrade Checker
              </span>
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-1 md:flex">
              <a
                href="/"
                className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/60"
              >
                Home
              </a>

              <a
                href="/checker"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Upgrade Checker
              </a>

              <a
                href="/#guides"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Laptop Guides
              </a>

              <a
                href="/about"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                About
              </a>

              <a
                href="/contact"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Contact
              </a>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* PAGE */}
        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
