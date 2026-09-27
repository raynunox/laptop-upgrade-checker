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
    { name: "Dell Inspiron 15 3520", slug: "dell-inspiron-15-3520" },
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
    <main className="min-h-screen bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950 sm:px-6 md:py-16">
      <div className="mx-auto max-w-4xl space-y-10">

        {/* HERO */}
        <section className="pt-6 text-center md:pt-10">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
            Free Laptop Upgrade Tool
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            Can I Upgrade
            <span className="block text-blue-600 dark:text-blue-400">
              My Laptop?
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Find out whether your laptop can be upgraded with more RAM,
            SSD storage, or other hardware — based on documented
            specifications.
          </p>
        </section>

        {/* SEARCH CARD */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8">
          <label
            htmlFor="search"
            className="mb-3 block text-sm font-bold text-slate-900 dark:text-white"
          >
            Search your laptop model
          </label>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. ThinkPad T480, Dell Inspiron 15..."
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
            Search by brand, model, or model number.
          </p>
        </section>

        {/* POPULAR GUIDES */}
        {!hasSearched && (
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Popular Laptop Upgrade Guides
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Explore documented RAM and SSD upgrade information.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {popularLaptops.map((laptop) => (
                <Link
                  key={laptop.slug}
                  href={`/laptop/${laptop.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
                >
                  <p className="font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {laptop.name}
                  </p>

                  <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                    RAM & SSD upgrade guide →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEARCH RESULTS */}
        {hasSearched && (
          <div className="space-y-5">
            {isLoading ? (
              <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                Searching database...
              </div>
            ) : results.length > 0 ? (
              results.map((laptop) => (
                <div
                  key={laptop.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8"
                >
                  <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                    {laptop.brand} {laptop.model}
                  </h3>

                  <div className="space-y-6">
                    {laptop.configurations?.map(
                      (config: any, index: number) => (
                        <div
                          key={index}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                        >
                          <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
                            {config.label || "Standard Configuration"}
                          </h4>

                          {config.notes && (
                            <p className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-slate-600 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-slate-400">
                              💡 {config.notes}
                            </p>
                          )}

                          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                            {/* RAM */}
                            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Memory (RAM)
                              </span>

                              <div className="mt-2 space-y-1">
                                <p className="font-medium text-slate-800 dark:text-slate-200">
                                  Upgradeable:{" "}
                                  {config.memory?.status === "yes"
                                    ? "✅ Yes"
                                    : "❌ No"}
                                </p>

                                {config.memory?.onboardGb > 0 && (
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Onboard RAM:{" "}
                                    {config.memory.onboardGb}GB
                                  </p>
                                )}

                                {config.memory?.maxTotalGb && (
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Max Capacity:{" "}
                                    {config.memory.maxTotalGb}GB
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* SSD */}
                            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Storage (SSD)
                              </span>

                              <div className="mt-2 space-y-1">
                                <p className="font-medium text-slate-800 dark:text-slate-200">
                                  Upgradeable:{" "}
                                  {config.storage?.status === "yes"
                                    ? "✅ Yes"
                                    : "❌ No"}
                                </p>

                                {config.storage?.options && (
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Slots:{" "}
                                    {config.storage.options.length}{" "}
                                    available
                                  </p>
                                )}
                              </div>
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
                    className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View full upgrade guide →
                  </Link>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
                <p className="text-slate-500 dark:text-slate-400">
                  No results found for "{searchQuery}". Try another model.
                </p>
              </div>
            )}
          </div>
        )}

        {/* EMPTY STATE */}
        {!hasSearched && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 text-3xl">💻</div>

            <p className="font-medium text-slate-700 dark:text-slate-300">
              Search a laptop to see its upgrade options.
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
              RAM · SSD · Battery · Hardware compatibility
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
