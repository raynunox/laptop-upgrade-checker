import Link from "next/link";

export const metadata = {
  title: "About | Laptop Upgrade Checker",
  description:
    "Learn what Laptop Upgrade Checker does and why we built a free tool to check RAM and SSD upgrade limits for laptops.",
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4 mt-10">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:underline">
            ← Back to Laptop Upgrade Checker
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About Laptop Upgrade Checker
          </h1>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
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
            laptop's brand and model, and get a clear answer.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-2">
            What we check
          </h2>
          <ul className="list-disc list-inside space-y-2">
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
            Have a laptop model that isn't in our database yet, or spotted
            something that looks wrong? We'd love to hear from you — see our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
