"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="vista-toolbar sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <div className="vista-orb h-10 w-10 rounded-full">
            <img
              src="/icon.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
            Laptop Upgrade Checker
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          <Link href="/" className="vista-nav-link">Home</Link>
          <Link href="/checker" className="vista-nav-link">Upgrade Checker</Link>
          <Link href="/laptop-guides" className="vista-nav-link">Laptop Guides</Link>
          <Link href="/tips-guides" className="vista-nav-link">Tips & Guides</Link>
          <Link href="/about" className="vista-nav-link">About</Link>
          <Link href="/contact" className="vista-nav-link">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="vista-control inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          >
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="vista-mobile-menu border-t border-slate-200 bg-white px-4 pb-4 pt-2 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-screen-2xl space-y-1">
            <Link href="/" onClick={closeMenu} className="vista-mobile-link">Home</Link>
            <Link href="/checker" onClick={closeMenu} className="vista-mobile-link">Upgrade Checker</Link>
            <Link href="/laptop-guides" onClick={closeMenu} className="vista-mobile-link">Laptop Guides</Link>
            <Link href="/tips-guides" onClick={closeMenu} className="vista-mobile-link">Tips & Guides</Link>
            <Link href="/about" onClick={closeMenu} className="vista-mobile-link">About</Link>
            <Link href="/contact" onClick={closeMenu} className="vista-mobile-link">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
