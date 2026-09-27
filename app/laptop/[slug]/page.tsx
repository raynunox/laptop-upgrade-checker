import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Props = {
  params: Promise<{ slug: string }>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getLaptopBySlug(slug: string) {
  const { data, error } = await supabase.from("laptops").select("*");

  if (error || !data) {
    console.error("Error fetching laptop:", error);
    return null;
  }

  return (
    data.find((laptop) => {
      const laptopSlug = slugify(
        `${laptop.brand}-${laptop.model}`
      );

      return laptopSlug === slug;
    }) ?? null
  );
}

export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("laptops")
    .select("brand, model");

  if (error || !data) {
    return [];
  }

  return data.map((laptop) => ({
    slug: slugify(`${laptop.brand}-${laptop.model}`),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const laptop = await getLaptopBySlug(slug);

  if (!laptop) {
    return {
      title: "Laptop Not Found | Laptop Upgrade Checker",
    };
  }

  return {
    title: `${laptop.brand} ${laptop.model} RAM & SSD Upgrade Guide`,
    description: `Check RAM, SSD storage, battery, and hardware upgrade compatibility for the ${laptop.brand} ${laptop.model}.`,
  };
}

export default async function LaptopPage({ params }: Props) {
  const { slug } = await params;
  const laptop = await getLaptopBySlug(slug);

  if (!laptop) {
    notFound();
  }

  const configurations = laptop.configurations ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Laptop Upgrade Guide
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {laptop.brand} {laptop.model}
          </h1>

          {(laptop.model_number || laptop.release_year) && (
            <p className="mt-2 text-sm text-slate-500">
              {laptop.model_number && `Model ${laptop.model_number}`}
              {laptop.model_number && laptop.release_year && " · "}
              {laptop.release_year && `Released ${laptop.release_year}`}
            </p>
          )}

          <div className="mt-5">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              {laptop.verification_status || "Unknown verification status"}
            </span>
          </div>
        </header>

        {/* INTRO */}
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Can you upgrade this laptop?
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600">
            Use the documented configuration information below to understand
            the RAM, storage, and battery upgrade options for this laptop.
            Compatibility can vary by factory configuration.
          </p>
        </section>

        {/* CONFIGURATIONS */}
        {configurations.map((config: any) => (
          <section
            key={config.id}
            className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {config.label}
                </h2>

                {config.conditions?.length > 0 && (
                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
                    {config.conditions.map((condition: string) => (
                      <li key={condition}>{condition}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* MEMORY */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Memory
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {config.memory?.status || "Unknown"}
                </p>

                {config.memory?.maxTotalGb && (
                  <p className="mt-1 text-sm text-slate-500">
                    Maximum {config.memory.maxTotalGb} GB
                  </p>
                )}

                {config.memory?.onboardGb && (
                  <p className="mt-1 text-sm text-slate-500">
                    {config.memory.onboardGb} GB soldered onboard
                  </p>
                )}

                {config.memory?.type && (
                  <p className="mt-1 text-sm text-slate-500">
                    {config.memory.type}
                  </p>
                )}

                {config.memory?.formFactor && (
                  <p className="mt-1 text-sm text-slate-500">
                    {config.memory.formFactor}
                  </p>
                )}

                {config.memory?.slots && (
                  <p className="mt-1 text-sm text-slate-500">
                    {config.memory.slots} RAM slot
                    {config.memory.slots > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* STORAGE */}
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Storage
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {config.storage?.status || "Unknown"}
                </p>

                {config.storage?.options?.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {config.storage.options.map(
                      (option: any, index: number) => (
                        <li
                          key={index}
                          className="text-sm text-slate-500"
                        >
                          {option.formFactor} · {option.interface}
                          {option.generation
                            ? ` · ${option.generation}`
                            : ""}
                          {option.maxCapacityGb
                            ? ` · up to ${
                                option.maxCapacityGb >= 1000
                                  ? `${option.maxCapacityGb / 1000} TB`
                                  : `${option.maxCapacityGb} GB`
                              }`
                            : ""}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    No documented storage options.
                  </p>
                )}
              </div>

              {/* BATTERY */}
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Battery
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {config.battery?.status || "Unknown"}
                </p>

                {config.battery?.capacityWh && (
                  <p className="mt-1 text-sm text-slate-500">
                    {config.battery.capacityWh} Wh
                  </p>
                )}

                {typeof config.battery?.replaceable === "boolean" && (
                  <p className="mt-1 text-sm text-slate-500">
                    {config.battery.replaceable
                      ? "Replaceable"
                      : "Not documented as replaceable"}
                  </p>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* SOURCES */}
        {laptop.sources?.length > 0 && (
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Sources
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {laptop.sources.map((source: any) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-semibold text-slate-900">
                    {source.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {source.publisher} · {source.type}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">
          <h2 className="text-2xl font-bold">
            Check your upgrade compatibility
          </h2>

          <p className="mt-2 text-slate-300">
            Want to check a specific RAM or SSD capacity? Use the compatibility
            checker for a detailed result.
          </p>

          <a
            href="/checker"
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Open Laptop Upgrade Checker
          </a>
        </section>
      </div>
    </main>
  );
}
