import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Laptop Upgrade Checker | Check RAM & SSD Upgrades",
  description:
    "Check whether your laptop can be upgraded with more RAM or SSD storage. Search your laptop model and find documented upgrade limits and compatibility.",
  verification: {
    google: "wSMx9XJV6Hrs6vRctIWcLN1mTDLhcoTxBtGbKcQonXw",
  },
};

const themeScript = `
  (function () {
    try {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
      document.documentElement.style.backgroundColor = isDark ? "#061b33" : "#b9e5f5";
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>

      <body
        className="vista-font flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-slate-950 dark:text-slate-100"
      >
        <Navbar />

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
