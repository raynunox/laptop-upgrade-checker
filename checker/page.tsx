"use client";

import { useState } from "react";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

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
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Check Compatibility
          </button>
        </div>
      </div>
    </main>
  );
}
