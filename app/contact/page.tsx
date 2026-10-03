
import Link from "next/link";

export const metadata = {
  title: "Contact Laptop Upgrade Checker | Questions & Corrections",
  description:
    "Contact Laptop Upgrade Checker for questions, data corrections, laptop model requests, or suggestions about RAM and SSD upgrade compatibility.",
};

export default function ContactPage() {
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
            Contact Us
          </h1>

          <p className="mx-auto max-w-xl text-lg text-slate-500 dark:text-slate-400">
            Questions, feedback, or found an error in our data? We&apos;d love
            to hear from you.
          </p>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:p-8">
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Email
            </h2>

            <a
              href="mailto:sixerium@gmail.com"
              className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              sixerium@gmail.com
            </a>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              We usually reply within a few business days.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              What to include
            </h2>

            <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-slate-400">
              <li>The exact laptop brand and model you&apos;re asking about</li>
              <li>A link or source if you&apos;re reporting incorrect specs</li>
              <li>Any suggestions for laptops you&apos;d like us to add</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
