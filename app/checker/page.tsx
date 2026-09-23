/**
 * LAPTOP UPGRADE CHECKER - FIXED VERSION
 * 
 * Perubahan UI:
 * ✅ Modern Card-based layout
 * ✅ Premium form inputs with focus rings
 * ✅ Better visual hierarchy for steps
 * ✅ Highlighted result sections
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
  // COMPUTED: RAM Capacities
  // ============================================================

  const ramCapacities = useMemo(() => {
    const common = [4, 8, 16, 24, 32, 40, 48, 64, 96, 128];

    if (!selectedConfiguration?.memory) {
      return common;
    }

    const max = selectedConfiguration.memory.maxTotalGb;
    const onboard = selectedConfiguration.memory.onboardGb;

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

  // ============================================================
  // COMPUTED: Storage Capacities
  // ============================================================

  const storageCapacities = useMemo(() => {
    const common = [128, 256, 500, 512, 1000, 2000, 4000, 8000];

    if (!selectedStorageOption) {
      return common;
    }

    const max = selectedStorageOption.maxCapacityGb;

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
    if (!selectedConfiguration) return;
    if (checkType === "ram" && !ramCapacity) return;
    if (checkType === "storage" && (!storageOptionId || !storageCapacity)) return;
    setHasChecked(true);
  }

  // ============================================================
  // COMPUTED: Check Results
  // ============================================================

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
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        
        {/* HEADER */}
        <div className="text-center md:text-left">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Compatibility Engine
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Configure Your Upgrade
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Select your laptop model to check hardware upgrade compatibility limits.
          </p>
        </div>

        {/* LAPTOP SELECTION CARD */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">1</span>
            <h2 className="text-xl font-bold text-gray-900">Device Selection</h2>
          </div>

          <div className="space-y-5">
            {/* BRAND */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand</label>
              <select
                value={brand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select brand</option>
                {brands.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* MODEL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Model {models.length > 0 && <span className="text-gray-400 font-normal">({models.length} available)</span>}
              </label>
              
              {brand && (
                <input
                  type="text"
                  placeholder="Search specific model..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="mb-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              )}

              <select
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                disabled={!brand}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">{brand ? "Select your model" : "Select brand first"}</option>
                {models.map((item) => (
                  <option key={item.id} value={item.model}>{item.model}</option>
                ))}
              </select>

              {brand && models.length === 0 && modelSearch && (
                <p className="mt-2 text-sm text-red-500">
                  No models found matching "{modelSearch}"
                </p>
              )}
            </div>

            {/* CONFIGURATION */}
            {selectedLaptop && configurations.length > 0 && (
              <div className="pt-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Factory Configuration</label>
                <select
                  value={configurationId}
                  onChange={(e) => handleConfigurationChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select configuration</option>
                  {configurations.map((config) => (
                    <option key={config.id} value={config.id}>{config.label}</option>
                  ))}
                </select>

                {selectedConfiguration?.conditions && selectedConfiguration.conditions.length > 0 && (
                  <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                    <p className="text-sm font-semibold text-yellow-800">Configuration Notes</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-yellow-700">
                      {selectedConfiguration.conditions.map((condition) => (
                        <li key={condition}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* COMPONENT SELECTION */}
        {selectedConfiguration && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">2</span>
              <h2 className="text-xl font-bold text-gray-900">Upgrade Component</h2>
            </div>

            <select
              value={checkType}
              onChange={(e) => {
                setCheckType(e.target.value as CheckType | "");
                setRamCapacity("");
                setStorageOptionId("");
                setStorageCapacity("");
                setHasChecked(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">What do you want to upgrade?</option>
              <option value="ram">RAM / Memory</option>
              <option value="storage">SSD / Storage</option>
            </select>
          </section>
        )}

        {/* TARGET SPECS: RAM */}
        {selectedConfiguration && checkType === "ram" && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">3</span>
              <h2 className="text-xl font-bold text-gray-900">Target RAM</h2>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Desired Capacity</label>
              <select
                value={ramCapacity}
                onChange={(e) => {
                  setRamCapacity(e.target.value);
                  setHasChecked(false);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select RAM capacity</option>
                {ramCapacities.map((capacity) => (
                  <option key={capacity} value={capacity}>{capacity} GB</option>
                ))}
              </select>

              {ramCapacities.length === 0 && (
                <p className="mt-3 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  ⚠️ No valid RAM capacities for this configuration. Memory might be fully soldered.
                </p>
              )}
            </div>
          </section>
        )}

        {/* TARGET SPECS: STORAGE */}
        {selectedConfiguration && checkType === "storage" && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">3</span>
              <h2 className="text-xl font-bold text-gray-900">Target Storage</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Storage Type (Slot)</label>
                <select
                  value={storageOptionId}
                  onChange={(e) => {
                    setStorageOptionId(e.target.value);
                    setStorageCapacity("");
                    setHasChecked(false);
                  }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select storage slot</option>
                  {selectedConfiguration.storage.options.map((option, index) => (
                    <option key={`${option.formFactor}-${option.interface}-${index}`} value={`${option.formFactor}-${option.interface}-${index}`}>
                      {option.formFactor} · {option.interface}
                    </option>
                  ))}
                </select>
              </div>

              {selectedStorageOption && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Desired Capacity</label>
                  <select
                    value={storageCapacity}
                    onChange={(e) => {
                      setStorageCapacity(e.target.value);
                      setHasChecked(false);
                    }}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select capacity</option>
                    {storageCapacities.map((capacity) => (
                      <option key={capacity} value={capacity}>
                        {capacity >= 1000 ? `${capacity / 1000} TB` : `${capacity} GB`}
                      </option>
                    ))}
                  </select>

                  {storageCapacities.length === 0 && (
                    <p className="mt-3 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                      ⚠️ No valid storage capacities for this option.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CHECK BUTTON */}
        {selectedConfiguration &&
          ((checkType === "ram" && ramCapacity) || (checkType === "storage" && storageOptionId && storageCapacity)) && (
            <button
              type="button"
              onClick={handleCheck}
              className="w-full rounded-xl bg-gray-900 px-6 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 animate-in fade-in duration-300"
            >
              Check Compatibility
            </button>
        )}

        {/* RESULTS - RAM */}
        {ramResult && (
          <section className="overflow-hidden rounded-2xl bg-gray-900 text-white shadow-xl animate-in zoom-in-95 duration-300">
            <div className="border-b border-gray-800 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Analysis Result</p>
              <h2 className="mt-2 text-3xl font-extrabold">{getStatusLabel(ramResult.status)}</h2>
              <p className="mt-4 text-lg font-medium text-gray-100">{ramResult.title}</p>
              <p className="mt-2 text-base text-gray-400 leading-relaxed">{ramResult.reason}</p>
            </div>
          </section>
        )}

        {/* RESULTS - STORAGE */}
        {storageResult && (
          <section className="overflow-hidden rounded-2xl bg-gray-900 text-white shadow-xl animate-in zoom-in-95 duration-300">
            <div className="border-b border-gray-800 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Analysis Result</p>
              <h2 className="mt-2 text-3xl font-extrabold">{getStatusLabel(storageResult.status)}</h2>
              <p className="mt-4 text-lg font-medium text-gray-100">{storageResult.title}</p>
              <p className="mt-2 text-base text-gray-400 leading-relaxed">{storageResult.reason}</p>
            </div>
          </section>
        )}

        {/* SOURCES */}
        {hasChecked && selectedLaptop && selectedConfiguration && selectedLaptop.sources.length > 0 && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Verified Sources</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {selectedLaptop.sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-blue-700 truncate">{source.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{source.publisher} · {source.type}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
