import Link from "next/link";
import { supabase } from "../../lib/supabase";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function LaptopGuidesPage() {
  const { data: laptops, error } = await supabase
    .from("laptops")
    .select(
      "id, brand, family, model, model_number, release_year, verification_status"
    )
    .order("brand", { ascending: true })
    .order("model", { ascending: true });

  if (error) {
    console.error("Error fetching laptop guides:", error);
  }

  const laptopList = laptops ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <section className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Laptop Upgrade Database
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Laptop Upgrade Guides
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Browse documented RAM, SSD, battery, and hardware upgrade
            information for supported laptop models.
          </p>
        </section>

        {/* STATS */}
        <section className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {laptopList.length}
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
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
              SSD
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Storage Information
            </p>
          </div>
        </section>

        {/* DATABASE */}
        <section className="mt-14">

          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Browse Database
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                All Laptop Models
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Select a laptop to view its upgrade compatibility guide.
              </p>
            </div>

            <Link
              href="/"
              className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              ← Back to search
            </Link>
          </div>

          {laptopList.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {laptopList.map((laptop) => {
                const slug = slugify(
                  `${laptop.brand}-${laptop.model}`
                );

                return (
                  <Link
                    key={laptop.id}
                    href={`/laptop/${slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
                  >
                    {/* ICON + STATUS */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800">
                        💻
                      </div>

                      {laptop.verification_status && (
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                          {laptop.verification_status}
                        </span>
                      )}
                    </div>

                    {/* NAME */}
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {laptop.brand}
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {laptop.model}
                      </h3>

                      {(laptop.family ||
                        laptop.model_number ||
                        laptop.release_year) && (
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                          {laptop.family && laptop.family}

                          {laptop.family &&
                            laptop.model_number &&
                            " · "}

                          {laptop.model_number &&
                            laptop.model_number}

                          {(laptop.family || laptop.model_number) &&
                            laptop.release_year &&
                            " · "}

                          {laptop.release_year &&
                            laptop.release_year}
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        View upgrade guide
                      </span>

                      <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500 dark:text-slate-700">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="text-4xl">💻</div>

              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                No laptop models found
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                The laptop database is currently unavailable.
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="relative mt-16 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white dark:border dark:border-slate-800 sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Can't find your model?
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Search the database
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Try searching your laptop model from the main Laptop Upgrade
              Checker.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Search Laptop Models →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
