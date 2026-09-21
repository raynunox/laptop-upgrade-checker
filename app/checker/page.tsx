"use client";

import { useMemo, useState } from "react";
import { verifiedLaptops } from "../../data/verified-laptops";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [result, setResult] = useState<
    (typeof verifiedLaptops)[number] | null
  >(null);

  const brands = useMemo(() => {
    return [...new Set(verifiedLaptops.map((laptop) => laptop.brand))].sort();
  }, []);

  const models = useMemo(() => {
    if (!brand) return [];

    return verifiedLaptops
      .filter((laptop) => laptop.brand === brand)
      .sort((a, b) => a.model.localeCompare(b.model));
  }, [brand]);

  function handleBrandChange(value: string) {
    setBrand(value);
    setModel("");
    setResult(null);
  }

  function handleCheck() {
    const found = verifiedLaptops.find(
      (laptop) =>
        laptop.brand === brand &&
        laptop.model === model
    );

    setResult(found ?? null);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Can I Upgrade My Laptop?
        </h1>

        <p className="mt-2 text-gray-600">
          Select your laptop to check upgrade compatibility.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block font-medium">
              Brand
            </label>

            <select
              value={brand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select brand</option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Model
            </label>

            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setResult(null);
              }}
              disabled={!brand}
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            >
              <option value="">
                {brand ? "Select model" : "Select brand first"}
              </option>

              {models.map((item) => (
                <option key={item.id} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleCheck}
            disabled={!brand || !model}
            className="rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check Compatibility
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="rounded-lg border p-6">
              <p className="text-sm text-gray-500">
                {result.brand} {result.family}
              </p>

              <h2 className="text-2xl font-bold">
                {result.model}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Verification: {result.verificationStatus}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Last verified: {result.lastVerifiedAt ?? "Unknown"}
              </p>
            </div>
          </div>
        )}

        {brand && models.length === 0 && (
          <div className="mt-8 rounded-lg border p-4">
            No models are currently available for this brand.
          </div>
        )}
      </div>
    </main>
  );
}
