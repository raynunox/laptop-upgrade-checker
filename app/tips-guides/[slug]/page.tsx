
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuideBySlug } from "@/data/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide Not Found | Laptop Upgrade Checker",
    };
  }

  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    alternates: {
      canonical: `/tips-guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guide.relatedGuides
    .map((relatedSlug) => getGuideBySlug(relatedSlug))
    .filter((item) => item !== undefined);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <nav className="mb-8 text-sm text-gray-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
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
            {guide.title}
          </span>
        </nav>

        <header>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
            {guide.category}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {guide.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-slate-400">
            {guide.intro}
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick answer
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-slate-300">
            {guide.quickAnswer}
          </p>
        </section>

        <div className="mt-12 space-y-12">
          {guide.sections.map((section, index) => (
            <section key={`${section.heading}-${index}`}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="mt-4 leading-8 text-gray-600 dark:text-slate-400"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-gray-600 dark:text-slate-400">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-slate-800">
                        <tr>
                          {section.table.headers.map((header, headerIndex) => (
                            <th
                              key={headerIndex}
                              className="px-5 py-4 font-semibold"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-5 py-4 text-gray-600 dark:text-slate-300"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {section.callout && (
                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {section.callout.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-700 dark:text-slate-300">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Check your specific laptop
          </h2>
          <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-slate-400">
            Use our compatibility checker to find documented RAM and SSD
            upgrade information for your laptop model.
          </p>
          <Link
            href="/checker"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Check My Laptop
          </Link>
        </section>

        {relatedGuides.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-10 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Related guides
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/tips-guides/${relatedGuide.slug}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
                >
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {relatedGuide.category}
                  </span>
                  <h3 className="mt-2 font-bold text-gray-900 dark:text-white">
                    {relatedGuide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
                    {relatedGuide.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-slate-800">
          <Link
            href="/tips-guides"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Tips & Guides
          </Link>
        </div>
      </article>
    </main>
  );
}
