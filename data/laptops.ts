import type { Laptop } from "../lib/types";

// ============================================================
// CONSTANTS - Unknown/Default Values
// ============================================================

const unknownMemory = {
  status: "unknown" as const,
  evidence: { sourceIds: [] },
};

const unknownStorage = {
  status: "unknown" as const,
  physicalSlots: 0,
  options: [],
  evidence: { sourceIds: [] },
};

const unknownBattery = {
  status: "unknown" as const,
  evidence: { sourceIds: [] },
};

// ============================================================
// HELPER FUNCTION - Draft Laptop Creator
// ============================================================

/**
 * Creates a draft laptop with placeholder configuration.
 * Used for models pending specification research.
 */
function draftLaptop(
  id: string,
  brand: string,
  family: string,
  model: string,
  modelNumber?: string,
  releaseYear?: number,
): Laptop {
  return {
    id,
    brand,
    family,
    model,
    ...(modelNumber && { modelNumber }),
    ...(releaseYear && { releaseYear }),
    verificationStatus: "draft",
    configurations: [
      {
        id: "default",
        label: "Configuration under review",
        memory: unknownMemory,
        storage: unknownStorage,
        battery: unknownBattery,
        evidence: {
          sourceIds: [],
          notes: "Specification research pending.",
        },
      },
    ],
    sources: [],
  };
}

// ============================================================
// LAPTOP DATABASE
// ============================================================

