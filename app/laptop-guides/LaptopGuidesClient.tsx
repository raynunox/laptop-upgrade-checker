"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Laptop = {
  id: string;
  brand: string;
  family?: string | null;
  model: string;
  model_number?: string | null;
  release_year?: number | null;
  verification_status?: string | null;
};

type Props = {
  laptops: Laptop[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function LaptopGuidesClient({ laptops }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");

  const brands = useMemo(() => {
    return [
      "All Brands",
      ...Array.from(
        new Set(laptops.map((laptop) => laptop.brand))
      ).sort(),
    ];
  }, [laptops]);

  const filteredLaptops = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return laptops.filter((laptop) => {
      const matchesBrand =
        selectedBrand === "All Brands" ||
        laptop.brand === selectedBrand;

      const searchableText = [
        laptop.brand,
        laptop.family,
        laptop.model,
        laptop.model_number,
        laptop.release_year?.toString(),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesBrand && matchesSearch;
    });
  }, [laptops, searchQuery, selectedBrand]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ===================================================== */}
        {/* HERO */}
        {/* ===================================================== */}

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-14 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Laptop Upgrade Database
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Laptop Upgrade Guides
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
              Explore documented RAM, SSD, battery, and hardware upgrade
              information for supported laptop models.
            </p>

          </div>
        </section>

        {/* ===================================================== */}
        {/* STATS */}
        {/* ===================================================== */}

        <section className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {laptops.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Laptop Models
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
              RAM
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Upgrade Information
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400">
              SSD
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Storage Information
            </p>
          </div>

        </section>

        {/* ===================================================== */}
        {/* DATABASE */}
        {/* ===================================================== */}

        <section className="mt-14">

          <div className="mb-6">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Browse Database
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              Find Your Laptop
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Search by brand, model, or model number to view its upgrade guide.
            </p>

          </div>

          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">

            <div className="flex flex-col gap-3 md:flex-row">

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
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search laptop model, brand, or model number..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
                />

              </div>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 md:w-52"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">

              <span>
                Showing{" "}
                <strong className="text-slate-700 dark:text-slate-300">
                  {filteredLaptops.length}
                </strong>{" "}
                of {laptops.length} laptop models
              </span>

              {(searchQuery || selectedBrand !== "All Brands") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedBrand("All Brands");
                  }}
                  className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  Clear filters
                </button>
              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* LAPTOP GRID */}
          {/* ================================================= */}

          <div className="mt-8">

            {filteredLaptops.length > 0 ? (

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredLaptops.map((laptop) => {

                  const slug = slugify(
                    `${laptop.brand}-${laptop.model}`
                  );

                  return (

                    <Link
                      key={laptop.id}
                      href={`/laptop/${slug}`}
                      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
                    >

                      {/* ===================================== */}
                      {/* LAPTOP VISUAL */}
                      {/* ===================================== */}

                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-blue-950/40">

                        {/* Glow */}

                        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />

                        {/* Verified */}

                        {laptop.verification_status && (
                          <span className="absolute right-4 top-4 z-10 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
                            {laptop.verification_status}
                          </span>
                        )}

                        {/* Laptop */}

                        <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover:scale-105">

                          {/* Screen */}

                          <div className="relative mx-auto h-40 w-60 rounded-xl border-[6px] border-slate-700 bg-slate-900 shadow-2xl dark:border-slate-500">

                            <div className="absolute inset-2 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-slate-900">

                              <div className="flex h-full items-center justify-center">

                                <span className="text-6xl font-black text-white/90 drop-shadow-lg">
                                  {laptop.brand.charAt(0)}
                                </span>

                              </div>

                              <div className="absolute bottom-3 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-white/30" />

                            </div>

                            {/* Webcam */}

                            <div className="absolute left-1/2 top-1 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-slate-400" />

                          </div>

                          {/* Laptop Base */}

                          <div className="relative mx-auto h-4 w-72 rounded-b-[50%] rounded-t-sm bg-slate-600 shadow-xl dark:bg-slate-500">

                            <div className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b bg-slate-800 dark:bg-slate-700" />

                          </div>

                        </div>

                      </div>

                      {/* ===================================== */}
                      {/* CONTENT */}
                      {/* ===================================== */}

                      <div className="p-6">

                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                          {laptop.brand}
                        </p>

                        <h3 className="mt-1 text-xl font-black leading-tight text-slate-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {laptop.model}
                        </h3>

                        {(laptop.family ||
                          laptop.model_number ||
                          laptop.release_year) && (

                          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">

                            {laptop.family}

                            {laptop.family &&
                              laptop.model_number &&
                              " · "}

                            {laptop.model_number}

                            {(laptop.family ||
                              laptop.model_number) &&
                              laptop.release_year &&
                              " · "}

                            {laptop.release_year}

                          </p>

                        )}

                        {/* Upgrade badges */}

                        <div className="mt-5 flex gap-2">

                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            RAM
                          </span>

                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            SSD
                          </span>

                        </div>

                        {/* Footer */}

                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">

                          <span className="text-sm font-bold text-slate-700 transition group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
                            View upgrade guide
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-600">
                            →
                          </span>

                        </div>

                      </div>

                    </Link>

                  );
                })}

              </div>

            ) : (

              /* =========================================== */
              /* EMPTY STATE */
              /* =========================================== */

              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">

                <div className="text-4xl">
                  🔎
                </div>

                <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                  No laptop models found
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Try another laptop brand or model name.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedBrand("All Brands");
                  }}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Clear Search
                </button>

              </div>

            )}

          </div>

        </section>

        {/* ===================================================== */}
        {/* CTA */}
        {/* ===================================================== */}

        <section className="relative mt-16 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white dark:border dark:border-slate-800 sm:p-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative max-w-2xl">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Need a detailed check?
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Check your laptop upgrade compatibility
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Use the full compatibility checker to evaluate specific RAM
              and SSD upgrade configurations.
            </p>

            <Link
              href="/checker"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Open Compatibility Checker →
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}
