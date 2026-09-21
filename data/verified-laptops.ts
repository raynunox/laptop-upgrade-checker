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
    ],

    configurations: [
      {
        id: "documented-memory-and-storage-configurations",

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
              "Dell documents two SODIMM memory slots, DDR4 memory, maximum 16 GB, with 4 GB, 8 GB, and 16 GB modules supported per slot. Memory speed is 2666 MT/s for non-Type-C configurations and 3200 MT/s for Type-C configurations.",
          },
        },

        storage: {
          status: "conditional",

          slots: [
            {
              formFactor: ["M.2 2230", "M.2 2280"],
              interface: "PCIe NVMe",
              generation: "PCIe Gen 3/4 depending on configuration",
              maxCapacityGb: 2000,
              replaceable: "yes",

              evidence: {
                sourceIds: [
                  "dell-inspiron-15-3520-specs",
                  "dell-inspiron-15-3520-service-manual",
                ],
                notes:
                  "Dell documents one M.2 slot for a 2230/2280 SSD. Supported M.2 configurations include PCIe NVMe 3x4 and 4x4, with documented capacities up to 1 TB for M.2 2230 and up to 2 TB for M.2 2280.",
              },
            },
          ],

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual",
            ],
            notes:
              "The system supports either an M.2 2230/2280 SSD configuration or a 2.5-inch 5400 RPM SATA HDD configuration. These are alternative factory storage configurations, not simultaneously available in every system. Dell notes that systems with a 4-cell battery do not support the 2.5-inch HDD configuration.",
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
              "Dell's service manual documents removal and installation procedures for the 3-cell and 4-cell battery variants.",
          },
        },

        evidence: {
          sourceIds: [
            "dell-inspiron-15-3520-service-manual",
            "dell-inspiron-15-3520-specs",
          ],
        },
      },
    ],

    lastVerifiedAt: "2026-09-21",
  },
];
