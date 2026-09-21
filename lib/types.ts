export type VerificationStatus =
  | "verified"
  | "partially_verified"
  | "draft"
  | "needs_review";

export type CompatibilityStatus =
  | "yes"
  | "no"
  | "conditional"
  | "unknown";

export type SourceType =
  | "official_service_manual"
  | "official_specs"
  | "official_support"
  | "manufacturer_documentation"
  | "trusted_secondary"
  | "community";

export type Source = {
  id: string;
  title: string;
  url: string;
  type: SourceType;
  publisher: string;
  accessedAt: string;
};

export type Evidence = {
  sourceIds: string[];
  notes?: string;
};

export type MemorySpec = {
  status: CompatibilityStatus;

  type?: string;
  formFactor?: string;

  onboardGb?: number;
  slots?: number;

  maxTotalGb?: number;
  maxPerSlotGb?: number;

  supportedSpeedsMts?: number[];

  evidence: Evidence;
};

export type StorageOption = {
  formFactor: string;
  interface: string;
  generation?: string;

  maxCapacityGb?: number;

  replaceable: CompatibilityStatus;

  evidence: Evidence;
};

export type StorageSpec = {
  status: CompatibilityStatus;

  physicalSlots: number;

  options: StorageOption[];

  evidence: Evidence;
};

export type BatterySpec = {
  status: CompatibilityStatus;

  removable?: boolean;
  replaceable?: boolean;

  capacityWh?: number;
  partNumbers?: string[];

  evidence: Evidence;
};

export type LaptopConfiguration = {
  id: string;

  label: string;

  conditions?: string[];

  cpu?: string;
  gpu?: string;

  memory: MemorySpec;
  storage: StorageSpec;
  battery: BatterySpec;

  notes?: string;

  evidence: Evidence;
};

export type Laptop = {
  id: string;

  brand: string;
  family: string;
  model: string;
  modelNumber?: string;

  releaseYear?: number;

  verificationStatus: VerificationStatus;

  configurations: LaptopConfiguration[];

  sources: Source[];

  lastVerifiedAt?: string;
};
