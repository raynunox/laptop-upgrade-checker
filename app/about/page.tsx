
import Link from "next/link";

export const metadata = {
  title: "About Laptop Upgrade Checker | RAM & SSD Upgrade Tool",
  description:
    "Learn about Laptop Upgrade Checker, a free tool for checking laptop RAM and SSD upgrade compatibility, supported capacities, and storage options.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 md:p-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="mt-10 space-y-4 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Laptop Upgrade Checker
          </Link>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            About Laptop Upgrade Checker
          </h1>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:p-8">
          <p>
            Laptop Upgrade Checker is a free tool that helps you find out whether
            a specific laptop model can have its RAM or storage (SSD) upgraded,
            before you spend money on parts that might not fit or might not work
            at all.
          </p>

          <p>
            Many modern laptops solder their memory directly onto the
            motherboard, or only expose a single accessible storage slot. Buying
            an upgrade kit without knowing this in advance is one of the most
            common (and most frustrating) mistakes laptop owners make. We built
            this tool to solve that problem with a simple search: type in your
            laptop&apos;s brand and model, and get a clear answer.
          </p>

          <h2 className="pt-2 text-xl font-bold text-slate-900 dark:text-white">
            What we check
          </h2>

          <ul className="list-inside list-disc space-y-2">
            <li>Whether the RAM is upgradeable, soldered, or a mix of both</li>
            <li>Maximum supported RAM capacity</li>
            <li>Whether the storage drive can be replaced or expanded</li>
            <li>Number of available storage slots and their type</li>
          </ul>

          <p>
            Our database is built and maintained independently, cross-referencing
            official manufacturer documentation, teardown guides, and community
            reports. We are not affiliated with any laptop manufacturer.
          </p>

          <p>
            Have a laptop model that isn&apos;t in our database yet, or spotted
            something that looks wrong? We&apos;d love to hear from you — see our{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
