"use client";

import { useState } from "react";
import { verifiedLaptops } from "../../data/verified-laptops";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [result, setResult] = useState<
    (typeof verifiedLaptops)[number] | null
  >(null);
  const [notFound, setNotFound] = useState(false);

  function handleCheck() {
    const found = verifiedLaptops.find(
      (laptop) =>
        laptop.brand.toLowerCase() === brand.trim().toLowerCase() &&
        laptop.model.toLowerCase() === model.trim().toLowerCase()
    );

    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }

  const configuration = result?.configurations[0];

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Can I Upgrade My Laptop?
        </h1>

        <p className="mt-2 text-gray-600">
          Check verified laptop upgrade compatibility.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block font-medium">
              Brand
            </label>

            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Dell"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Model
            </label>

            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Inspiron 15 3520"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="button"
            onClick={handleCheck}
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Check Compatibility
          </button>
        </div>

        {notFound && (
          <div className="mt-8 rounded-lg border p-4">
            <p className="font-medium">
              This laptop is not yet in our verified database.
            </p>

            <p className="mt-2 text-gray-600">
              We are continuously adding verified models.
            </p>
          </div>
        )}

        {result && configuration && (
          <div className="mt-8 space-y-6">
            <div className="rounded-lg border p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {result.brand} {result.family}
                  </p>

                  <h2 className="text-2xl font-bold">
                    {result.model}
                  </h2>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Verified
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Last verified: {result.lastVerifiedAt}
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">
                RAM
              </h3>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  Status:{" "}
                  {configuration.memory.status === "yes"
                    ? "✅ Upgradeable"
                    : configuration.memory.status === "no"
                    ? "❌ Not upgradeable"
                    : configuration.memory.status === "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </p>

                <p>
                  Type: {configuration.memory.type ?? "Unknown"}
                </p>

                <p>
                  Form factor:{" "}
                  {configuration.memory.formFactor ?? "Unknown"}
                </p>

                <p>
                  Slots:{" "}
                  {configuration.memory.slots ?? "Unknown"}
                </p>

                <p>
                  Maximum:{" "}
                  {configuration.memory.maxTotalGb
                    ? `${configuration.memory.maxTotalGb} GB`
                    : "Unknown"}
                </p>

                {configuration.memory.maxSpeedMhz && (
                  <p>
                    Maximum speed:{" "}
                    {configuration.memory.maxSpeedMhz} MHz
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">
                Storage
              </h3>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  Status:{" "}
                  {configuration.storage.status === "yes"
                    ? "✅ Upgradeable"
                    : configuration.storage.status === "no"
                    ? "❌ Not upgradeable"
                    : configuration.storage.status === "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </p>

                <p>
                  Documented slots:{" "}
                  {configuration.storage.slots.length}
                </p>

                <p>
                  Details:{" "}
                  {configuration.storage.evidence.notes ??
                    "See source documentation."}
                </p>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">
                Battery
              </h3>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  Status:{" "}
                  {configuration.battery.status === "yes"
                    ? "✅ Replaceable"
                    : configuration.battery.status === "no"
                    ? "❌ Not replaceable"
                    : configuration.battery.status ===
                      "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-gray-50 p-6">
              <h3 className="text-lg font-semibold">
                Sources
              </h3>

              <div className="mt-4 space-y-3">
                {result.sources.map((source) => (
                  <div key={source.id}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      {source.title}
                    </a>

                    <p className="text-sm text-gray-500">
                      {source.publisher} · {source.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
