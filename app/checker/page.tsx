"use client";

import { useMemo, useState } from "react";
import { laptops } from "../../data/laptops";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [configurationId, setConfigurationId] = useState("");
  const [checked, setChecked] = useState(false);

  const brands = useMemo(() => {
    return [...new Set(laptops.map((laptop) => laptop.brand))].sort();
  }, []);

  const models = useMemo(() => {
    if (!brand) return [];

    return laptops
      .filter((laptop) => laptop.brand === brand)
      .sort((a, b) => a.model.localeCompare(b.model));
  }, [brand]);

  const selectedLaptop = useMemo(() => {
    return laptops.find(
      (laptop) =>
        laptop.brand === brand &&
        laptop.model === model
    );
  }, [brand, model]);

  const configurations =
    selectedLaptop?.configurations ?? [];

  const selectedConfiguration = useMemo(() => {
    if (!selectedLaptop) return null;

    return selectedLaptop.configurations.find(
      (configuration) =>
        configuration.id === configurationId
    );
  }, [selectedLaptop, configurationId]);

  function handleBrandChange(value: string) {
    setBrand(value);
    setModel("");
    setConfigurationId("");
    setChecked(false);
  }

  function handleModelChange(value: string) {
    setModel(value);
    setConfigurationId("");
    setChecked(false);
  }

  function handleConfigurationChange(value: string) {
    setConfigurationId(value);
    setChecked(false);
  }

  function handleCheck() {
    if (!selectedLaptop) return;

    if (
      configurations.length > 1 &&
      !configurationId
    ) {
      return;
    }

    setChecked(true);
  }

  function compatibilityLabel(status: string) {
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

  function verificationLabel(status: string) {
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
          <p className="text-sm font-semibold tracking-wide text-gray-500">
            LAPTOP UPGRADE CHECKER
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Can I Upgrade My Laptop?
          </h1>

          <p className="mt-2 text-gray-600">
            Select your laptop and configuration to check
            its upgrade compatibility.
          </p>
        </div>

        {/* FORM */}
        <section className="mt-8 rounded-2xl border p-6 shadow-sm">
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
                className="w-full rounded-xl border p-3"
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
                className="w-full rounded-xl border p-3 disabled:bg-gray-100"
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
                    className="w-full rounded-xl border p-3"
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
              className="w-full rounded-xl bg-black px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check Compatibility
            </button>
          </div>
        </section>

        {/* RESULT */}
        {checked &&
          selectedLaptop &&
          selectedConfiguration && (
            <section className="mt-8 space-y-6">

              {/* SUMMARY */}
              <div className="rounded-2xl border p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {selectedLaptop.brand}{" "}
                      {selectedLaptop.family}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {selectedLaptop.model}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      Configuration:{" "}
                      <span className="font-medium text-gray-900">
                        {selectedConfiguration.label}
                      </span>
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                    {verificationLabel(
                      selectedLaptop.verificationStatus
                    )}
                  </span>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  Last verified:{" "}
                  {selectedLaptop.lastVerifiedAt ??
                    "Unknown"}
                </p>
              </div>

              {/* RAM */}
              <div className="rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    RAM
                  </h3>

                  <span className="text-sm font-medium">
                    {compatibilityLabel(
                      selectedConfiguration.memory.status
                    )}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-gray-500">
                      Type
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
                      {selectedConfiguration.memory
                        .formFactor ?? "Unknown"}
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
                      Maximum
                    </p>

                    <p className="mt-1 font-medium">
                      {selectedConfiguration.memory.maxTotalGb
                        ? `${selectedConfiguration.memory.maxTotalGb} GB`
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">
                      Supported speeds
                    </p>

                    <p className="mt-1 font-medium">
                      {selectedConfiguration.memory
                        .supportedSpeedsMts?.length
                        ? selectedConfiguration.memory
                            .supportedSpeedsMts
                            .map(
                              (speed) =>
                                `${speed} MT/s`
                            )
                            .join(" / ")
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {/* STORAGE */}
              <div className="rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    Storage
                  </h3>

                  <span className="text-sm font-medium">
                    {compatibilityLabel(
                      selectedConfiguration.storage.status
                    )}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Physical storage slots
                  </p>

                  <p className="mt-1 font-medium">
                    {
                      selectedConfiguration.storage
                        .physicalSlots
                    }
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold">
                    Supported storage options
                  </p>

                  {selectedConfiguration.storage.options.map(
                    (option, index) => (
                      <div
                        key={`${option.formFactor}-${option.interface}-${index}`}
                        className="rounded-xl bg-gray-50 p-4"
                      >
                        <p>
                          <span className="text-gray-500">
                            Form factor:
                          </span>{" "}
                          <strong>
                            {option.formFactor}
                          </strong>
                        </p>

                        <p className="mt-1">
                          <span className="text-gray-500">
                            Interface:
                          </span>{" "}
                          <strong>
                            {option.interface}
                          </strong>
                        </p>

                        <p className="mt-1">
                          <span className="text-gray-500">
                            Generation:
                          </span>{" "}
                          <strong>
                            {option.generation ??
                              "Unknown"}
                          </strong>
                        </p>

                        <p className="mt-1">
                          <span className="text-gray-500">
                            Documented maximum:
                          </span>{" "}
                          <strong>
                            {option.maxCapacityGb
                              ? `${option.maxCapacityGb} GB`
                              : "Unknown"}
                          </strong>
                        </p>

                        <p className="mt-1">
                          <span className="text-gray-500">
                            Replaceable:
                          </span>{" "}
                          <strong>
                            {option.replaceable === "yes"
                              ? "✅ Yes"
                              : option.replaceable ===
                                "no"
                              ? "❌ No"
                              : option.replaceable ===
                                "conditional"
                              ? "⚠️ Conditional"
                              : "❓ Unknown"}
                          </strong>
                        </p>
                      </div>
                    )
                  )}
                </div>

                {selectedConfiguration.storage.evidence
                  .notes && (
                  <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                    {
                      selectedConfiguration.storage
                        .evidence.notes
                    }
                  </div>
                )}
              </div>

              {/* BATTERY */}
              <div className="rounded-2xl border p-6">
                <div className="flex items-center justify-between">
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

                <div className="mt-4 space-y-2">
                  <p>
                    <span className="text-gray-500">
                      Removable:
                    </span>{" "}
                    {selectedConfiguration.battery
                      .removable === true
                      ? "Yes"
                      : selectedConfiguration.battery
                          .removable === false
                      ? "No"
                      : "Unknown"}
                  </p>

                  <p>
                    <span className="text-gray-500">
                      Capacity:
                    </span>{" "}
                    {selectedConfiguration.battery
                      .capacityWh
                      ? `${selectedConfiguration.battery.capacityWh} Wh`
                      : "Unknown"}
                  </p>
                </div>
              </div>

              {/* SOURCES */}
              <div className="rounded-2xl border p-6">
                <h3 className="text-xl font-semibold">
                  Sources
                </h3>

                <div className="mt-5 space-y-3">
                  {selectedLaptop.sources.map(
                    (source) => (
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
                          Accessed:{" "}
                          {source.accessedAt}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          )}
      </div>
    </main>
  );
}
