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
          "System configured with an M.2 SSD",
        ],

        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 16,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "Dell documents two SODIMM slots, DDR4 memory, and a maximum supported memory configuration of 16 GB. Supported memory speed is 2666 MT/s for non-Type-C configurations and 3200 MT/s for Type-C configurations.",
          },
        },

        storage: {
          status: "yes",

          slots: [
            {
              formFactor: ["M.2 2230", "M.2 2280"],
              interface: "PCIe NVMe",
              generation: "Gen 3 x4 or Gen 4 x4 depending on factory configuration",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-inspiron-15-3520-specs",
                  "dell-inspiron-15-3520-product-page",
                ],
                notes:
                  "Dell documents one M.2 2230/2280 SSD slot. Factory SSD configurations include M.2 2230 PCIe NVMe drives up to 1 TB and M.2 2280 PCIe NVMe drives up to 2 TB.",
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
              "This configuration represents systems shipped with an M.2 SSD rather than the alternative 2.5-inch HDD configuration.",
          },
        },

        battery: {
          status: "yes",
          replaceable: true,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "Dell service documentation provides removal and installation procedures for the applicable 3-cell and 4-cell battery.",
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
          "System configured with a 2.5-inch SATA HDD",
          "4-cell battery configuration does not support the 2.5-inch HDD layout",
        ],

        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 16,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "Dell documents two SODIMM slots, DDR4 memory, and a maximum supported memory configuration of 16 GB.",
          },
        },

        storage: {
          status: "yes",

          slots: [
            {
              formFactor: ["2.5-inch"],
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
                  "Dell documents 2.5-inch 5400 RPM SATA HDD factory configurations up to 2 TB and provides a service procedure for the hard-drive assembly.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-product-page",
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "This is an alternative factory storage layout to the M.2 SSD configuration. Dell notes that systems with a 4-cell battery do not support the 2.5-inch HDD configuration.",
          },
        },

        battery: {
          status: "yes",
          replaceable: true,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "Dell service documentation provides removal and installation procedures for the applicable battery variants.",
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
