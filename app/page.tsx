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
    <main className="bg-slate-50 p-6 md:p-12">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* HEADER */}
        <div className="mt-10 space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Laptop Upgrade Checker
          </h1>

          <p className="mx-auto max-w-xl text-lg text-slate-500">
            Stop guessing before buying PC parts. Search your laptop model to
            check its maximum RAM and SSD upgrade limits.
          </p>
        </div>

        {/* SEARCH */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <label
            htmlFor="search"
            className="mb-3 block text-sm font-semibold text-slate-700"
          >
            Enter Laptop Model
          </label>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-4 md:flex-row"
          >
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., ThinkPad T480, ROG Zephyrus..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {/* POPULAR LAPTOP GUIDES */}
        {!hasSearched && (
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Popular Laptop Upgrade Guides
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Check RAM, SSD, and hardware upgrade options for popular
                laptop models.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {popularLaptops.map((laptop) => (
                <Link
                  key={laptop.slug}
                  href={`/laptop/${laptop.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <p className="font-semibold text-slate-900">
                    {laptop.name}
                  </p>

                  <p className="mt-1 text-sm text-blue-600">
                    RAM & SSD upgrade guide →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEARCH RESULTS */}
        {hasSearched ? (
          <div className="space-y-4">
            {isLoading ? (
              <div className="py-10 text-center text-slate-500">
                Searching database...
              </div>
            ) : results.length > 0 ? (
              results.map((laptop) => (
                <div
                  key={laptop.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                >
                  <h3 className="mb-6 text-2xl font-bold text-slate-900">
                    {laptop.brand} {laptop.model}
                  </h3>

                  <div className="space-y-6">
                    {laptop.configurations?.map(
                      (config: any, index: number) => (
                        <div
                          key={index}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-5"
                        >
                          <h4 className="mb-2 font-semibold text-slate-800">
                            {config.label || "Standard Configuration"}
                          </h4>

                          {config.notes && (
                            <p className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-slate-500">
                              💡 {config.notes}
                            </p>
                          )}

                          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                            {/* RAM */}
                            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Memory (RAM)
                              </span>

                              <div className="mt-2 space-y-1">
                                <p className="font-medium text-slate-800">
                                  Upgradeable:{" "}
                                  {config.memory?.status === "yes"
                                    ? "✅ Yes"
                                    : "❌ No"}
                                </p>

                                {config.memory?.onboardGb > 0 && (
                                  <p className="text-sm text-slate-600">
                                    Onboard RAM:{" "}
                                    {config.memory.onboardGb}GB
                                  </p>
                                )}

                                {config.memory?.maxTotalGb && (
                                  <p className="text-sm text-slate-600">
                                    Max Capacity:{" "}
                                    {config.memory.maxTotalGb}GB
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* STORAGE */}
                            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Storage (SSD)
                              </span>

                              <div className="mt-2 space-y-1">
                                <p className="font-medium text-slate-800">
                                  Upgradeable:{" "}
                                  {config.storage?.status === "yes"
                                    ? "✅ Yes"
                                    : "❌ No"}
                                </p>

                                {config.storage?.options && (
                                  <p className="text-sm text-slate-600">
                                    Slots:{" "}
                                    {config.storage.options.length} available
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* MODEL PAGE LINK */}
                  <Link
                    href={`/laptop/${laptop.brand
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}-${laptop.model
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`}
                    className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:underline"
                  >
                    View full upgrade guide →
                  </Link>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-500">
                  No results found for "{searchQuery}". Try another model.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8">
            <div className="py-10 text-center">
              <div className="mb-2 text-slate-400">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>

              <p className="text-slate-500">
                Laptop specification results will appear here.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
