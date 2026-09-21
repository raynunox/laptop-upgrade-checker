"use client";

import { useMemo, useState } from "react";
import { verifiedLaptops } from "../../data/verified-laptops";

type Laptop = (typeof verifiedLaptops)[number];
type Configuration = Laptop["configurations"][number];

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [configurationId, setConfigurationId] = useState("");
  const [result, setResult] = useState<Laptop | null>(null);

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

  const selectedConfiguration = useMemo<Configuration | null>(() => {
    if (!selectedLaptop) return null;

    return (
      selectedLaptop.configurations.find(
        (configuration) =>
          configuration.id === configurationId
      ) ?? null
    );
  }, [selectedLaptop, configurationId]);

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

  function handleConfigurationChange(value: string) {
    setConfigurationId(value);
    setResult(null);
  }

  function handleCheck() {
    if (!selectedLaptop) {
      setResult(null);
      return;
    }

    if (
      configurations.length > 1 &&
      !configurationId
    ) {
      return;
    }

    setResult(selectedLaptop);
  }

  function getCompatibilityLabel(
    status: string
  ) {
    switch (status) {
      case "yes":
        return "✅ Upgradeable";
      case "no":
        return "❌ Not upgradeable";
      case "conditional":
        return "⚠️ Conditional";
      default:
        return "❓ Unknown";
    }
  }

  function getVerificationLabel(
    status: Laptop["verificationStatus"]
  ) {
    switch (status) {
      case "verified":
        return "✅ Verified";
      case "partially_verified":
        return "⚠️ Partially Verified";
      case "needs_review":
        return "🔎 Needs Review";
      default:
        return "📝 Draft";
    }
  }

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            LAPTOP UPGRADE CHECKER
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Can I Upgrade My Laptop?
          </h1>

          <p className="mt-2 text-gray-600">
            Select your laptop and factory configuration
            to check upgrade compatibility.
          </p>
        </div>

        {/* CHECKER FORM */}
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-5">
            {/* BRAND */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Brand
              </label>

              <select
                value={brand}
                onChange={(e) =>
                  handleBrandChange(e.target.value)
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-black"
              >
                <option value="">
                  Select brand
                </option>

                {brands.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* MODEL */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Model
              </label>

              <select
                value={model}
                onChange={(e) =>
                  handleModelChange(e.target.value)
                }
                disabled={!brand}
                className="w-full rounded-xl border p-3 outline-none focus:border-black disabled:bg-gray-100"
              >
                <option value="">
                  {brand
                    ? "Select model"
                    : "Select brand first"}
                </option>

                {models.map((item) => (
                  <option
                    key={item.id}
                    value={item.model}
                  >
                    {item.model}
                  </option>
                ))}
              </select>
            </div>

            {/* CONFIGURATION */}
            {selectedLaptop &&
              configurations.length > 0 && (
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Factory Configuration
                  </label>

                  <select
                    value={configurationId}
                    onChange={(e) =>
                      handleConfigurationChange(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border p-3 outline-none focus:border-black"
                  >
                    <option value="">
                      Select configuration
                    </option>

                    {configurations.map(
                      (configuration) => (
                        <option
                          key={configuration.id}
                          value={configuration.id}
                        >
                          {configuration.label}
                        </option>
                      )
                    )}
                  </select>

                  {selectedConfiguration?.conditions &&
                    selectedConfiguration.conditions.length >
                      0 && (
                      <div className="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                        <p className="font-semibold text-gray-900">
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
              className="w-full rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check Compatibility
            </button>
          </div>
        </div>

        {/* RESULT */}
        {result && selectedConfiguration && (
          <div className="mt-8 space-y-6">
            {/* LAPTOP SUMMARY */}
            <section className="rounded-2xl border p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {result.brand} {result.family}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    {result.model}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    Configuration:{" "}
                    <span className="font-medium text-gray-900">
                      {selectedConfiguration.label}
                    </span>
                  </p>
                </div>

                <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                  {getVerificationLabel(
                    result.verificationStatus
                  )}
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Last verified:{" "}
                {result.lastVerifiedAt ?? "Unknown"}
              </p>
            </section>

            {/* RAM */}
            <section className="rounded-2xl border p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">
                  RAM
                </h3>

                <span className="text-sm font-medium">
                  {getCompatibilityLabel(
                    selectedConfiguration.memory.status
                  )}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Memory type
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.memory.type ??
                      "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Form factor
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.memory.formFactor ??
                      "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Slots
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.memory.slots ??
                      "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Maximum total memory
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.memory.maxTotalGb
                      ? `${selectedConfiguration.memory.maxTotalGb} GB`
                      : "Unknown"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">
                    Supported memory speeds
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.memory
                      .supportedSpeedsMts?.length
                      ? selectedConfiguration.memory.supportedSpeedsMts
                          .map(
                            (speed) =>
                              `${speed} MT/s`
                          )
                          .join(" / ")
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </section>

            {/* STORAGE */}
            <section className="rounded-2xl border p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">
                  Storage
                </h3>

                <span className="text-sm font-medium">
                  {getCompatibilityLabel(
                    selectedConfiguration.storage.status
                  )}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Physical storage slots
                </p>

                <p className="mt-1 font-medium">
                  {selectedConfiguration.storage
                    .physicalSlots}
                </p>
              </div>

              {selectedConfiguration.storage.options
                .length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold">
                    Supported storage options
                  </p>

                  <div className="mt-3 space-y-3">
                    {selectedConfiguration.storage.options.map(
                      (option, index) => (
                        <div
                          key={`${option.formFactor}-${option.interface}-${index}`}
                          className="rounded-xl bg-gray-50 p-4"
                        >
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-gray-500">
                                Form factor
                              </p>

                              <p className="mt-1 font-medium">
                                {option.formFactor}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Interface
                              </p>

                              <p className="mt-1 font-medium">
                                {option.interface}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Generation
                              </p>

                              <p className="mt-1 font-medium">
                                {option.generation ??
                                  "Unknown"}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Documented maximum
                              </p>

                              <p className="mt-1 font-medium">
                                {option.maxCapacityGb
                                  ? `${option.maxCapacityGb} GB`
                                  : "Unknown"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 border-t pt-3">
                            <p className="text-sm text-gray-500">
                              Replaceable
                            </p>

                            <p className="mt-1 font-medium">
                              {option.replaceable ===
                              "yes"
                                ? "✅ Yes"
                                : option.replaceable ===
                                  "no"
                                ? "❌ No"
                                : option.replaceable ===
                                  "conditional"
                                ? "⚠️ Conditional"
                                : "❓ Unknown"}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedConfiguration.storage.evidence
                .notes && (
                <div className="mt-5 rounded-xl border-l-4 border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                  {
                    selectedConfiguration.storage
                      .evidence.notes
                  }
                </div>
              )}
            </section>

            {/* BATTERY */}
            <section className="rounded-2xl border p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">
                  Battery
                </h3>

                <span className="text-sm font-medium">
                  {selectedConfiguration.battery.status ===
                  "yes"
                    ? "✅ Replaceable"
                    : selectedConfiguration.battery
                        .status === "no"
                    ? "❌ Not replaceable"
                    : selectedConfiguration.battery
                        .status === "conditional"
                    ? "⚠️ Conditional"
                    : "❓ Unknown"}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Removable
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.battery
                      .removable === true
                      ? "Yes"
                      : selectedConfiguration.battery
                          .removable === false
                      ? "No"
                      : "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Replaceable
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedConfiguration.battery
                      .replaceable === true
                      ? "Yes"
                      : selectedConfiguration.battery
                          .replaceable === false
                      ? "No"
                      : "Unknown"}
                  </p>
                </div>

                {selectedConfiguration.battery
                  .capacityWh && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Capacity
                    </p>

                    <p className="mt-1 font-medium">
                      {
                        selectedConfiguration.battery
                          .capacityWh
                      }{" "}
                      Wh
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* SOURCES */}
            <section className="rounded-2xl border p-6">
              <h3 className="text-xl font-semibold">
                Sources
              </h3>

              <div className="mt-5 space-y-4">
                {result.sources.map((source) => (
                  <div
                    key={source.id}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      {source.title}
                    </a>

                    <p className="mt-1 text-sm text-gray-500">
                      {source.publisher} ·{" "}
                      {source.type}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Accessed: {source.accessedAt}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
