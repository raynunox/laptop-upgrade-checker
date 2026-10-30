import test from "node:test";
import assert from "node:assert/strict";
import { checkRamCompatibility, checkStorageCompatibility } from "../lib/compatibility";
import type { MemorySpec, StorageSpec } from "../lib/types";

const memory = (overrides: Partial<MemorySpec> = {}) => ({
  status: "yes",
  maxTotalGb: 32,
  evidence: { sourceIds: [] },
  ...overrides,
}) as MemorySpec;

const storage = (overrides: Partial<StorageSpec> = {}) => ({
  status: "yes",
  physicalSlots: 1,
  options: [{ formFactor: "M.2 2280", interface: "NVMe", maxCapacityGb: 2000, replaceable: "yes", evidence: { sourceIds: [] } }],
  evidence: { sourceIds: [] },
  ...overrides,
}) as StorageSpec;

test("RAM: explicit no is never upgradeable", () => {
  assert.equal(checkRamCompatibility(memory({ status: "no" }), 16).status, "no");
});

test("RAM: conditional remains conditional even when a maximum is present", () => {
  assert.equal(checkRamCompatibility(memory({ status: "conditional" }), 16).status, "conditional");
});

test("RAM: unknown and missing status fail safely to unknown", () => {
  assert.equal(checkRamCompatibility(memory({ status: "unknown" }), 16).status, "unknown");
  assert.equal(checkRamCompatibility(({ maxTotalGb: 32 } as unknown) as MemorySpec, 16).status, "unknown");
});

test("RAM: missing, null, zero, or invalid maximum is unknown, not unlimited", () => {
  for (const maxTotalGb of [undefined, null, 0, -1, Number.NaN]) {
    assert.equal(checkRamCompatibility(memory({ maxTotalGb } as Partial<MemorySpec>), 16).status, "unknown");
  }
});

test("RAM: documented maximum accepts within-limit and rejects over-limit", () => {
  assert.equal(checkRamCompatibility(memory(), 32).status, "yes");
  assert.equal(checkRamCompatibility(memory(), 64).status, "no");
});

test("Storage: explicit no and conditional statuses are respected", () => {
  assert.equal(checkStorageCompatibility(storage({ status: "no" }), { formFactor: "M.2 2280", interface: "NVMe", capacityGb: 512 }).status, "no");
  assert.equal(checkStorageCompatibility(storage({ status: "conditional" }), { formFactor: "M.2 2280", interface: "NVMe", capacityGb: 512 }).status, "conditional");
});

test("Storage: unknown status, missing status, and empty options return unknown", () => {
  const request = { formFactor: "M.2 2280", interface: "NVMe", capacityGb: 512 };
  assert.equal(checkStorageCompatibility(storage({ status: "unknown" }), request).status, "unknown");
  assert.equal(checkStorageCompatibility(({ options: [] } as unknown) as StorageSpec, request).status, "unknown");
  assert.equal(checkStorageCompatibility(storage({ options: [] }), request).status, "unknown");
});

test("Storage: missing maximum is unknown rather than unlimited", () => {
  const result = checkStorageCompatibility(storage({ options: [{ formFactor: "M.2 2280", interface: "NVMe", replaceable: "yes", evidence: { sourceIds: [] } }] }), {
    formFactor: "M.2 2280", interface: "NVMe", capacityGb: 4000,
  });
  assert.equal(result.status, "unknown");
});

test("Storage: known maximum accepts within-limit and rejects over-limit", () => {
  const request = { formFactor: "M.2 2280", interface: "NVMe", capacityGb: 2000 };
  assert.equal(checkStorageCompatibility(storage(), request).status, "yes");
  assert.equal(checkStorageCompatibility(storage(), { ...request, capacityGb: 4000 }).status, "no");
});

test("Storage: unsupported form factor/interface is no when the documented option list is complete", () => {
  assert.equal(checkStorageCompatibility(storage(), { formFactor: "2.5-inch", interface: "SATA", capacityGb: 512 }).status, "no");
});
