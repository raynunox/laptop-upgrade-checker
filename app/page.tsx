import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
        
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100">
          Hardware Compatibility Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
          Can I Upgrade My Laptop?
        </h1>

        <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto mb-10">
          Stop guessing before buying PC parts. Find out the exact maximum RAM and SSD capacity your laptop supports.
        </p>

        <Link
          href="/checker"
          className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Check My Laptop Now
        </Link>
        
      </div>
    </main>
  );
}
