"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const popularLaptops = [
    {
      name: "Dell Inspiron 15 3520",
      slug: "dell-inspiron-15-3520",
    },
    {
      name: "Lenovo ThinkPad T14 Gen 2 AMD",
      slug: "lenovo-thinkpad-t14-gen-2-amd",
    },
    {
      name: "Acer Aspire 3 A315-58",
      slug: "acer-aspire-3-a315-58",
    },
    {
      name: "HP EliteBook 840 G8",
      slug: "hp-elitebook-840-g8",
    },
    {
      name: "ASUS VivoBook 15 X1500EA",
      slug: "asus-vivobook-15-x1500ea",
    },
    {
      name: "Framework Laptop 13 11th Gen",
      slug: "framework-laptop-13-11th-gen",
    },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    const searchTerms = searchQuery.trim().split(/\s+/);

    let query = supabase.from("laptops").select("*");

    searchTerms.forEach((term) => {
      query = query.or(
        `brand.ilike.%${term}%,model.ilike.%${term}%`
      );
    });

    const { data, error } = await query.limit(10);

    if (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } else {
      setResults(data || []);
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      {/* HERO */}
      {!hasSearched && (
        <section className="relative">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pb-20 md:pt-24">

            {/* Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Free Laptop Upgrade Checker
              </div>
            </div>

            {/* Heading */}
            <div className="mx-auto mt-7 max-w-4xl text-center">
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
                Can I Upgrade
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                  My Laptop?
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                Check whether your laptop can support more RAM, SSD storage,
                and other hardware upgrades using documented specifications.
              </p>
            </div>

            {/* SEARCH */}
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-4">

                <form
                  onSubmit={handleSearch}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4" />
                    </svg>

                    <input
                      id="search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search your laptop model..."
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 rounded-2xl bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Searching..." : "Search"}
                  </button>
                </form>

                <div className="flex flex-wrap gap-x-5 gap-y-2 px-2 pt-3 text-xs text-slate-500 dark:text-slate-500">
                  <span>✓ RAM compatibility</span>
                  <span>✓ SSD compatibility</span>
                  <span>✓ Documented specifications</span>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800">
              <div className="px-3 text-center">
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  100+
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Laptop Models
                </p>
              </div>

              <div className="px-3 text-center">
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  RAM
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Upgrade Checks
                </p>
              </div>

              <div className="px-3 text-center">
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  SSD
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Storage Checks
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH MODE HEADER */}
      {hasSearched && (
        <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Laptop Upgrade Checker
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Search Results
              </h1>

              <form
                onSubmit={handleSearch}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">

        {!hasSearched && (
          <>
            {/* HOW IT WORKS */}
            <section>
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Simple & Fast
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  How it works
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
                  Find your laptop and understand its upgrade possibilities
                  in just a few seconds.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl dark:bg-blue-950/50">
                    🔍
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    1. Search your laptop
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Enter your laptop brand and model to find its documented
                    specifications.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl dark:bg-blue-950/50">
                    💾
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    2. Check compatibility
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    See available RAM slots, maximum memory, SSD interfaces,
                    and storage options.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl dark:bg-blue-950/50">
                    ⚡
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    3. Upgrade with confidence
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Use documented compatibility information before buying
                    upgrade hardware.
                  </p>
                </div>

              </div>
            </section>

            {/* POPULAR */}
            <section className="mt-20">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    Explore
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Popular Laptop Guides
                  </h2>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Check upgrade options for popular laptop models.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {popularLaptops.map((laptop) => (
                  <Link
                    key={laptop.slug}
                    href={`/laptop/${laptop.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">
                        💻
                      </div>

                      <span className="text-slate-300 transition group-hover:text-blue-500 dark:text-slate-700">
                        →
                      </span>
                    </div>

                    <h3 className="mt-5 font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {laptop.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      RAM & SSD upgrade guide
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="relative mt-20 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white dark:border dark:border-slate-800 sm:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Need a detailed check?
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Check your laptop upgrade compatibility
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  Use the full compatibility checker to evaluate specific RAM
                  and SSD upgrade configurations.
                </p>

                <Link
                  href="/checker"
                  className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Open Compatibility Checker →
                </Link>
              </div>
            </section>
          </>
        )}

        {/* SEARCH RESULTS */}
        {hasSearched && (
          <div className="mx-auto max-w-4xl">

            {isLoading ? (
              <div className="py-20 text-center">
                <div className="text-3xl">🔍</div>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                  Searching laptop database...
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                {results.map((laptop) => (
                  <div
                    key={laptop.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8"
                  >
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      {laptop.brand} {laptop.model}
                    </h2>

                    <div className="mt-6 space-y-5">
                      {laptop.configurations?.map(
                        (config: any, index: number) => (
                          <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                          >
                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {config.label ||
                                "Standard Configuration"}
                            </h3>

                            {config.notes && (
                              <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-slate-600 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-slate-400">
                                💡 {config.notes}
                              </p>
                            )}

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">

                              {/* RAM */}
                              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Memory / RAM
                                </p>

                                <p className="mt-2 font-semibold text-slate-800 dark:text-slate-200">
                                  {config.memory?.status === "yes"
                                    ? "✅ Upgradeable"
                                    : "❌ Not upgradeable"}
                                </p>

                                {config.memory?.maxTotalGb && (
                                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Maximum{" "}
                                    {config.memory.maxTotalGb} GB
                                  </p>
                                )}
                              </div>

                              {/* SSD */}
                              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Storage / SSD
                                </p>

                                <p className="mt-2 font-semibold text-slate-800 dark:text-slate-200">
                                  {config.storage?.status === "yes"
                                    ? "✅ Upgradeable"
                                    : "❌ Not upgradeable"}
                                </p>

                                {config.storage?.options && (
                                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {config.storage.options.length}{" "}
                                    storage option
                                    {config.storage.options.length !== 1
                                      ? "s"
                                      : ""}
                                  </p>
                                )}
                              </div>

                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <Link
                      href={`/laptop/${laptop.brand
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "")}-${laptop.model
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "")}`}
                      className="mt-6 inline-flex font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View full upgrade guide →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                <div className="text-4xl">🔎</div>

                <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  No laptop found
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  We couldn't find a laptop matching "{searchQuery}".
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try another brand or model name.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
