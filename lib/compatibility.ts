import type {
  BatterySpec,
  CompatibilityStatus,
  MemorySpec,
  StorageSpec,
  VerificationStatus,
} from "./types";

export type CompatibilityResult = {
  status: CompatibilityStatus;
  title: string;
  reason: string;
};

export type RamRequirement = {
  /** Whether the capacity is the desired system total or one module being added. */
  operation: "total" | "add_module";
  capacityGb: number;
};

export function checkRamCompatibility(
  memory: MemorySpec,
  requested: RamRequirement
): CompatibilityResult {
  const requestedGb = requested.capacityGb;
  if (memory.status === "unknown") {
    return {
      status: "unknown",
      title: "Not enough verified information",
      reason:
        "We do not have enough verified memory information for this configuration.",
    };
  }

  if (memory.status === "no") {
    return {
      status: "no",
      title: "RAM is not upgradeable",
      reason:
        "The documented memory configuration does not support a RAM upgrade.",
    };
  }

  if (!Number.isFinite(requestedGb) || requestedGb <= 0) {
    return {
      status: "unknown",
      title: "Invalid RAM capacity",
      reason: "Choose a positive RAM capacity before checking compatibility.",
    };
  }

  if (requested.operation === "add_module") {
    if (memory.slots === 0 || memory.availableSlots === 0) {
      return {
        status: "no",
        title: "No documented empty RAM slot",
        reason: "This configuration has no documented empty user-accessible RAM slot for an additional module.",
      };
    }

    if (memory.maxPerSlotGb && requestedGb > memory.maxPerSlotGb) {
      return {
        status: "no",
        title: "Module capacity exceeds the documented slot limit",
        reason: `Each RAM slot is documented for up to ${memory.maxPerSlotGb} GB.`,
      };
    }

    return {
      status: "conditional",
      title: "Verify the installed RAM layout",
      reason:
        "An additional module requires confirmation of an empty slot and the current total RAM. This database does not document both values for this configuration.",
    };
  }

  if (!memory.maxTotalGb) {
    return {
      status: "unknown",
      title: "Maximum RAM is unknown",
      reason:
        "The laptop is documented as upgradeable, but the maximum supported capacity has not been verified.",
    };
  }

  if (requestedGb > memory.maxTotalGb) {
    return {
      status: "no",
      title: "Not compatible",
      reason: `The documented maximum is ${memory.maxTotalGb} GB.`,
    };
  }

  if (memory.onboardGb && requestedGb < memory.onboardGb) {
    return {
      status: "conditional",
      title: "Check your current configuration",
      reason:
        "Part of the memory is soldered, so the requested capacity depends on the installed memory configuration.",
    };
  }

  if (memory.status === "conditional") {
    return {
      status: "conditional",
      title: "Compatible only with documented conditions",
      reason: `The requested total is within the documented ${memory.maxTotalGb} GB maximum, but this configuration has conditions that must be verified before upgrading.`,
    };
  }

  return {
    status: "yes",
    title: "Compatible",
    reason: `Up to ${memory.maxTotalGb} GB is documented for this configuration.`,
  };
}

export type StorageRequirement = {
  operation: "replace" | "add";
  formFactor: string;
  interface: string;
  capacityGb?: number;
};

