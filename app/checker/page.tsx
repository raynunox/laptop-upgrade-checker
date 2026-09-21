"use client";

import { useMemo, useState } from "react";
import { verifiedLaptops } from "../../data/verified-laptops";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [configurationId, setConfigurationId] = useState("");
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

  const selectedLaptop = useMemo(() => {
    return verifiedLaptops.find(
      (laptop) =>
        laptop.brand === brand &&
        laptop.model === model
    );
  }, [brand, model]);

  const configurations = selectedLaptop?.configurations ?? [];

  const selectedConfiguration = useMemo(() => {
    return configurations.find(
      (configuration) =>
        configuration.id === configurationId
    );
  }, [configurations, configurationId]);

  function handleBrandChange(value: string) {
    setBrand(value);
    setModel("");
    setConfigurationId("");
    setResult(null);
  }

  function handleModelChange(value: string) {
    setModel(value);
    setConfigurationId("");
    setResult(null);
  }

  function handleCheck() {
    if (!selectedLaptop) {
      setResult(null);
      return;
    }

    if (
      selectedLaptop.configurations.length > 1 &&
      !configurationId
    ) {
      return;
    }

    setResult(selectedLaptop);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Can I Upgrade My Laptop?
        </h1>

        <p className="mt-2 text-gray-600">
          Select your laptop and configuration to check upgrade compatibility.
        </p>

        <div className="mt-8 space-y-4">
          {/* BRAND */}
          <div>
            <label className="mb-2 block font-medium">
              Brand
            </label>

            <select
              value={brand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select brand
              </option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* MODEL */}
          <div>
            <label className="mb-2 block font-medium">
              Model
            </label>

            <select
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!brand}
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            >
              <option value="">
                {brand
                  ? "Select model"
                  : "Select brand first"}
              </option>

              {models.map((item) => (
                <option key={item.id} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>
          </div>

          {/* CONFIGURATION */}
          {selectedLaptop && configurations.length > 0 && (
            <div>
              <label className="mb-2 block font-medium">
                Configuration
              </label>

              <select
                value={configurationId}
                onChange={(e) => {
                  setConfigurationId(e.target.value);
                  setResult(null);
                }}
                className="w-full rounded-lg border p-3"
              >
                <option value="">
                  Select configuration
                </option>

                {configurations.map((configuration) => (
                  <option
                    key={configuration.id}
                    value={configuration.id}
                  >
                    {configuration.label}
                  </option>
                ))}
              </select>

              {selectedConfiguration?.conditions &&
                selectedConfiguration.conditions.length > 0 && (
                  <div className="mt-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-800">
                      Configuration notes
                    </p>

                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {selectedConfiguration.conditions.map(
                        (condition) => (
                          <li key={condition}>
                            {condition}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleCheck}
            disabled={
              !brand ||
              !model ||
              (configurations.length > 1 &&
                !configurationId)
            }
            className="rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check Compatibility
          </button>
        </div>

        {/* RESULT */}
        {result && selectedConfiguration && (
          <div className="mt-8 space-y-6">
            {/* LAPTOP HEADER */}
            <div className="rounded-lg border p-6">
              <p className="text-sm text-gray-500">
                {result.brand} {result.family}
              </p>

              <h2 className="text-2xl font-bold">
                {result.model}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Configuration:{" "}
                {selectedConfiguration.label}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Verification:{" "}
                {result.verificationStatus}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Last verified:{" "}
                {result.lastVerifiedAt ?? "Unknown"}
              </p>
            </div>

            {/* RAM */}
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">
                RAM
              </h3>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  Status:{" "}
                  {selectedConfiguration.memory.status === "yes"
                    ? "✅ Upgradeable"
                    : selectedConfiguration.memory.status === "no"
                    ? "❌ Not upgradeable"
                    : selectedConfiguration.memory.status ===
                      "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </p>

                <p>
                  Type:{" "}
                  {selectedConfiguration.memory.type ?? "Unknown"}
                </p>

                <p>
                  Form factor:{" "}
                  {selectedConfiguration.memory.formFactor ??
                    "Unknown"}
                </p>

                <p>
                  Slots:{" "}
                  {selectedConfiguration.memory.slots ??
                    "Unknown"}
                </p>

                <p>
                  Maximum:{" "}
                  {selectedConfiguration.memory.maxTotalGb
                    ? `${selectedConfiguration.memory.maxTotalGb} GB`
                    : "Unknown"}
                </p>
              </div>
            </div>

            {/* STORAGE */}
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">
                Storage
              </h3>

              <div className="mt-4 space-y-3 text-gray-700">
                <p>
                  Status:{" "}
                  {selectedConfiguration.storage.status === "yes"
                    ? "✅ Upgradeable"
                    : selectedConfiguration.storage.status === "no"
                    ? "❌ Not upgradeable"
                    : selectedConfiguration.storage.status ===
                      "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </p>

                {selectedConfiguration.storage.slots.length >
                  0 && (
                  <div>
                    <p className="font-medium">
                      Supported storage:
                    </p>

                    <div className="mt-2 space-y-2">
                      {selectedConfiguration.storage.slots.map(
                        (slot, index) => (
                          <div
                            key={`${slot.interface}-${index}`}
                            className="rounded-lg bg-gray-50 p-3"
                          >
                            <p>
                              <strong>Form factor:</strong>{" "}
                              {slot.formFactor.join(", ")}
                            </p>

                            <p>
                              <strong>Interface:</strong>{" "}
                              {slot.interface}
                            </p>

                            {slot.generation && (
                              <p>
                                <strong>Generation:</strong>{" "}
                                {slot.generation}
                              </p>
                            )}

                            {slot.maxCapacityGb && (
                              <p>
                                <strong>Documented maximum:</strong>{" "}
                                {slot.maxCapacityGb} GB
                              </p>
                            )}

                            <p>
                              <strong>Replaceable:</strong>{" "}
                              {slot.replaceable === "yes"
                                ? "✅ Yes"
                                : slot.replaceable === "no"
                                ? "❌ No"
                                : slot.replaceable ===
                                  "conditional"
                                ? "⚠️ Conditional"
                                : "❓ Unknown"}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-600">
                  {selectedConfiguration.storage.evidence
                    .notes ??
                    "See source documentation for details."}
                </p>
              </div>
            </div>

            {/* BATTERY */}
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">
                Battery
              </h3>

              <div className="mt-4 text-gray-700">
                <p>
                  Status:{" "}
                  {selectedConfiguration.battery.status === "yes"
                    ? "✅ Replaceable"
                    : selectedConfiguration.battery.status ===
                      "no"
                    ? "❌ Not replaceable"
                    : selectedConfiguration.battery.status ===
                      "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </p>
              </div>
            </div>

            {/* SOURCES */}
            <div className="rounded-lg border p-6">
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
