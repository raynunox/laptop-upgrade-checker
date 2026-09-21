"use client";

import { useState } from "react";
import laptops from "../../data/laptops.json";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [result, setResult] = useState<(typeof laptops)[number] | null>(null);
  const [notFound, setNotFound] = useState(false);

  function handleCheck() {
    const found = laptops.find(
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

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold">
          Can I Upgrade My Laptop?
        </h1>

        <p className="mt-2 text-gray-600">
          Check your laptop upgrade compatibility.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block mb-2 font-medium">
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
            <label className="block mb-2 font-medium">
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
              Laptop not found in our database.
            </p>

            <p className="mt-2 text-gray-600">
              Try another model.
            </p>
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-lg border p-6">
            <h2 className="text-2xl font-bold">
              {result.brand} {result.model}
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <strong>RAM</strong>
                <p>Upgrade status: {String(result.ram.upgradeable)}</p>
              </div>

              <div>
                <strong>Storage</strong>
                <p>Upgrade status: {String(result.storage.upgradeable)}</p>
              </div>

              <div>
                <strong>Battery</strong>
                <p>Replaceable: {String(result.battery.replaceable)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
