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

export function checkRamCompatibility(
  memory: MemorySpec,
  requestedGb: number
): CompatibilityResult {
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

  if (
    memory.onboardGb &&
    requestedGb < memory.onboardGb
  ) {
    return {
      status: "conditional",
      title: "Check your current configuration",
      reason:
        "Part of the memory is soldered, so the requested capacity depends on the installed memory configuration.",
    };
  }

  return {
    status: "yes",
    title: "Compatible",
    reason: `Up to ${memory.maxTotalGb} GB is documented for this configuration.`,
  };
}

export type StorageRequirement = {
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

  if (!requested.capacityGb) {
    return {
      status: "yes",
      title: "Compatible",
      reason:
        "The selected form factor and interface are documented for this configuration.",
    };
  }

  const capacityMatch = matchingOptions.some(
    (option) =>
      !option.maxCapacityGb ||
      requested.capacityGb! <= option.maxCapacityGb
  );

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

  return {
    status: "yes",
    title: "Compatible",
    reason:
      "The selected storage format, interface, and capacity match the documented configuration.",
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
