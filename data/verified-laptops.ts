import type { Laptop } from "../lib/types";

export const verifiedLaptops: Laptop[] = [
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
        id: "dell-inspiron-15-3520-service-manual",
        title: "Inspiron 15 3520 Service Manual",
        url: "https://www.dell.com/support/manuals/en-us/inspiron-15-3520-laptop/inspiron_3520_sm/",
        type: "official_service_manual",
        publisher: "Dell",
        accessedAt: "2026-09-21",
      },
      {
        id: "dell-inspiron-15-3520-specs",
        title: "Inspiron 15 3520 Setup and Specifications",
        url: "https://www.dell.com/support/manuals/en-us/inspiron-15-3520-laptop/inspiron_3520_ss/",
        type: "official_specs",
        publisher: "Dell",
        accessedAt: "2026-09-21",
      },
      {
        id: "dell-inspiron-15-3520-product-page",
        title: "Inspiron 15 3520 Laptop",
        url: "https://www.dell.com/en-us/shop/dell-laptops/inspiron-15-laptop/spd/inspiron-15-3520-laptop",
        type: "official_specs",
        publisher: "Dell",
        accessedAt: "2026-09-21",
      },
    ],

    configurations: [
      {
        id: "m2-ssd-configuration",

        label: "M.2 SSD configuration",

        conditions: [
          "System is configured with an M.2 SSD.",
          "The M.2 SSD may use the 2230 or 2280 form factor.",
          "Exact SSD interface generation depends on the factory configuration.",
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
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual",
              "dell-inspiron-15-3520-product-page",
            ],
            notes:
              "Dell documents two SODIMM slots and DDR4 memory with a maximum supported configuration of 16 GB. Memory speed is 2666 MT/s for non-Type-C configurations and 3200 MT/s for Type-C configurations.",
          },
        },

        storage: {
          status: "yes",
          physicalSlots: 1,

          options: [
            {
              formFactor: "M.2 2230",
              interface: "PCIe NVMe",
              generation: "PCIe Gen3 x4",
              maxCapacityGb: 1000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-inspiron-15-3520-specs",
                  "dell-inspiron-15-3520-product-page",
                ],
                notes:
                  "Dell lists M.2 2230 PCIe NVMe Gen3 x4 SSD configurations up to 1 TB.",
              },
            },
            {
              formFactor: "M.2 2230",
              interface: "PCIe NVMe",
              generation: "PCIe Gen4 x4",
              maxCapacityGb: 1000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-inspiron-15-3520-specs",
                  "dell-inspiron-15-3520-product-page",
                ],
                notes:
                  "Dell lists M.2 2230 PCIe NVMe Gen4 x4 SSD configurations up to 1 TB.",
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe Gen3 x4",
              maxCapacityGb: 1000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-inspiron-15-3520-product-page",
                ],
                notes:
                  "Dell lists M.2 2280 PCIe NVMe Gen3 x4 QLC SSD configurations up to 1 TB.",
              },
            },
            {
              formFactor: "M.2 2280",
              interface: "PCIe NVMe",
              generation: "PCIe Gen4 x4",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-inspiron-15-3520-product-page",
                ],
                notes:
                  "Dell lists M.2 2280 PCIe NVMe Gen4 x4 SSD configurations up to 2 TB.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual",
              "dell-inspiron-15-3520-product-page",
            ],
            notes:
              "The M.2 configuration uses one M.2 storage slot. Dell documents multiple factory SSD combinations using M.2 2230 or M.2 2280.",
          },
        },

        battery: {
          status: "yes",
          replaceable: true,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-service-manual",
              "dell-inspiron-15-3520-specs",
            ],
            notes:
              "Dell documents removable service procedures for the applicable 3-cell and 4-cell battery variants. Battery capacity varies by configuration.",
          },
        },

        evidence: {
          sourceIds: [
            "dell-inspiron-15-3520-service-manual",
            "dell-inspiron-15-3520-specs",
            "dell-inspiron-15-3520-product-page",
          ],
        },
      },

      {
        id: "two-point-five-inch-hdd-configuration",

        label: "2.5-inch SATA HDD configuration",

        conditions: [
          "System is configured with a 2.5-inch SATA hard drive.",
          "Dell notes that systems with a 4-cell battery configuration do not support the hard-drive configuration.",
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
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual",
              "dell-inspiron-15-3520-product-page",
            ],
            notes:
              "Dell documents two SODIMM slots and DDR4 memory with a maximum supported configuration of 16 GB. Memory speed is 2666 MT/s for non-Type-C configurations and 3200 MT/s for Type-C configurations.",
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
                  "dell-inspiron-15-3520-product-page",
                  "dell-inspiron-15-3520-service-manual",
                ],
                notes:
                  "Dell lists 2.5-inch 5400 RPM SATA HDD configurations with capacities up to 2 TB.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-product-page",
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "This is an alternative factory storage configuration to the M.2 SSD layout.",
          },
        },

        battery: {
          status: "yes",
          replaceable: true,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-service-manual",
              "dell-inspiron-15-3520-specs",
            ],
            notes:
              "Dell documents removable service procedures for the applicable battery variants.",
          },
        },

        evidence: {
          sourceIds: [
            "dell-inspiron-15-3520-service-manual",
            "dell-inspiron-15-3520-specs",
            "dell-inspiron-15-3520-product-page",
          ],
        },
      },
    ],

    lastVerifiedAt: "2026-09-21",
  },
];
