import type { Laptop } from "../lib/types";

export const laptops: Laptop[] = [
  {
    id: "dell-inspiron-15-3520",

    brand: "Dell",
    family: "Inspiron",
    model: "Inspiron 15 3520",
    modelNumber: "3520",
    releaseYear: 2022,

    verificationStatus: "verified",

    sources: [
      {
        id: "dell-3520-service-manual",
        title: "Inspiron 15 3520 Service Manual",
        url: "https://www.dell.com/support/manuals/en-us/inspiron-15-3520-laptop/inspiron_3520_sm/",
        type: "official_service_manual",
        publisher: "Dell",
        accessedAt: "2026-09-23",
      },
      {
        id: "dell-3520-specs",
        title: "Inspiron 15 3520 Setup and Specifications",
        url: "https://www.dell.com/support/manuals/en-us/inspiron-15-3520-laptop/inspiron_3520_ss/",
        type: "official_specs",
        publisher: "Dell",
        accessedAt: "2026-09-23",
      },
    ],

    configurations: [
      {
        id: "m2-ssd",

        label: "M.2 SSD configuration",

        conditions: [
          "System is configured with an M.2 SSD.",
          "The installed M.2 SSD can be 2230 or 2280.",
        ],

        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 16,
          supportedSpeedsMts: [2666, 3200],

          evidence: {
            sourceIds: [
              "dell-3520-specs",
              "dell-3520-service-manual",
            ],
            notes:
              "Dell documents two SO-DIMM slots, DDR4 memory, maximum 16 GB. Memory speed is 2666 MT/s for non-Type-C configurations and 3200 MT/s for Type-C configurations.",
          },
        },

        storage: {
          status: "yes",
          physicalSlots: 1,

          options: [
            {
              formFactor: "M.2 2230",
              interface: "PCIe NVMe",
              generation: "PCIe NVMe 3x4",
              maxCapacityGb: 1000,
              replaceable: "yes",

              evidence: {
                sourceIds: ["dell-3520-specs"],
                notes:
                  "Dell lists M.2 2230 PCIe NVMe 3x4 SSD configurations up to 1 TB.",
              },
            },
            {
              formFactor: "M.2 2230",
              interface: "PCIe NVMe",
              generation: "PCIe NVMe 4x4",
              maxCapacityGb: 1000,
              replaceable: "yes",

              evidence: {
                sourceIds: ["dell-3520-specs"],
                notes:
                  "Dell lists M.2 2230 PCIe NVMe 4x4 SSD configurations up to 1 TB.",
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe NVMe 4x4",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: ["dell-3520-specs"],
                notes:
                  "Dell lists M.2 2280 PCIe NVMe 4x4 SSD configurations up to 2 TB.",
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe NVMe 3x4 QLC",
              maxCapacityGb: 1000,
              replaceable: "yes",

              evidence: {
                sourceIds: ["dell-3520-specs"],
                notes:
                  "Dell lists an M.2 2280 QLC PCIe NVMe 3x4 SSD configuration up to 1 TB.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "dell-3520-specs",
              "dell-3520-service-manual",
            ],
            notes:
              "Dell documents one M.2 storage slot for an M.2 2230 or M.2 2280 SSD.",
          },
        },

        battery: {
          status: "yes",
          removable: false,
          replaceable: true,

          evidence: {
            sourceIds: ["dell-3520-service-manual"],
            notes:
              "Dell's service manual documents removal and installation procedures for the applicable 3-cell and 4-cell batteries.",
          },
        },

        evidence: {
          sourceIds: [
            "dell-3520-specs",
            "dell-3520-service-manual",
          ],
        },
      },

      {
        id: "two-point-five-inch-hdd",

        label: "2.5-inch SATA HDD configuration",

        conditions: [
          "System is configured with a 2.5-inch SATA hard drive.",
          "Systems with a 4-cell battery configuration do not support the hard drive.",
        ],

        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 16,
          supportedSpeedsMts: [2666, 3200],

          evidence: {
            sourceIds: [
              "dell-3520-specs",
              "dell-3520-service-manual",
            ],
            notes:
              "Dell documents two SO-DIMM slots, DDR4 memory, maximum 16 GB. Memory speed depends on configuration.",
          },
        },

        storage: {
          status: "yes",
          physicalSlots: 1,

          options: [
            {
              formFactor: "2.5-inch",
              interface: "SATA",
              generation: "SATA",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-3520-specs",
                  "dell-3520-service-manual",
                ],
                notes:
                  "Dell lists a 2.5-inch 5400 RPM SATA hard drive configuration up to 2 TB.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "dell-3520-specs",
              "dell-3520-service-manual",
            ],
            notes:
              "The 2.5-inch HDD configuration is an alternative factory storage layout.",
          },
        },

        battery: {
          status: "yes",
          removable: false,
          replaceable: true,

          evidence: {
            sourceIds: ["dell-3520-service-manual"],
            notes:
              "Dell documents removal and installation procedures for the applicable battery variants.",
          },
        },

        evidence: {
          sourceIds: [
            "dell-3520-specs",
            "dell-3520-service-manual",
          ],
        },
      },
    ],

    lastVerifiedAt: "2026-09-23",
  },

  {
    id: "lenovo-thinkpad-t14-gen-2-amd",

    brand: "Lenovo",
    family: "ThinkPad",
    model: "ThinkPad T14 Gen 2 AMD",
    modelNumber: "20XK / 20XL",
    releaseYear: 2021,

    verificationStatus: "partially_verified",

    sources: [
      {
        id: "lenovo-t14-gen-2-amd-psref",
        title: "ThinkPad T14 Gen 2 AMD Specifications",
        url: "https://psref.lenovo.com/Product/ThinkPad_T14_Gen_2_AMD",
        type: "official_specs",
        publisher: "Lenovo",
        accessedAt: "2026-09-23",
      },
      {
        id: "lenovo-t14-gen-2-amd-user-guide",
        title: "ThinkPad T14 Gen 2 User Guide",
        url: "https://download.lenovo.com/pccbbs/mobiles_pdf/t14_gen2_t15_gen2_p14s_gen2_p15s_gen2_ug_en.pdf",
        type: "official_support",
        publisher: "Lenovo",
        accessedAt: "2026-09-23",
      },
    ],

    configurations: [
      {
        id: "8gb-soldered",

        label: "8 GB soldered memory configuration",

        conditions: [
          "8 GB memory is soldered to the system board.",
          "One DDR4 SO-DIMM slot is available.",
        ],

        memory: {
          status: "yes",
          type: "DDR4-3200",
          formFactor: "SO-DIMM",
          onboardGb: 8,
          slots: 1,
          maxTotalGb: 40,
          maxPerSlotGb: 32,
          supportedSpeedsMts: [3200],

          evidence: {
            sourceIds: ["lenovo-t14-gen-2-amd-psref"],
            notes:
              "Lenovo documents 8 GB soldered memory plus one DDR4 SO-DIMM slot. Maximum documented memory is 40 GB.",
          },
        },

        storage: {
          status: "yes",
          physicalSlots: 1,

          options: [
            {
              formFactor: "M.2 2242",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x4",
              maxCapacityGb: 256,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t14-gen-2-amd-psref",
                  "lenovo-t14-gen-2-amd-user-guide",
                ],
                notes:
                  "Lenovo documents M.2 2242 PCIe NVMe SSD support up to 256 GB.",
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x4 system slot",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t14-gen-2-amd-psref",
                  "lenovo-t14-gen-2-amd-user-guide",
                ],
                notes:
                  "Lenovo documents M.2 2280 SSD support up to 2 TB. PCIe 4.0 x4 SSD performance is limited by the system slot.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "lenovo-t14-gen-2-amd-psref",
              "lenovo-t14-gen-2-amd-user-guide",
            ],
          },
        },

        battery: {
          status: "unknown",
          removable: false,
          capacityWh: 50,

          evidence: {
            sourceIds: [
              "lenovo-t14-gen-2-amd-psref",
              "lenovo-t14-gen-2-amd-user-guide",
            ],
            notes:
              "Lenovo documents an integrated 50 Wh battery. Replacement status is intentionally left unknown until explicitly established by the appropriate service documentation.",
          },
        },

        evidence: {
          sourceIds: [
            "lenovo-t14-gen-2-amd-psref",
            "lenovo-t14-gen-2-amd-user-guide",
          ],
        },
      },

      {
        id: "16gb-soldered",

        label: "16 GB soldered memory configuration",

        conditions: [
          "16 GB memory is soldered to the system board.",
          "One DDR4 SO-DIMM slot is available.",
        ],

        memory: {
          status: "yes",
          type: "DDR4-3200",
          formFactor: "SO-DIMM",
          onboardGb: 16,
          slots: 1,
          maxTotalGb: 48,
          maxPerSlotGb: 32,
          supportedSpeedsMts: [3200],

          evidence: {
            sourceIds: ["lenovo-t14-gen-2-amd-psref"],
            notes:
              "Lenovo documents 16 GB soldered memory plus one DDR4 SO-DIMM slot. Maximum documented memory is 48 GB.",
          },
        },

        storage: {
          status: "yes",
          physicalSlots: 1,

          options: [
            {
              formFactor: "M.2 2242",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x4",
              maxCapacityGb: 256,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t14-gen-2-amd-psref",
                  "lenovo-t14-gen-2-amd-user-guide",
                ],
                notes:
                  "Lenovo documents M.2 2242 PCIe NVMe SSD support up to 256 GB.",
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x4 system slot",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t14-gen-2-amd-psref",
                  "lenovo-t14-gen-2-amd-user-guide",
                ],
                notes:
                  "Lenovo documents M.2 2280 SSD support up to 2 TB. PCIe 4.0 x4 SSD performance is limited by the system slot.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "lenovo-t14-gen-2-amd-psref",
              "lenovo-t14-gen-2-amd-user-guide",
            ],
          },
        },

        battery: {
          status: "unknown",
          removable: false,
          capacityWh: 50,

          evidence: {
            sourceIds: [
              "lenovo-t14-gen-2-amd-psref",
              "lenovo-t14-gen-2-amd-user-guide",
            ],
            notes:
              "Lenovo documents an integrated 50 Wh battery. Replacement status is intentionally left unknown until explicitly established by the appropriate service documentation.",
          },
        },

        evidence: {
          sourceIds: [
            "lenovo-t14-gen-2-amd-psref",
            "lenovo-t14-gen-2-amd-user-guide",
          ],
        },
      },
    ],

    lastVerifiedAt: "2026-09-23",
  },
    {
    id: "lenovo-thinkpad-t480",

    brand: "Lenovo",
    family: "ThinkPad",
    model: "ThinkPad T480",
    modelNumber: "20L5 / 20L6",
    releaseYear: 2018,

    verificationStatus: "verified",

    sources: [
      {
        id: "lenovo-t480-psref",
        title: "ThinkPad T480 Platform Specifications",
        url: "https://psref.lenovo.com/Product/ThinkPad_T480",
        type: "official_specs",
        publisher: "Lenovo",
        accessedAt: "2026-09-23",
      },
      {
        id: "lenovo-t480-hmm",
        title: "T480 Hardware Maintenance Manual",
        url: "https://download.lenovo.com/pccbbs/mobiles_pdf/t480_hmm_en.pdf",
        type: "official_service_manual",
        publisher: "Lenovo",
        accessedAt: "2026-09-23",
      },
    ],

    configurations: [
      {
        id: "primary-storage-2-5-inch",

        label: "2.5-inch SATA primary storage configuration",

        conditions: [
          "Primary storage uses the 2.5-inch drive bay.",
          "The system may also support an M.2 2242 drive in the WWAN slot on applicable configurations.",
        ],

        memory: {
          status: "yes",
          type: "DDR4-2400",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 32,
          supportedSpeedsMts: [2400],

          evidence: {
            sourceIds: [
              "lenovo-t480-psref",
              "lenovo-t480-hmm",
            ],
            notes:
              "Lenovo documents two DDR4 SO-DIMM sockets, dual-channel capability, and a maximum supported memory configuration of 32 GB at 2400 MHz/MT/s, with processor-dependent downclocking possible.",
          },
        },

        storage: {
          status: "conditional",
          physicalSlots: 1,

          options: [
            {
              formFactor: "2.5-inch",
              interface: "SATA 6 Gb/s",
              generation: "SATA",
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t480-psref",
                  "lenovo-t480-hmm",
                ],
                notes:
                  "Lenovo documents a 2.5-inch, 7 mm SATA storage bay for HDD or SATA SSD configurations.",
              },
            },
            {
              formFactor: "M.2 2242",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x2",
              maxCapacityGb: 128,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t480-psref",
                  "lenovo-t480-hmm",
                ],
                notes:
                  "Lenovo documents an M.2 2242 PCIe NVMe drive in the WWAN slot as optional second storage on applicable configurations; it is mutually exclusive with WWAN.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "lenovo-t480-psref",
              "lenovo-t480-hmm",
            ],
            notes:
              "The T480's primary storage architecture varies by factory configuration. Lenovo documents a 2.5-inch storage bay or an M.2 2280 primary SSD configuration, with an optional M.2 2242 drive in the WWAN slot on some systems.",
          },
        },

        battery: {
          status: "yes",
          removable: true,
          replaceable: true,
          capacityWh: 24,

          evidence: {
            sourceIds: [
              "lenovo-t480-psref",
              "lenovo-t480-hmm",
            ],
            notes:
              "Lenovo documents an integrated 24 Wh battery plus a swappable external battery. The external battery is user-removable.",
          },
        },

        evidence: {
          sourceIds: [
            "lenovo-t480-psref",
            "lenovo-t480-hmm",
          ],
        },
      },

      {
        id: "m2-2280-primary-storage",

        label: "M.2 2280 primary storage configuration",

        conditions: [
          "Primary storage uses the M.2 2280 slot.",
          "An optional M.2 2242 drive may be present in the WWAN slot on applicable configurations.",
        ],

        memory: {
          status: "yes",
          type: "DDR4-2400",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 32,
          supportedSpeedsMts: [2400],

          evidence: {
            sourceIds: [
              "lenovo-t480-psref",
              "lenovo-t480-hmm",
            ],
            notes:
              "Lenovo documents two DDR4 SO-DIMM sockets and a maximum supported memory configuration of 32 GB.",
          },
        },

        storage: {
          status: "conditional",
          physicalSlots: 1,

          options: [
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x4",
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t480-psref",
                  "lenovo-t480-hmm",
                ],
                notes:
                  "Lenovo documents an M.2 2280 PCIe NVMe primary storage configuration.",
              },
            },
            {
              formFactor: "M.2 2242",
              interface: "PCIe NVMe",
              generation: "PCIe 3.0 x2",
              maxCapacityGb: 128,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "lenovo-t480-psref",
                  "lenovo-t480-hmm",
                ],
                notes:
                  "Lenovo documents an optional M.2 2242 PCIe NVMe drive in the WWAN slot as second storage on applicable configurations; it is mutually exclusive with WWAN.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "lenovo-t480-psref",
              "lenovo-t480-hmm",
            ],
            notes:
              "The primary storage uses the M.2 2280 slot in this configuration. A separate M.2 2242 drive may be used in the WWAN slot on supported systems.",
          },
        },

        battery: {
          status: "yes",
          removable: true,
          replaceable: true,
          capacityWh: 24,

          evidence: {
            sourceIds: [
              "lenovo-t480-psref",
              "lenovo-t480-hmm",
            ],
            notes:
              "Lenovo documents an integrated 24 Wh battery plus a swappable external battery.",
          },
        },

        evidence: {
          sourceIds: [
            "lenovo-t480-psref",
            "lenovo-t480-hmm",
          ],
        },
      },
    ],

    lastVerifiedAt: "2026-09-23",
  },
];
