
import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Laptop Tips & Guides | RAM, SSD & Upgrade Guides",
  description:
    "Practical laptop upgrade tips and guides covering RAM, SSD storage, compatibility, and laptop hardware upgrades.",
};

export default function TipsGuidesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Tips & Guides
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Laptop Upgrade Tips & Guides
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-slate-400 sm:text-lg">
            Learn about laptop RAM, SSD storage, compatibility, and hardware
            upgrades with practical guides designed to help you make informed
            upgrade decisions.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                  {guide.category}
                </span>
              </div>

              <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <Link
                  href={`/tips-guides/${guide.slug}`}
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {guide.title}
                </Link>
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-slate-400">
                {guide.description}
              </p>

              <Link
                href={`/tips-guides/${guide.slug}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read guide
                <span
                  aria-hidden="true"
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* Checker CTA */}
        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Not sure what your laptop supports?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-slate-400">
            Use Laptop Upgrade Checker to find documented RAM and SSD upgrade
            compatibility for your laptop model.
          </p>

          <Link
            href="/checker"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Check My Laptop
          </Link>
        </section>
      </div>
    </main>
  );
}
