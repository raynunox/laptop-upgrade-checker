import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much RAM Do I Need for My Laptop? | Laptop Upgrade Checker",
  description:
    "Learn how much RAM you need for everyday tasks, work, gaming, and demanding workloads. Understand when upgrading from 8GB to 16GB or 32GB makes sense.",
};

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "how-much-ram-do-i-need") {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Guide Not Found
          </h1>

          <Link
            href="/tips-guides"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Tips & Guides
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500 dark:text-slate-400">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/tips-guides"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Tips & Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-slate-300">
            RAM Guide
          </span>
        </nav>

        {/* Header */}
        <header>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
            RAM
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            How Much RAM Do I Need for My Laptop?
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-slate-400">
            The right amount of RAM depends on how you use your laptop. For
            many users, 8GB can handle basic tasks, while 16GB provides more
            room for multitasking and demanding applications.
          </p>
        </header>

        {/* Quick Answer */}
        <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick answer
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-slate-300">
            If you are buying or upgrading a laptop today, <strong>16GB</strong>{" "}
            is a practical target for general productivity, multitasking, and
            many everyday workloads. Lighter users may be comfortable with
            8GB, while heavier workloads can benefit from 32GB or more.
          </p>
        </section>

        {/* Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How much RAM do you need?
          </h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-gray-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-5 py-4 font-semibold">RAM</th>
                    <th className="px-5 py-4 font-semibold">Typical use</th>
                    <th className="px-5 py-4 font-semibold">Experience</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                  <tr>
                    <td className="px-5 py-4 font-semibold">4GB</td>
                    <td className="px-5 py-4">
                      Very light browsing and basic tasks
                    </td>
                    <td className="px-5 py-4">
                      Limited multitasking
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-semibold">8GB</td>
                    <td className="px-5 py-4">
                      Web browsing, office work, streaming
                    </td>
                    <td className="px-5 py-4">
                      Suitable for many basic users
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-semibold">16GB</td>
                    <td className="px-5 py-4">
                      Productivity, multitasking, development, gaming
                    </td>
                    <td className="px-5 py-4">
                      More comfortable for heavier use
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-semibold">32GB+</td>
                    <td className="px-5 py-4">
                      Professional workloads, large projects, virtual machines
                    </td>
                    <td className="px-5 py-4">
                      Useful for demanding workloads
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4GB */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Is 4GB RAM enough?
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            4GB of RAM is very limited for modern laptop use. It may be enough
            for simple tasks, but opening multiple browser tabs or applications
            can quickly consume available memory.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            If your laptop supports a memory upgrade, moving beyond 4GB can
            make everyday multitasking more comfortable.
          </p>
        </section>

        {/* 8GB */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Is 8GB RAM enough?
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            8GB can be sufficient for basic productivity, web browsing,
            document editing, video streaming, and other everyday tasks.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            However, if you frequently keep many browser tabs and applications
            open at the same time, you may benefit from having more memory.
          </p>
        </section>

        {/* 16GB */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Is 16GB RAM better?
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            16GB provides more headroom for multitasking and demanding
            applications. It can be a practical target for users who work with
            larger applications, development tools, creative software, or
            games.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            Whether your particular laptop can reach 16GB depends on its
            hardware design, memory slots, onboard memory, and documented
            maximum capacity.
          </p>
        </section>

        {/* 32GB */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Who needs 32GB or more?
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            32GB or more can be useful for demanding workloads such as large
            development projects, virtual machines, professional creative
            applications, large datasets, and other memory-intensive tasks.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            More RAM is not automatically better for every user. The useful
            amount depends on the applications you run and how much memory
            they actually require.
          </p>
        </section>

        {/* Laptop compatibility */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Can every laptop be upgraded to more RAM?
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            No. Some laptops have upgradeable SO-DIMM memory, while others use
            soldered memory or have a combination of onboard memory and
            upgradeable slots.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            The maximum supported capacity can also vary between configurations
            of the same laptop model.
          </p>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Check your specific laptop
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
              Instead of guessing, use our compatibility checker to see
              documented RAM upgrade information for your laptop model.
            </p>

            <Link
              href="/checker"
              className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Check My Laptop
            </Link>
          </div>
        </section>

        {/* Final takeaway */}
        <section className="mt-12 border-t border-gray-200 pt-10 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bottom line
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            For basic laptop use, 8GB may be enough. For more comfortable
            multitasking and heavier everyday workloads, 16GB provides more
            memory headroom. Users with demanding professional workloads may
            benefit from 32GB or more.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            The most important step is checking what your specific laptop
            actually supports. Laptop Upgrade Checker can help you find
            documented RAM compatibility for supported models.
          </p>

          <Link
            href="/laptop-guides"
            className="mt-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Browse laptop upgrade guides →
          </Link>
        </section>
      </article>
    </main>
  );
}
