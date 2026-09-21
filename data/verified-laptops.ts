import type { Laptop } from "../lib/types";

export const verifiedLaptops: Laptop[] = [
  {
    id: "dell-inspiron-15-3520",

    brand: "Dell",
    family: "Inspiron",
    model: "Inspiron 15 3520",
    modelNumber: "3520",

    releaseYear: 2022,

    verificationStatus: "partially_verified",

    sources: [
      {
        id: "dell-inspiron-15-3520-service-manual",
        title: "Inspiron 15 3520 Service Manual",
        url: "https://www.dell.com/support/manuals/en-us/inspiron-15-3520-laptop/inspiron_3520_sm/",
        type: "official_service_manual",
        publisher: "Dell",
        accessedAt: "2026-09-21"
      },
      {
        id: "dell-inspiron-15-3520-specs",
        title: "Inspiron 15 3520 Setup and Specifications",
        url: "https://www.dell.com/support/manuals/en-us/inspiron-15-3520-laptop/inspiron_3520_ss/",
        type: "official_specs",
        publisher: "Dell",
        accessedAt: "2026-09-21"
      }
    ],

    configurations: [
      {
        id: "documented-configurations",

        memory: {
          status: "yes",
          type: "DDR4",
          formFactor: "SO-DIMM",
          slots: 2,
          maxTotalGb: 16,
          maxSpeedMhz: 3200,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual"
            ],
            notes:
              "Dell documents two SO-DIMM slots, DDR4 memory, maximum 16 GB. Memory speed varies by configuration: 2666 MT/s for non-Type-C configurations and 3200 MT/s for Type-C configurations."
          }
        },

        storage: {
          status: "conditional",

          slots: [],

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-specs",
              "dell-inspiron-15-3520-service-manual"
            ],
            notes:
              "Dell documents multiple factory storage configurations, including M.2 2230/2280 PCIe NVMe SSD and 2.5-inch SATA HDD configurations. Exact upgrade path depends on the installed configuration."
          }
        },

        battery: {
          status: "yes",
          replaceable: true,

          evidence: {
            sourceIds: [
              "dell-inspiron-15-3520-service-manual"
            ],
            notes:
              "Dell service documentation includes removal and installation procedures for both 3-cell and 4-cell batteries."
          }
        },

        evidence: {
          sourceIds: [
            "dell-inspiron-15-3520-service-manual",
            "dell-inspiron-15-3520-specs"
          ]
        }
      }
    ],

    lastVerifiedAt: "2026-09-21"
  }
];
