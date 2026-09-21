import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-bold">
          Can I Upgrade My Laptop?
        </h1>

        <p className="mt-4 text-gray-600">
          Find out whether your laptop can be upgraded.
        </p>

        <Link
          href="/checker"
          className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          Check My Laptop
        </Link>
      </div>
    </main>
  );
}
