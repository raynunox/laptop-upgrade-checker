import assert from "node:assert/strict";
import test from "node:test";

import { checkRamCompatibility, checkStorageCompatibility } from "../lib/compatibility.ts";
import type { MemorySpec, StorageSpec } from "../lib/types.ts";

const evidence = { sourceIds: ["test-source"] };

const memory = (overrides: Partial<MemorySpec> = {}): MemorySpec => ({
  status: "yes",
  slots: 2,
  maxTotalGb: 32,
  maxPerSlotGb: 16,
  evidence,
  ...overrides,
});

const storage = (overrides: Partial<StorageSpec> = {}): StorageSpec => ({
  status: "yes",
  physicalSlots: 1,
  options: [{ formFactor: "M.2 2280", interface: "PCIe NVMe", maxCapacityGb: 2000, replaceable: "yes", evidence }],
  evidence,
  ...overrides,
});

test("RAM total capacity returns yes within a verified maximum", () => {
  assert.equal(checkRamCompatibility(memory(), { operation: "total", capacityGb: 32 }).status, "yes");
});

test("RAM preserves unknown and conditional evidence", () => {
  assert.equal(checkRamCompatibility(memory({ status: "unknown" }), { operation: "total", capacityGb: 16 }).status, "unknown");
  assert.equal(checkRamCompatibility(memory({ status: "conditional" }), { operation: "total", capacityGb: 16 }).status, "conditional");
});

test("RAM rejects impossible total and module capacities", () => {
  assert.equal(checkRamCompatibility(memory(), { operation: "total", capacityGb: 64 }).status, "no");
  assert.equal(checkRamCompatibility(memory(), { operation: "add_module", capacityGb: 32 }).status, "no");
});

test("RAM addition requires a documented empty slot", () => {
  assert.equal(checkRamCompatibility(memory({ availableSlots: 0 }), { operation: "add_module", capacityGb: 16 }).status, "no");
  assert.equal(checkRamCompatibility(memory({ onboardGb: 8 }), { operation: "add_module", capacityGb: 16 }).status, "conditional");
});

test("storage replacement rejects non-replaceable drives and unknown limits", () => {
  assert.equal(checkStorageCompatibility(storage({ options: [{ formFactor: "M.2 2280", interface: "PCIe NVMe", replaceable: "no", evidence }] }), { operation: "replace", formFactor: "M.2 2280", interface: "PCIe NVMe", capacityGb: 1000 }).status, "no");
  assert.equal(checkStorageCompatibility(storage({ options: [{ formFactor: "M.2 2280", interface: "PCIe NVMe", replaceable: "yes", evidence }] }), { operation: "replace", formFactor: "M.2 2280", interface: "PCIe NVMe", capacityGb: 1000 }).status, "unknown");
});

test("storage addition requires an empty slot and preserves conditional evidence", () => {
  assert.equal(checkStorageCompatibility(storage({ availableSlots: 0 }), { operation: "add", formFactor: "M.2 2280", interface: "PCIe NVMe", capacityGb: 1000 }).status, "no");
  assert.equal(checkStorageCompatibility(storage(), { operation: "add", formFactor: "M.2 2280", interface: "PCIe NVMe", capacityGb: 1000 }).status, "conditional");
  assert.equal(checkStorageCompatibility(storage({ status: "conditional", availableSlots: 1 }), { operation: "add", formFactor: "M.2 2280", interface: "PCIe NVMe", capacityGb: 1000 }).status, "conditional");
});