export const laptops: Laptop[] = [
  // ============================================================
  // DELL — 20
  // ============================================================

  {
    id: "dell-inspiron-15-3520",
    brand: "Dell",
    family: "Inspiron",
    model: "Inspiron 15 3520",
    modelNumber: "3520",
    releaseYear: 2022,
    verificationStatus: "verified",
    configurations: [
      {
        id: "m2-ssd",
        label: "M.2 SSD configuration",
        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SODIMM",
          slots: 2,
          maxTotalGb: 16,
          evidence: {
            sourceIds: ["dell-inspiron-3520"],
          },
        },
        storage: {
          status: "yes",
          physicalSlots: 1,
          options: [
            {
              formFactor: "M.2 2230",
              interface: "PCIe NVMe",
              maxCapacityGb: 1000,
              replaceable: "yes",
              evidence: {
                sourceIds: ["dell-inspiron-3520"],
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              maxCapacityGb: 2000,
              replaceable: "yes",
              evidence: {
                sourceIds: ["dell-inspiron-3520"],
              },
            },
          ],
          evidence: {
            sourceIds: ["dell-inspiron-3520"],
          },
        },
        battery: {
          status: "conditional",
          replaceable: true,
          evidence: {
            sourceIds: ["dell-inspiron-3520"],
          },
        },
        evidence: {
          sourceIds: ["dell-inspiron-3520"],
        },
      },
      {
        id: "sata-hdd",
        label: "2.5-inch SATA HDD configuration",
        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SODIMM",
          slots: 2,
          maxTotalGb: 16,
          evidence: {
            sourceIds: ["dell-inspiron-3520"],
          },
        },
        storage: {
          status: "yes",
          physicalSlots: 1,
          options: [
            {
              formFactor: '2.5"',
              interface: "SATA",
              maxCapacityGb: 2000,
              replaceable: "yes",
              evidence: {
                sourceIds: ["dell-inspiron-3520"],
              },
            },
          ],
          evidence: {
            sourceIds: ["dell-inspiron-3520"],
          },
        },
        battery: {
          status: "conditional",
          replaceable: true,
          evidence: {
            sourceIds: ["dell-inspiron-3520"],
          },
        },
        evidence: {
          sourceIds: ["dell-inspiron-3520"],
        },
      },
    ],
    sources: [
      {
        id: "dell-inspiron-3520",
        title: "Dell Inspiron 15 3520 Documentation",
        url: "https://www.dell.com/support/home/",
        type: "official_support",
        publisher: "Dell",
        accessedAt: "2026-09-23",
      },
    ],
    lastVerifiedAt: "2026-09-23",
  },

  // DELL - Draft models dengan data minimal yang konsisten
  draftLaptop("dell-inspiron-14-5420", "Dell", "Inspiron", "Inspiron 14 5420", "5420", 2022),
  draftLaptop("dell-inspiron-14-5430", "Dell", "Inspiron", "Inspiron 14 5430", "5430", 2023),
  draftLaptop("dell-inspiron-15-3511", "Dell", "Inspiron", "Inspiron 15 3511", "3511", 2021),
  draftLaptop("dell-inspiron-15-3521", "Dell", "Inspiron", "Inspiron 15 3521", "3521", 2022),
  draftLaptop("dell-inspiron-16-5620", "Dell", "Inspiron", "Inspiron 16 5620", "5620", 2022),
  draftLaptop("dell-inspiron-16-5630", "Dell", "Inspiron", "Inspiron 16 5630", "5630", 2023),
  draftLaptop("dell-xps-13-9310", "Dell", "XPS", "XPS 13 9310", "9310", 2020),
  draftLaptop("dell-xps-13-9320", "Dell", "XPS", "XPS 13 9320", "9320", 2022),
  draftLaptop("dell-xps-15-9510", "Dell", "XPS", "XPS 15 9510", "9510", 2021),
  draftLaptop("dell-xps-15-9520", "Dell", "XPS", "XPS 15 9520", "9520", 2022),
  draftLaptop("dell-latitude-3420", "Dell", "Latitude", "Latitude 3420", "3420", 2021),
  draftLaptop("dell-latitude-5420", "Dell", "Latitude", "Latitude 5420", "5420", 2021),
  draftLaptop("dell-latitude-5520", "Dell", "Latitude", "Latitude 5520", "5520", 2022),
  draftLaptop("dell-latitude-7420", "Dell", "Latitude", "Latitude 7420", "7420", 2021),
  draftLaptop("dell-latitude-7520", "Dell", "Latitude", "Latitude 7520", "7520", 2022),
  draftLaptop("dell-vostro-3510", "Dell", "Vostro", "Vostro 3510", "3510", 2021),
  draftLaptop("dell-vostro-3520", "Dell", "Vostro", "Vostro 3520", "3520", 2022),
  draftLaptop("dell-g15-5510", "Dell", "G Series", "G15 5510", "5510", 2021),
  draftLaptop("dell-g15-5520", "Dell", "G Series", "G15 5520", "5520", 2022),

  // ============================================================
  // LENOVO — 20
  // ============================================================

  {
    id: "lenovo-thinkpad-t14-gen2-amd",
    brand: "Lenovo",
    family: "ThinkPad T",
    model: "ThinkPad T14 Gen 2 AMD",
    modelNumber: "T14 Gen 2 AMD",
    releaseYear: 2021,
    verificationStatus: "verified",
    configurations: [
      {
        id: "8gb-soldered",
        label: "8 GB soldered memory configuration",
        memory: {
          status: "conditional",
          type: "DDR4",
          formFactor: "Soldered + SO-DIMM",
          onboardGb: 8,
          slots: 1,
          maxTotalGb: 40,
          maxPerSlotGb: 32,
          supportedSpeedsMts: [3200],
          evidence: {
            sourceIds: ["lenovo-t14-gen2-amd"],
          },
        },
        storage: {
          status: "yes",
          physicalSlots: 1,
          options: [
            {
              formFactor: "M.2 2242",
              interface: "PCIe NVMe",
              replaceable: "yes",
              evidence: {
                sourceIds: ["lenovo-t14-gen2-amd"],
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              replaceable: "yes",
              evidence: {
                sourceIds: ["lenovo-t14-gen2-amd"],
              },
            },
          ],
          evidence: {
            sourceIds: ["lenovo-t14-gen2-amd"],
          },
        },
        battery: {
          status: "unknown",
          evidence: {
            sourceIds: ["lenovo-t14-gen2-amd"],
          },
        },
        evidence: {
          sourceIds: ["lenovo-t14-gen2-amd"],
        },
      },
      {
        id: "16gb-soldered",
        label: "16 GB soldered memory configuration",
        memory: {
          status: "conditional",
          type: "DDR4",
          formFactor: "Soldered + SO-DIMM",
          onboardGb: 16,
          slots: 1,
          maxTotalGb: 48,
          maxPerSlotGb: 32,
          supportedSpeedsMts: [3200],
          evidence: {
            sourceIds: ["lenovo-t14-gen2-amd"],
          },
        },
        storage: {
          status: "yes",
          physicalSlots: 1,
          options: [
            {
              formFactor: "M.2 2242",
              interface: "PCIe NVMe",
              replaceable: "yes",
              evidence: {
                sourceIds: ["lenovo-t14-gen2-amd"],
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              replaceable: "yes",
              evidence: {
                sourceIds: ["lenovo-t14-gen2-amd"],
              },
            },
          ],
          evidence: {
            sourceIds: ["lenovo-t14-gen2-amd"],
          },
        },
        battery: {
          status: "unknown",
          evidence: {
            sourceIds: ["lenovo-t14-gen2-amd"],
          },
        },
        evidence: {
          sourceIds: ["lenovo-t14-gen2-amd"],
        },
      },
    ],
    sources: [
      {
        id: "lenovo-t14-gen2-amd",
        title: "ThinkPad T14 Gen 2 AMD Specifications",
        url: "https://psref.lenovo.com/",
        type: "official_specs",
        publisher: "Lenovo",
        accessedAt: "2026-09-23",
      },
    ],
    lastVerifiedAt: "2026-09-23",
  },

  // LENOVO - Draft models
  draftLaptop("lenovo-thinkpad-t480", "Lenovo", "ThinkPad T", "ThinkPad T480", "T480", 2018),
  draftLaptop("lenovo-thinkpad-t14-gen1-intel", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 1 Intel", "T14", 2020),
  draftLaptop("lenovo-thinkpad-t14-gen1-amd", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 1 AMD", "T14", 2020),
  draftLaptop("lenovo-thinkpad-t14-gen3-amd", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 3 AMD", "T14 Gen 3", 2022),
  draftLaptop("lenovo-thinkpad-t14-gen3-intel", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 3 Intel", "T14 Gen 3", 2022),
  draftLaptop("lenovo-thinkpad-t14-gen4-amd", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 4 AMD", "T14 Gen 4", 2023),
  draftLaptop("lenovo-thinkpad-t14-gen4-intel", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 4 Intel", "T14 Gen 4", 2023),
  draftLaptop("lenovo-thinkpad-t15-gen2", "Lenovo", "ThinkPad T", "ThinkPad T15 Gen 2", "T15 Gen 2", 2021),
  draftLaptop("lenovo-thinkpad-e14-gen2-intel", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 2 Intel", "E14", 2021),
  draftLaptop("lenovo-thinkpad-e14-gen2-amd", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 2 AMD", "E14", 2021),
  draftLaptop("lenovo-thinkpad-e14-gen3-amd", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 3 AMD", "E14 Gen 3", 2022),
  draftLaptop("lenovo-thinkpad-e14-gen3-intel", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 3 Intel", "E14 Gen 3", 2022),
  draftLaptop("lenovo-thinkpad-l14-gen2-intel", "Lenovo", "ThinkPad L", "ThinkPad L14 Gen 2 Intel", "L14 Gen 2", 2021),
  draftLaptop("lenovo-thinkpad-l14-gen2-amd", "Lenovo", "ThinkPad L", "ThinkPad L14 Gen 2 AMD", "L14 Gen 2", 2021),
  draftLaptop("lenovo-thinkpad-x1-carbon-gen9", "Lenovo", "ThinkPad X1", "ThinkPad X1 Carbon Gen 9", "X1 Carbon Gen 9", 2021),
  draftLaptop("lenovo-thinkpad-x1-carbon-gen10", "Lenovo", "ThinkPad X1", "ThinkPad X1 Carbon Gen 10", "X1 Carbon Gen 10", 2022),
  draftLaptop("lenovo-thinkpad-x1-extreme-gen2", "Lenovo", "ThinkPad X1", "ThinkPad X1 Extreme Gen 2", "X1 Extreme", 2020),
  draftLaptop("lenovo-thinkpad-p15-gen1", "Lenovo", "ThinkPad P", "ThinkPad P15 Gen 1", "P15 Gen 1", 2020),

  // ============================================================
  // HP — 20
  // ============================================================

  draftLaptop("hp-elitebook-840-g8", "HP", "EliteBook", "EliteBook 840 G8", "G8", 2021),
  draftLaptop("hp-elitebook-850-g8", "HP", "EliteBook", "EliteBook 850 G8", "G8", 2021),
  draftLaptop("hp-elitebook-830-g8", "HP", "EliteBook", "EliteBook 830 G8", "G8", 2021),
  draftLaptop("hp-elitebook-840-g7", "HP", "EliteBook", "EliteBook 840 G7", "G7", 2020),
  draftLaptop("hp-elitebook-850-g7", "HP", "EliteBook", "EliteBook 850 G7", "G7", 2020),
  draftLaptop("hp-probook-440-g8", "HP", "ProBook", "ProBook 440 G8", "G8", 2021),
  draftLaptop("hp-probook-450-g8", "HP", "ProBook", "ProBook 450 G8", "G8", 2021),
  draftLaptop("hp-probook-455-g8", "HP", "ProBook", "ProBook 455 G8", "G8", 2021),
  draftLaptop("hp-probook-440-g9", "HP", "ProBook", "ProBook 440 G9", "G9", 2022),
  draftLaptop("hp-probook-450-g9", "HP", "ProBook", "ProBook 450 G9", "G9", 2022),
  draftLaptop("hp-pavilion-15-eg", "HP", "Pavilion", "Pavilion 15-eg", "15-eg", 2021),
  draftLaptop("hp-pavilion-15-eh", "HP", "Pavilion", "Pavilion 15-eh", "15-eh", 2021),
  draftLaptop("hp-pavilion-14-dv", "HP", "Pavilion", "Pavilion 14-dv", "14-dv", 2022),
  draftLaptop("hp-envy-13-ba", "HP", "Envy", "Envy 13-ba", "13-ba", 2021),
  draftLaptop("hp-envy-15-ep", "HP", "Envy", "Envy 15-ep", "15-ep", 2021),
  draftLaptop("hp-omen-15-en", "HP", "OMEN", "OMEN 15-en", "15-en", 2021),
  draftLaptop("hp-omen-16-c", "HP", "OMEN", "OMEN 16-c", "16-c", 2022),
  draftLaptop("hp-victus-15-fb", "HP", "Victus", "Victus 15-fb", "15-fb", 2021),
  draftLaptop("hp-victus-16-e", "HP", "Victus", "Victus 16-e", "16-e", 2021),
  draftLaptop("hp-zbook-firefly-14-g8", "HP", "ZBook", "ZBook Firefly 14 G8", "G8", 2021),

  // ============================================================
  // ASUS — 15
  // ============================================================

  draftLaptop("asus-vivobook-15-x1500ea", "ASUS", "VivoBook", "VivoBook 15 X1500EA", "X1500EA", 2021),
  draftLaptop("asus-vivobook-15-x1502za", "ASUS", "VivoBook", "VivoBook 15 X1502ZA", "X1502ZA", 2022),
  draftLaptop("asus-vivobook-14-x1400ea", "ASUS", "VivoBook", "VivoBook 14 X1400EA", "X1400EA", 2021),
  draftLaptop("asus-vivobook-14-x1402za", "ASUS", "VivoBook", "VivoBook 14 X1402ZA", "X1402ZA", 2022),
  draftLaptop("asus-vivobook-pro-15-oled", "ASUS", "VivoBook Pro", "VivoBook Pro 15 OLED", "M3500", 2022),
  draftLaptop("asus-zenbook-14-ux425", "ASUS", "ZenBook", "ZenBook 14 UX425", "UX425", 2020),
  draftLaptop("asus-zenbook-14-ux435", "ASUS", "ZenBook", "ZenBook 14 UX435", "UX435", 2021),
  draftLaptop("asus-zenbook-14-ux3402", "ASUS", "ZenBook", "ZenBook 14 UX3402", "UX3402", 2022),
  draftLaptop("asus-tuf-gaming-a15-fa506", "ASUS", "TUF Gaming", "TUF Gaming A15 FA506", "FA506", 2021),
  draftLaptop("asus-tuf-gaming-a15-fa507", "ASUS", "TUF Gaming", "TUF Gaming A15 FA507", "FA507", 2022),
  draftLaptop("asus-tuf-gaming-f15-fx506", "ASUS", "TUF Gaming", "TUF Gaming F15 FX506", "FX506", 2021),
  draftLaptop("asus-tuf-gaming-f15-fx507", "ASUS", "TUF Gaming", "TUF Gaming F15 FX507", "FX507", 2022),
  draftLaptop("asus-rog-strix-g15-g513", "ASUS", "ROG Strix", "ROG Strix G15 G513", "G513", 2021),
  draftLaptop("asus-rog-zephyrus-g14-ga401", "ASUS", "ROG Zephyrus", "ROG Zephyrus G14 GA401", "GA401", 2021),
  draftLaptop("asus-rog-zephyrus-g15-ga503", "ASUS", "ROG Zephyrus", "ROG Zephyrus G15 GA503", "GA503", 2021),

  // ============================================================
  // ACER — 10
  // ============================================================

  draftLaptop("acer-aspire-5-a515-56", "Acer", "Aspire", "Aspire 5 A515-56", "A515-56", 2021),
  draftLaptop("acer-aspire-5-a515-45", "Acer", "Aspire", "Aspire 5 A515-45", "A515-45", 2021),
  draftLaptop("acer-aspire-5-a515-57", "Acer", "Aspire", "Aspire 5 A515-57", "A515-57", 2022),
  draftLaptop("acer-aspire-3-a315-58", "Acer", "Aspire", "Aspire 3 A315-58", "A315-58", 2021),
  draftLaptop("acer-aspire-3-a315-59", "Acer", "Aspire", "Aspire 3 A315-59", "A315-59", 2022),
  draftLaptop("acer-swift-3-sf314-43", "Acer", "Swift", "Swift 3 SF314-43", "SF314-43", 2021),
  draftLaptop("acer-swift-3-sf314-511", "Acer", "Swift", "Swift 3 SF314-511", "SF314-511", 2022),
  draftLaptop("acer-nitro-5-an515-57", "Acer", "Nitro", "Nitro 5 AN515-57", "AN515-57", 2021),
  draftLaptop("acer-nitro-5-an515-58", "Acer", "Nitro", "Nitro 5 AN515-58", "AN515-58", 2022),
  draftLaptop("acer-predator-helios-300-ph315-54", "Acer", "Predator", "Predator Helios 300 PH315-54", "PH315-54", 2021),

  // ============================================================
  // MSI — 5
  // ============================================================

  draftLaptop("msi-modern-14-b11", "MSI", "Modern", "Modern 14 B11", "Modern14B11", 2021),
  draftLaptop("msi-modern-15-b11", "MSI", "Modern", "Modern 15 B11", "Modern15B11", 2021),
  draftLaptop("msi-gf63-thin-11", "MSI", "GF63 Thin", "GF63 Thin 11", "GF63-11", 2021),
  draftLaptop("msi-katana-gf66", "MSI", "Katana", "Katana GF66", "KatanaGF66", 2021),
  draftLaptop("msi-katana-15-b12", "MSI", "Katana", "Katana 15 B12", "Katana15B12", 2022),

  // ============================================================
  // APPLE — 8
  // ============================================================

  draftLaptop("apple-macbook-air-intel-2020", "Apple", "MacBook Air", "MacBook Air Intel 2020", "A2179", 2020),
  draftLaptop("apple-macbook-air-m1-2020", "Apple", "MacBook Air", "MacBook Air M1 2020", "A2337", 2020),
  draftLaptop("apple-macbook-air-m2-2022", "Apple", "MacBook Air", "MacBook Air M2 2022", "A2681", 2022),
  draftLaptop("apple-macbook-pro-13-intel-2020", "Apple", "MacBook Pro", "MacBook Pro 13 Intel 2020", "A2289", 2020),
  draftLaptop("apple-macbook-pro-13-m1-2020", "Apple", "MacBook Pro", "MacBook Pro 13 M1 2020", "A2338", 2020),
  draftLaptop("apple-macbook-pro-14-m1-2021", "Apple", "MacBook Pro", "MacBook Pro 14 M1 2021", "A2442", 2021),
  draftLaptop("apple-macbook-pro-16-intel-2019", "Apple", "MacBook Pro", "MacBook Pro 16 Intel 2019", "A1990", 2019),
  draftLaptop("apple-macbook-pro-16-m1-2021", "Apple", "MacBook Pro", "MacBook Pro 16 M1 2021", "A2485", 2021),

  // ============================================================
  // FRAMEWORK — 2
  // ============================================================

  draftLaptop("framework-laptop-13-11th-gen", "Framework", "Laptop 13", "Laptop 13 11th Gen", "Framework13", 2021),
  draftLaptop("framework-laptop-13-12th-gen", "Framework", "Laptop 13", "Laptop 13 12th Gen", "Framework13", 2022),
];

// ============================================================
// UTILITIES
// ============================================================

/**
 * Get verification statistics
 */
export function getVerificationStats() {
  const verified = laptops.filter(l => l.verificationStatus === "verified").length;
  const draft = laptops.filter(l => l.verificationStatus === "draft").length;
  const total = laptops.length;

  return {
    verified,
    draft,
    total,
    verificationPercentage: Math.round((verified / total) * 100),
  };
}

/**
 * Get laptops by brand
 */
export function getLaptopsByBrand(brand: string): Laptop[] {
  return laptops.filter(l => l.brand === brand);
}

/**
 * Get verified laptops only
 */
export function getVerifiedLaptops(): Laptop[] {
  return laptops.filter(l => l.verificationStatus === "verified");
}

/**
 * Get draft laptops only
 */
export function getDraftLaptops(): Laptop[] {
  return laptops.filter(l => l.verificationStatus === "draft");
}
