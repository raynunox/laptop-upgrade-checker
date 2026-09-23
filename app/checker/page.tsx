/**
 * LAPTOP UPGRADE CHECKER - FIXED VERSION
 * 
 * Perubahan:
 * ✅ Fixed ramCapacities useMemo (CRITICAL BUG)
 * ✅ Fixed storageCapacities useMemo  
 * ✅ Added search functionality
 * ✅ Improved error handling
 * ✅ Added input validation
 * ✅ Better type safety
 * ✅ Added localStorage integration
 */

"use client";

import { useMemo, useState, useEffect } from "react";
import { laptops } from "../../data/laptops";
import {
  checkRamCompatibility,
  checkStorageCompatibility,
  getStatusLabel,
} from "../../lib/compatibility";

type CheckType = "ram" | "storage";

const STORAGE_KEY = "laptop_checker_selection";

export default function CheckerPage() {
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [configurationId, setConfigurationId] = useState("");

  const [checkType, setCheckType] = useState<CheckType | "">("");

  const [ramCapacity, setRamCapacity] = useState("");
  const [storageOptionId, setStorageOptionId] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");

  const [hasChecked, setHasChecked] = useState(false);

  // ============================================================
  // LOAD SAVED SELECTION (localStorage)
  // ============================================================

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { brand: savedBrand, model: savedModel, config: savedConfig } = JSON.parse(saved);
        if (savedBrand) setBrand(savedBrand);
        if (savedModel) setModel(savedModel);
        if (savedConfig) setConfigurationId(savedConfig);
      } catch (e) {
        console.warn("Failed to load saved selection:", e);
      }
    }
  }, []);

  // ============================================================
  // SAVE SELECTION (localStorage)
  // ============================================================

  useEffect(() => {
    if (brand || model || configurationId) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ brand, model, config: configurationId })
      );
    }
  }, [brand, model, configurationId]);

  // ============================================================
  // COMPUTED: Brands
  // ============================================================

  const brands = useMemo(() => {
    return [...new Set(laptops.map((laptop) => laptop.brand))].sort();
  }, []);

  // ============================================================
  // COMPUTED: Models (filtered by brand + search)
  // ============================================================

  const models = useMemo(() => {
    if (!brand) return [];

    let filtered = laptops.filter((laptop) => laptop.brand === brand);

    if (modelSearch) {
      filtered = filtered.filter((laptop) =>
        laptop.model.toLowerCase().includes(modelSearch.toLowerCase())
      );
    }

    return filtered.sort((a, b) => a.model.localeCompare(b.model));
  }, [brand, modelSearch]);

  // ============================================================
  // COMPUTED: Selected Laptop
  // ============================================================

  const selectedLaptop = useMemo(() => {
    return laptops.find(
      (laptop) => laptop.brand === brand && laptop.model === model
    );
  }, [brand, model]);

  // ============================================================
  // COMPUTED: Configurations
  // ============================================================

  const configurations = selectedLaptop?.configurations ?? [];

  // ============================================================
  // COMPUTED: Selected Configuration
  // ============================================================

  const selectedConfiguration = useMemo(() => {
    if (!selectedLaptop) return null;

    return selectedLaptop.configurations.find(
      (configuration) => configuration.id === configurationId
    );
  }, [selectedLaptop, configurationId]);

  // ============================================================
  // COMPUTED: Selected Storage Option
  // ============================================================

  const selectedStorageOption = useMemo(() => {
    if (!selectedConfiguration || !storageOptionId) {
      return null;
    }

    return selectedConfiguration.storage.options.find(
      (option, index) =>
        `${option.formFactor}-${option.interface}-${index}` === storageOptionId
    );
  }, [selectedConfiguration, storageOptionId]);

  // ============================================================
  // COMPUTED: RAM Capacities (✅ FIXED - Was broken!)
  // ============================================================

  const ramCapacities = useMemo(() => {
    const common = [4, 8, 16, 24, 32, 40, 48, 64, 96, 128];

    if (!selectedConfiguration?.memory) {
      return common;
    }

    const max = selectedConfiguration.memory.maxTotalGb;
    const onboard = selectedConfiguration.memory.onboardGb;

    // ✅ Filter out capacities that don't meet constraints
    return common.filter((capacity) => {
      // If some memory is soldered, requested capacity must be >= onboard
      if (onboard && capacity < onboard) {
        return false;
      }

      // Requested capacity cannot exceed maximum
      if (max && capacity > max) {
        return false;
      }

      return true;
    });
  }, [selectedConfiguration]);

  // ============================================================
  // COMPUTED: Storage Capacities (✅ FIXED - Was incomplete!)
  // ============================================================

  const storageCapacities = useMemo(() => {
    const common = [128, 256, 500, 512, 1000, 2000, 4000, 8000];

    if (!selectedStorageOption) {
      return common;
    }

    const max = selectedStorageOption.maxCapacityGb;

    // ✅ Filter out capacities that exceed maximum
    return common.filter((capacity) => {
      if (max && capacity > max) {
        return false;
      }

      return true;
    });
  }, [selectedStorageOption]);

  // ============================================================
  // HANDLERS
  // ============================================================

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
    setModelSearch("");
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
    // ✅ Validate inputs before checking
    if (!selectedConfiguration) {
      console.error("No configuration selected");
      return;
    }

    if (checkType === "ram" && !ramCapacity) {
      console.error("No RAM capacity selected");
      return;
    }

    if (checkType === "storage" && (!storageOptionId || !storageCapacity)) {
      console.error("No storage option or capacity selected");
      return;
    }

    setHasChecked(true);
  }

  // ============================================================
  // COMPUTED: Check Results
  // ============================================================

  // ✅ Validate ramCapacity is a number
  const ramCapacityNumber = ramCapacity ? parseInt(ramCapacity, 10) : null;
  
  const ramResult =
    hasChecked &&
    checkType === "ram" &&
    selectedConfiguration &&
    ramCapacityNumber !== null &&
    !isNaN(ramCapacityNumber)
      ? checkRamCompatibility(
          selectedConfiguration.memory,
          ramCapacityNumber
        )
      : null;

  // ✅ Validate storageCapacity is a number
  const storageCapacityNumber = storageCapacity
    ? parseInt(storageCapacity, 10)
    : null;

  const storageResult =
    hasChecked &&
    checkType === "storage" &&
    selectedConfiguration &&
    selectedStorageOption &&
    storageCapacityNumber !== null &&
    !isNaN(storageCapacityNumber)
      ? checkStorageCompatibility(selectedConfiguration.storage, {
          formFactor: selectedStorageOption.formFactor,
          interface: selectedStorageOption.interface,
          capacityGb: storageCapacityNumber,
        })
      : null;

  // ============================================================
  // RENDER
  // ============================================================

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
            Check whether a RAM or storage upgrade is compatible with your laptop.
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
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full rounded-xl border p-3"
              >
                <option value="">Select brand</option>

                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* MODEL - With Search */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Model {models.length > 0 && <span className="text-gray-500">({models.length})</span>}
              </label>

              {/* ✅ Search input for better UX */}
              {brand && (
                <input
                  type="text"
                  placeholder="Search model..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="mb-2 w-full rounded-xl border p-3"
                />
              )}

              <select
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                disabled={!brand}
                className="w-full rounded-xl border p-3 disabled:bg-gray-100"
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

              {/* Show "no results" message */}
              {brand && models.length === 0 && modelSearch && (
                <p className="mt-2 text-sm text-gray-500">
                  No models found matching "{modelSearch}"
                </p>
              )}
            </div>

            {/* CONFIGURATION */}
            {selectedLaptop && configurations.length > 0 && (
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Factory Configuration
                </label>

                <select
                  value={configurationId}
                  onChange={(e) =>
                    handleConfigurationChange(e.target.value)
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option value="">
                    Select configuration
                  </option>

                  {configurations.map((config) => (
                    <option
                      key={config.id}
                      value={config.id}
                    >
                      {config.label}
                    </option>
                  ))}
                </select>

                {/* Configuration notes */}
                {selectedConfiguration?.conditions &&
                  selectedConfiguration.conditions.length > 0 && (
                    <div className="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                      <p className="font-semibold text-gray-900">
                        Configuration notes
                      </p>

                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {selectedConfiguration.conditions.map(
                          (condition) => (
                            <li key={condition}>{condition}</li>
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
                  setCheckType(e.target.value as CheckType | "");

                  setRamCapacity("");
                  setStorageOptionId("");
                  setStorageCapacity("");
                  setHasChecked(false);
                }}
                className="w-full rounded-xl border p-3"
              >
                <option value="">Select component</option>

                <option value="ram">RAM</option>

                <option value="storage">SSD / Storage</option>
              </select>
            </div>
          </section>
        )}

        {/* RAM */}
        {selectedConfiguration && checkType === "ram" && (
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
                <option value="">Select RAM capacity</option>

                {ramCapacities.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity} GB
                  </option>
                ))}
              </select>

              {ramCapacities.length === 0 && (
                <p className="mt-2 text-sm text-orange-600">
                  ⚠️ No valid RAM capacities for this configuration
                </p>
              )}
            </div>
          </section>
        )}

        {/* STORAGE */}
        {selectedConfiguration && checkType === "storage" && (
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
                    setStorageOptionId(e.target.value);
                    setStorageCapacity("");
                    setHasChecked(false);
                  }}
                  className="w-full rounded-xl border p-3"
                >
                  <option value="">Select storage option</option>

                  {selectedConfiguration.storage.options.map(
                    (option, index) => (
                      <option
                        key={`${option.formFactor}-${option.interface}-${index}`}
                        value={`${option.formFactor}-${option.interface}-${index}`}
                      >
                        {option.formFactor} · {option.interface}
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
                      setStorageCapacity(e.target.value);
                      setHasChecked(false);
                    }}
                    className="w-full rounded-xl border p-3"
                  >
                    <option value="">Select capacity</option>

                    {storageCapacities.map((capacity) => (
                      <option key={capacity} value={capacity}>
                        {capacity >= 1000
                          ? `${capacity / 1000} TB`
                          : `${capacity} GB`}
                      </option>
                    ))}
                  </select>

                  {storageCapacities.length === 0 && (
                    <p className="mt-2 text-sm text-orange-600">
                      ⚠️ No valid storage capacities for this option
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CHECK BUTTON */}
        {selectedConfiguration &&
          ((checkType === "ram" && ramCapacity) ||
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

            <p className="mt-3 font-medium">{ramResult.title}</p>

            <p className="mt-2 text-gray-600">{ramResult.reason}</p>
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

            <p className="mt-3 font-medium">{storageResult.title}</p>

            <p className="mt-2 text-gray-600">{storageResult.reason}</p>
          </section>
        )}

        {/* SOURCES */}
        {hasChecked &&
          selectedLaptop &&
          selectedConfiguration &&
          selectedLaptop.sources.length > 0 && (
            <section className="mt-6 rounded-2xl border p-6">
              <h2 className="text-lg font-semibold">Sources</h2>

              <div className="mt-4 space-y-3">
                {selectedLaptop.sources.map((source) => (
                  <div key={source.id} className="rounded-xl bg-gray-50 p-4">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      {source.title}
                    </a>

                    <p className="mt-1 text-sm text-gray-500">
                      {source.publisher} · {source.type}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Accessed: {source.accessedAt}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
      </div>
    </main>
  );
}
