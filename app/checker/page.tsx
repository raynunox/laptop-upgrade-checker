"use client";

import { useMemo, useState } from "react";
import { laptops } from "../../data/laptops";
import {
  checkRamCompatibility,
  checkStorageCompatibility,
  getStatusLabel,
} from "../../lib/compatibility";

type CheckType = "ram" | "storage";

export default function CheckerPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [configurationId, setConfigurationId] = useState("");

  const [checkType, setCheckType] =
    useState<CheckType | "">("");

  const [ramCapacity, setRamCapacity] = useState("");
  const [storageOptionId, setStorageOptionId] =
    useState("");
  const [storageCapacity, setStorageCapacity] =
    useState("");

  const [hasChecked, setHasChecked] = useState(false);

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

  const selectedStorageOption = useMemo(() => {
    if (!selectedConfiguration || !storageOptionId) {
      return null;
    }

    return selectedConfiguration.storage.options.find(
      (option, index) =>
        `${option.formFactor}-${option.interface}-${index}` ===
        storageOptionId
    );
  }, [selectedConfiguration, storageOptionId]);

  const ramCapacities = useMemo(() => {
  return [
    4,
    8,
    16,
    24,
    32,
    40,
    48,
    64,
    96,
    128,
  ];
}, []);

    const max =
      selectedConfiguration?.memory.maxTotalGb;

    const onboard =
      selectedConfiguration?.memory.onboardGb;

    return common.filter((capacity) => {
      if (onboard && capacity < onboard) {
        return false;
      }

      if (max && capacity > max) {
        return false;
      }

      return true;
    });
  }, [selectedConfiguration]);

  const storageCapacities = useMemo(() => {
    const common = [
      128,
      256,
      500,
      512,
      1000,
      2000,
      4000,
      8000,
    ];

    const max =
      selectedStorageOption?.maxCapacityGb;

    return common.filter((capacity) => {
      if (max && capacity > max) {
        return false;
      }

      return true;
    });
  }, [selectedStorageOption]);

  function resetChecks() {
    setCheckType("");
    setRamCapacity("");
    setStorageOptionId("");
    setStorageCapacity("");
    setHasChecked(false);
  }

  function handleBrandChange(value: string) {
    setBrand(value);
    setModel("");
    setConfigurationId("");
    resetChecks();
  }

  function handleModelChange(value: string) {
    setModel(value);
    setConfigurationId("");
    resetChecks();
  }

  function handleConfigurationChange(value: string) {
    setConfigurationId(value);
    resetChecks();
  }

  function handleCheck() {
    setHasChecked(true);
  }

  const ramResult =
    hasChecked &&
    checkType === "ram" &&
    selectedConfiguration &&
    ramCapacity
      ? checkRamCompatibility(
          selectedConfiguration.memory,
          Number(ramCapacity)
        )
      : null;

  const storageResult =
    hasChecked &&
    checkType === "storage" &&
    selectedConfiguration &&
    selectedStorageOption
      ? checkStorageCompatibility(
          selectedConfiguration.storage,
          {
            formFactor:
              selectedStorageOption.formFactor,
            interface:
              selectedStorageOption.interface,
            capacityGb: storageCapacity
              ? Number(storageCapacity)
              : undefined,
          }
        )
      : null;

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div>
          <p className="text-sm font-semibold tracking-wide text-gray-500">
            LAPTOP UPGRADE CHECKER
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Can I Upgrade My Laptop?
          </h1>

          <p className="mt-2 text-gray-600">
            Check whether a RAM or storage upgrade is
            compatible with your laptop.
          </p>
        </div>

        {/* LAPTOP SELECTION */}
        <section className="mt-8 rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            1. Select your laptop
          </h2>

          <div className="mt-5 space-y-5">

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
                    selectedConfiguration.conditions
                      .length > 0 && (
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
          </div>
        </section>

        {/* COMPONENT */}
        {selectedConfiguration && (
          <section className="mt-6 rounded-2xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              2. What do you want to upgrade?
            </h2>

            <div className="mt-5">
              <select
                value={checkType}
                onChange={(e) => {
                  setCheckType(
                    e.target.value as CheckType
                  );

                  setRamCapacity("");
                  setStorageOptionId("");
                  setStorageCapacity("");
                  setHasChecked(false);
                }}
                className="w-full rounded-xl border p-3"
              >
                <option value="">
                  Select component
                </option>

                <option value="ram">
                  RAM
                </option>

                <option value="storage">
                  SSD / Storage
                </option>
              </select>
            </div>
          </section>
        )}

        {/* RAM */}
        {selectedConfiguration &&
          checkType === "ram" && (
            <section className="mt-6 rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                3. Select target RAM
              </h2>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold">
                  Target capacity
                </label>

                <select
                  value={ramCapacity}
                  onChange={(e) => {
                    setRamCapacity(e.target.value);
                    setHasChecked(false);
                  }}
                  className="w-full rounded-xl border p-3"
                >
                  <option value="">
                    Select RAM capacity
                  </option>

                  {ramCapacities.map((capacity) => (
                    <option
                      key={capacity}
                      value={capacity}
                    >
                      {capacity} GB
                    </option>
                  ))}
                </select>
              </div>
            </section>
          )}

        {/* STORAGE */}
        {selectedConfiguration &&
          checkType === "storage" && (
            <section className="mt-6 rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                3. Select target storage
              </h2>

              <div className="mt-5 space-y-5">

                {/* STORAGE OPTION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Storage type
                  </label>

                  <select
                    value={storageOptionId}
                    onChange={(e) => {
                      setStorageOptionId(
                        e.target.value
                      );
                      setStorageCapacity("");
                      setHasChecked(false);
                    }}
                    className="w-full rounded-xl border p-3"
                  >
                    <option value="">
                      Select storage option
                    </option>

                    {selectedConfiguration.storage.options.map(
                      (option, index) => (
                        <option
                          key={`${option.formFactor}-${option.interface}-${index}`}
                          value={`${option.formFactor}-${option.interface}-${index}`}
                        >
                          {option.formFactor} ·{" "}
                          {option.interface}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* CAPACITY */}
                {selectedStorageOption && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Target capacity
                    </label>

                    <select
                      value={storageCapacity}
                      onChange={(e) => {
                        setStorageCapacity(
                          e.target.value
                        );
                        setHasChecked(false);
                      }}
                      className="w-full rounded-xl border p-3"
                    >
                      <option value="">
                        Select capacity
                      </option>

                      {storageCapacities.map(
                        (capacity) => (
                          <option
                            key={capacity}
                            value={capacity}
                          >
                            {capacity >= 1000
                              ? `${capacity / 1000} TB`
                              : `${capacity} GB`}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
            </section>
          )}

        {/* CHECK BUTTON */}
        {selectedConfiguration &&
          ((checkType === "ram" &&
            ramCapacity) ||
            (checkType === "storage" &&
              storageOptionId &&
              storageCapacity)) && (
            <button
              type="button"
              onClick={handleCheck}
              className="mt-6 w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800"
            >
              Check Compatibility
            </button>
          )}

        {/* RAM RESULT */}
        {ramResult && (
          <section className="mt-6 rounded-2xl border p-6">
            <p className="text-sm text-gray-500">
              Compatibility result
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {getStatusLabel(ramResult.status)}
            </h2>

            <p className="mt-3 font-medium">
              {ramResult.title}
            </p>

            <p className="mt-2 text-gray-600">
              {ramResult.reason}
            </p>
          </section>
        )}

        {/* STORAGE RESULT */}
        {storageResult && (
          <section className="mt-6 rounded-2xl border p-6">
            <p className="text-sm text-gray-500">
              Compatibility result
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {getStatusLabel(storageResult.status)}
            </h2>

            <p className="mt-3 font-medium">
              {storageResult.title}
            </p>

            <p className="mt-2 text-gray-600">
              {storageResult.reason}
            </p>
          </section>
        )}

        {/* SOURCES */}
        {hasChecked &&
          selectedLaptop &&
          selectedConfiguration && (
            <section className="mt-6 rounded-2xl border p-6">
              <h2 className="text-lg font-semibold">
                Sources
              </h2>

              <div className="mt-4 space-y-3">
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
            </section>
          )}
      </div>
    </main>
  );
}