export function checkStorageCompatibility(
  storage: StorageSpec,
  requested: StorageRequirement
): CompatibilityResult {
  if (storage.status === "unknown") {
    return {
      status: "unknown",
      title: "Not enough verified information",
      reason:
        "We do not have enough verified storage information for this configuration.",
    };
  }

  if (storage.status === "no") {
    return {
      status: "no",
      title: "Storage is not upgradeable",
      reason: "The documented storage configuration does not support this upgrade.",
    };
  }

  const matchingOptions = storage.options.filter(
    (option) =>
      option.formFactor.toLowerCase() ===
        requested.formFactor.toLowerCase() &&
      option.interface.toLowerCase() ===
        requested.interface.toLowerCase()
  );

  if (matchingOptions.length === 0) {
    return {
      status: "no",
      title: "Not compatible",
      reason:
        "The selected form factor and interface are not documented for this configuration.",
    };
  }

  if (requested.operation === "add") {
    if (storage.physicalSlots === 0 || storage.availableSlots === 0) {
      return {
        status: "no",
        title: "No documented empty storage slot",
        reason: "This configuration has no documented empty storage slot for an additional drive.",
      };
    }

    if (storage.availableSlots === undefined) {
      return {
        status: "conditional",
        title: "Verify that a storage slot is empty",
        reason: "The physical storage-slot count is documented, but the database does not confirm that an additional compatible slot is unused.",
      };
    }
  }

  const optionStatus = matchingOptions.some((option) => option.replaceable === "no")
    ? "no"
    : matchingOptions.some((option) => option.replaceable === "conditional" || option.replaceable === "unknown")
      ? "conditional"
      : "yes";

  if (requested.operation === "replace" && optionStatus === "no") {
    return {
      status: "no",
      title: "Drive is not documented as replaceable",
      reason: "The matching storage option is not documented as user-replaceable.",
    };
  }

  if (!requested.capacityGb || requested.capacityGb <= 0) {
    return {
      status: "unknown",
      title: "Storage capacity is required",
      reason: "Choose a positive capacity so it can be checked against documented limits.",
    };
  }

  const requestedCapacityGb = requested.capacityGb;

  const capacityMatch = matchingOptions.some(
    (option) =>
      option.maxCapacityGb !== undefined && requestedCapacityGb <= option.maxCapacityGb
  );

  const hasDocumentedCapacity = matchingOptions.some(
    (option) => option.maxCapacityGb !== undefined
  );

  if (!hasDocumentedCapacity) {
    return {
      status: "unknown",
      title: "Storage capacity limit is unknown",
      reason:
        "The matching storage format is documented, but no verified capacity limit is available for it.",
    };
  }

  if (!capacityMatch) {
    const documentedMaximums = matchingOptions
      .map((option) => option.maxCapacityGb)
      .filter(
        (value): value is number => value !== undefined
      );

    const maximum =
      documentedMaximums.length > 0
        ? Math.max(...documentedMaximums)
        : undefined;

    return {
      status: "no",
      title: "Capacity not documented as supported",
      reason: maximum
        ? `The documented maximum for this option is ${maximum} GB.`
        : "This capacity has not been documented for the selected configuration.",
    };
  }

  if (storage.status === "conditional" || optionStatus === "conditional") {
    return {
      status: "conditional",
      title: "Compatible only with documented conditions",
      reason:
        "The selected format and capacity match documented information, but replaceability or configuration conditions must be verified before proceeding.",
    };
  }

  return {
    status: "yes",
    title: "Compatible",
    reason:
      "The selected storage format, interface, operation, and capacity match the documented configuration.",
  };
}

export function checkBatteryCompatibility(
  battery: BatterySpec
): CompatibilityResult {
  if (battery.status === "unknown") {
    return {
      status: "unknown",
      title: "Not enough verified information",
      reason:
        "We do not have enough verified battery information for this configuration.",
    };
  }

  if (battery.status === "no") {
    return {
      status: "no",
      title: "Battery is not replaceable",
      reason:
        "The documented battery configuration does not support a DIY replacement.",
    };
  }

  const details: string[] = [];

  if (battery.capacityWh) {
    details.push(`${battery.capacityWh} Wh`);
  }

  if (battery.partNumbers && battery.partNumbers.length > 0) {
    details.push(`part number ${battery.partNumbers.join(", ")}`);
  }

  const detailText = details.length > 0 ? ` (${details.join(", ")})` : "";

  if (battery.status === "conditional") {
    return {
      status: "conditional",
      title: "Replacement possible with caveats",
      reason: `Battery replacement is documented as conditional${detailText}. Check the configuration notes and sources before proceeding.`,
    };
  }

  return {
    status: "yes",
    title: "Compatible",
    reason: `A replaceable battery is documented for this configuration${detailText}.`,
  };
}

export type VerificationBadge = {
  label: string;
  className: string;
};

export function getVerificationBadge(
  status: VerificationStatus
): VerificationBadge {
  switch (status) {
    case "verified":
      return {
        label: "✅ Verified",
        className: "bg-green-50 text-green-700 border-green-200",
      };

    case "partially_verified":
      return {
        label: "🔎 Partially verified",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      };

    case "needs_review":
      return {
        label: "⚠️ Needs review",
        className: "bg-orange-50 text-orange-700 border-orange-200",
      };

    case "draft":
    default:
      return {
        label: "📝 Draft",
        className: "bg-gray-100 text-gray-600 border-gray-200",
      };
  }
}

export function getStatusLabel(
  status: CompatibilityStatus
): string {
  switch (status) {
    case "yes":
      return "✅ Compatible";

    case "no":
      return "❌ Not compatible";

    case "conditional":
      return "⚠️ Conditional";

    case "unknown":
      return "❓ Unknown";

    default:
      return "❓ Unknown";
  }
}
