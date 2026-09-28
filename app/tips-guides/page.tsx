import Link from "next/link";

const guides = [
  {
    category: "RAM",
    title: "How Much RAM Do I Need for My Laptop?",
    description:
      "Learn how much RAM you need for everyday tasks, productivity, gaming, and heavier workloads.",
    slug: "how-much-ram-do-i-need",
  },
  {
    category: "RAM",
    title: "Can I Upgrade My Laptop RAM?",
    description:
      "Find out how to check whether your laptop RAM is upgradeable and what limitations you should look for.",
    slug: "can-i-upgrade-my-laptop-ram",
  },
  {
    category: "SSD",
    title: "Can I Upgrade My Laptop SSD?",
    description:
      "Learn how to determine whether your laptop supports an SSD upgrade and which storage options may be compatible.",
    slug: "can-i-upgrade-my-laptop-ssd",
  },
  {
    category: "RAM vs SSD",
    title: "RAM vs SSD: Which Upgrade Makes Your Laptop Faster?",
    description:
      "Understand the difference between upgrading RAM and storage and when each upgrade can make a noticeable difference.",
    slug: "ram-vs-ssd",
  },
  {
    category: "SSD",
    title: "M.2 SATA vs NVMe: What's the Difference?",
    description:
      "Understand the difference between M.2 SATA and NVMe SSDs before choosing an upgrade for your laptop.",
    slug: "m2-sata-vs-nvme",
  },
  {
    category: "Compatibility",
    title: "How to Check Your Laptop's Maximum RAM",
    description:
      "A practical guide to finding the maximum supported RAM capacity for your laptop.",
    slug: "how-to-check-maximum-ram",
  },
];

export const metadata = {
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

              {/* CLICKABLE TITLE */}
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

              {/* READ GUIDE */}
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
