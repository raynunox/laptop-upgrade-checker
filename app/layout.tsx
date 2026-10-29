import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://laptop-upgrade-checker.vercel.app"),
  title: "Laptop Upgrade Checker | RAM & SSD Compatibility",
  description:
    "Check laptop RAM and SSD upgrade compatibility. Search your model to explore documented memory limits, SSD sizes, interfaces, and upgrade options.",
  openGraph: {
    title: "Laptop Upgrade Checker | RAM & SSD Compatibility",
    description:
      "Check laptop RAM and SSD upgrade compatibility using documented specifications.",
    url: "https://laptop-upgrade-checker.vercel.app/",
    siteName: "Laptop Upgrade Checker",
    type: "website",
  },
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
      document.documentElement.style.backgroundColor = isDark ? "#020617" : "#f9fafb";
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
        className={`${inter.className} flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <Navbar />

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
