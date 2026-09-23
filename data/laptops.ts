import type { Laptop } from "../lib/types";

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

function draftLaptop(
  id: string,
  brand: string,
  family: string,
  model: string,
): Laptop {
  return {
    id,
    brand,
    family,
    model,
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

  draftLaptop("dell-inspiron-14-5420", "Dell", "Inspiron", "Inspiron 14 5420"),
  draftLaptop("dell-inspiron-14-5430", "Dell", "Inspiron", "Inspiron 14 5430"),
  draftLaptop("dell-inspiron-15-3511", "Dell", "Inspiron", "Inspiron 15 3511"),
  draftLaptop("dell-inspiron-15-3521", "Dell", "Inspiron", "Inspiron 15 3521"),
  draftLaptop("dell-inspiron-16-5620", "Dell", "Inspiron", "Inspiron 16 5620"),
  draftLaptop("dell-inspiron-16-5630", "Dell", "Inspiron", "Inspiron 16 5630"),
  draftLaptop("dell-xps-13-9310", "Dell", "XPS", "XPS 13 9310"),
  draftLaptop("dell-xps-13-9320", "Dell", "XPS", "XPS 13 9320"),
  draftLaptop("dell-xps-15-9510", "Dell", "XPS", "XPS 15 9510"),
  draftLaptop("dell-xps-15-9520", "Dell", "XPS", "XPS 15 9520"),
  draftLaptop("dell-latitude-3420", "Dell", "Latitude", "Latitude 3420"),
  draftLaptop("dell-latitude-5420", "Dell", "Latitude", "Latitude 5420"),
  draftLaptop("dell-latitude-5520", "Dell", "Latitude", "Latitude 5520"),
  draftLaptop("dell-latitude-7420", "Dell", "Latitude", "Latitude 7420"),
  draftLaptop("dell-latitude-7520", "Dell", "Latitude", "Latitude 7520"),
  draftLaptop("dell-vostro-3510", "Dell", "Vostro", "Vostro 3510"),
  draftLaptop("dell-vostro-3520", "Dell", "Vostro", "Vostro 3520"),
  draftLaptop("dell-g15-5510", "Dell", "G Series", "G15 5510"),
  draftLaptop("dell-g15-5520", "Dell", "G Series", "G15 5520"),

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

  draftLaptop("lenovo-thinkpad-t480", "Lenovo", "ThinkPad T", "ThinkPad T480"),
  draftLaptop("lenovo-thinkpad-t14-gen1-intel", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 1 Intel"),
  draftLaptop("lenovo-thinkpad-t14-gen1-amd", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 1 AMD"),
  draftLaptop("lenovo-thinkpad-t14-gen3-amd", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 3 AMD"),
  draftLaptop("lenovo-thinkpad-t14-gen3-intel", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 3 Intel"),
  draftLaptop("lenovo-thinkpad-t14-gen4-amd", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 4 AMD"),
  draftLaptop("lenovo-thinkpad-t14-gen4-intel", "Lenovo", "ThinkPad T", "ThinkPad T14 Gen 4 Intel"),
  draftLaptop("lenovo-thinkpad-t15-gen2", "Lenovo", "ThinkPad T", "ThinkPad T15 Gen 2"),
  draftLaptop("lenovo-thinkpad-e14-gen2-intel", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 2 Intel"),
  draftLaptop("lenovo-thinkpad-e14-gen2-amd", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 2 AMD"),
  draftLaptop("lenovo-thinkpad-e14-gen3-amd", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 3 AMD"),
  draftLaptop("lenovo-thinkpad-e14-gen3-intel", "Lenovo", "ThinkPad E", "ThinkPad E14 Gen 3 Intel"),
  draftLaptop("lenovo-thinkpad-l14-gen2-intel", "Lenovo", "ThinkPad L", "ThinkPad L14 Gen 2 Intel"),
  draftLaptop("lenovo-thinkpad-l14-gen2-amd", "Lenovo", "ThinkPad L", "ThinkPad L14 Gen 2 AMD"),
  draftLaptop("lenovo-thinkpad-x1-carbon-gen9", "Lenovo", "ThinkPad X1", "ThinkPad X1 Carbon Gen 9"),
  draftLaptop("lenovo-thinkpad-x1-carbon-gen10", "Lenovo", "ThinkPad X1", "ThinkPad X1 Carbon Gen 10"),
  draftLaptop("lenovo-thinkpad-x1-extreme-gen2", "Lenovo", "ThinkPad X1", "ThinkPad X1 Extreme Gen 2"),
  draftLaptop("lenovo-thinkpad-p15-gen1", "Lenovo", "ThinkPad P", "ThinkPad P15 Gen 1"),

  // ============================================================
  // HP — 20
  // ============================================================

  draftLaptop("hp-elitebook-840-g8", "HP", "EliteBook", "EliteBook 840 G8"),
  draftLaptop("hp-elitebook-850-g8", "HP", "EliteBook", "EliteBook 850 G8"),
  draftLaptop("hp-elitebook-830-g8", "HP", "EliteBook", "EliteBook 830 G8"),
  draftLaptop("hp-elitebook-840-g7", "HP", "EliteBook", "EliteBook 840 G7"),
  draftLaptop("hp-elitebook-850-g7", "HP", "EliteBook", "EliteBook 850 G7"),
  draftLaptop("hp-probook-440-g8", "HP", "ProBook", "ProBook 440 G8"),
  draftLaptop("hp-probook-450-g8", "HP", "ProBook", "ProBook 450 G8"),
  draftLaptop("hp-probook-455-g8", "HP", "ProBook", "ProBook 455 G8"),
  draftLaptop("hp-probook-440-g9", "HP", "ProBook", "ProBook 440 G9"),
  draftLaptop("hp-probook-450-g9", "HP", "ProBook", "ProBook 450 G9"),
  draftLaptop("hp-pavilion-15-eg", "HP", "Pavilion", "Pavilion 15-eg"),
  draftLaptop("hp-pavilion-15-eh", "HP", "Pavilion", "Pavilion 15-eh"),
  draftLaptop("hp-pavilion-14-dv", "HP", "Pavilion", "Pavilion 14-dv"),
  draftLaptop("hp-envy-13-ba", "HP", "Envy", "Envy 13-ba"),
  draftLaptop("hp-envy-15-ep", "HP", "Envy", "Envy 15-ep"),
  draftLaptop("hp-omen-15-en", "HP", "OMEN", "OMEN 15-en"),
  draftLaptop("hp-omen-16-c", "HP", "OMEN", "OMEN 16-c"),
  draftLaptop("hp-victus-15-fb", "HP", "Victus", "Victus 15-fb"),
  draftLaptop("hp-victus-16-e", "HP", "Victus", "Victus 16-e"),
  draftLaptop("hp-zbook-firefly-14-g8", "HP", "ZBook", "ZBook Firefly 14 G8"),

  // ============================================================
  // ASUS — 15
  // ============================================================

  draftLaptop("asus-vivobook-15-x1500ea", "ASUS", "VivoBook", "VivoBook 15 X1500EA"),
  draftLaptop("asus-vivobook-15-x1502za", "ASUS", "VivoBook", "VivoBook 15 X1502ZA"),
  draftLaptop("asus-vivobook-14-x1400ea", "ASUS", "VivoBook", "VivoBook 14 X1400EA"),
  draftLaptop("asus-vivobook-14-x1402za", "ASUS", "VivoBook", "VivoBook 14 X1402ZA"),
  draftLaptop("asus-vivobook-pro-15-oled", "ASUS", "VivoBook Pro", "VivoBook Pro 15 OLED"),
  draftLaptop("asus-zenbook-14-ux425", "ASUS", "ZenBook", "ZenBook 14 UX425"),
  draftLaptop("asus-zenbook-14-ux435", "ASUS", "ZenBook", "ZenBook 14 UX435"),
  draftLaptop("asus-zenbook-14-ux3402", "ASUS", "ZenBook", "ZenBook 14 UX3402"),
  draftLaptop("asus-tuf-gaming-a15-fa506", "ASUS", "TUF Gaming", "TUF Gaming A15 FA506"),
  draftLaptop("asus-tuf-gaming-a15-fa507", "ASUS", "TUF Gaming", "TUF Gaming A15 FA507"),
  draftLaptop("asus-tuf-gaming-f15-fx506", "ASUS", "TUF Gaming", "TUF Gaming F15 FX506"),
  draftLaptop("asus-tuf-gaming-f15-fx507", "ASUS", "TUF Gaming", "TUF Gaming F15 FX507"),
  draftLaptop("asus-rog-strix-g15-g513", "ASUS", "ROG Strix", "ROG Strix G15 G513"),
  draftLaptop("asus-rog-zephyrus-g14-ga401", "ASUS", "ROG Zephyrus", "ROG Zephyrus G14 GA401"),
  draftLaptop("asus-rog-zephyrus-g15-ga503", "ASUS", "ROG Zephyrus", "ROG Zephyrus G15 GA503"),

  // ============================================================
  // ACER — 10
  // ============================================================

  draftLaptop("acer-aspire-5-a515-56", "Acer", "Aspire", "Aspire 5 A515-56"),
  draftLaptop("acer-aspire-5-a515-45", "Acer", "Aspire", "Aspire 5 A515-45"),
  draftLaptop("acer-aspire-5-a515-57", "Acer", "Aspire", "Aspire 5 A515-57"),
  draftLaptop("acer-aspire-3-a315-58", "Acer", "Aspire", "Aspire 3 A315-58"),
  draftLaptop("acer-aspire-3-a315-59", "Acer", "Aspire", "Aspire 3 A315-59"),
  draftLaptop("acer-swift-3-sf314-43", "Acer", "Swift", "Swift 3 SF314-43"),
  draftLaptop("acer-swift-3-sf314-511", "Acer", "Swift", "Swift 3 SF314-511"),
  draftLaptop("acer-nitro-5-an515-57", "Acer", "Nitro", "Nitro 5 AN515-57"),
  draftLaptop("acer-nitro-5-an515-58", "Acer", "Nitro", "Nitro 5 AN515-58"),
  draftLaptop("acer-predator-helios-300-ph315-54", "Acer", "Predator", "Predator Helios 300 PH315-54"),

  // ============================================================
  // MSI — 5
  // ============================================================

  draftLaptop("msi-modern-14-b11", "MSI", "Modern", "Modern 14 B11"),
  draftLaptop("msi-modern-15-b11", "MSI", "Modern", "Modern 15 B11"),
  draftLaptop("msi-gf63-thin-11", "MSI", "GF63 Thin", "GF63 Thin 11"),
  draftLaptop("msi-katana-gf66", "MSI", "Katana", "Katana GF66"),
  draftLaptop("msi-katana-15-b12", "MSI", "Katana", "Katana 15 B12"),

  // ============================================================
  // APPLE — 8
  // ============================================================

  draftLaptop("apple-macbook-air-intel-2020", "Apple", "MacBook Air", "MacBook Air Intel 2020"),
  draftLaptop("apple-macbook-air-m1-2020", "Apple", "MacBook Air", "MacBook Air M1 2020"),
  draftLaptop("apple-macbook-air-m2-2022", "Apple", "MacBook Air", "MacBook Air M2 2022"),
  draftLaptop("apple-macbook-pro-13-intel-2020", "Apple", "MacBook Pro", "MacBook Pro 13 Intel 2020"),
  draftLaptop("apple-macbook-pro-13-m1-2020", "Apple", "MacBook Pro", "MacBook Pro 13 M1 2020"),
  draftLaptop("apple-macbook-pro-14-m1-2021", "Apple", "MacBook Pro", "MacBook Pro 14 M1 2021"),
  draftLaptop("apple-macbook-pro-16-intel-2019", "Apple", "MacBook Pro", "MacBook Pro 16 Intel 2019"),
  draftLaptop("apple-macbook-pro-16-m1-2021", "Apple", "MacBook Pro", "MacBook Pro 16 M1 2021"),

  // ============================================================
  // FRAMEWORK — 2
  // ============================================================

  draftLaptop(
    "framework-laptop-13-11th-gen",
    "Framework",
    "Laptop 13",
    "Laptop 13 11th Gen",
  ),

  draftLaptop(
    "framework-laptop-13-12th-gen",
    "Framework",
    "Laptop 13",
    "Laptop 13 12th Gen",
  ),
];
