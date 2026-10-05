export interface DemoDocument {
  name: string;
  type:
    | "manual"
    | "receipt"
    | "warranty"
    | "service"
    | "other";

  content: string;
}

export const demoDocuments: DemoDocument[] = [
  {
    name: "LG Washing Machine Invoice",
    type: "receipt",

    content: `
LG WASHING MACHINE — PURCHASE INVOICE

Invoice Number: DEMO-LG-2025-0312

Product:
LG 8kg Front Load Washing Machine
Model: FHM1208Z4M

Purchase Date: March 12, 2025

Purchase Price: ₹34,999

Warranty:
The washing machine is covered by a 2-year comprehensive
manufacturer warranty from the date of purchase.

Warranty Start Date: March 12, 2025
Warranty Expiry Date: March 11, 2027

Seller: HomeTech Appliances
Customer: Alex Thomas

This is fictional demonstration data created for HomeMemory.
`.trim(),
  },

  {
    name: "Samsung Refrigerator Warranty",
    type: "warranty",

    content: `
SAMSUNG REFRIGERATOR — WARRANTY CARD

Document Number: DEMO-SAMSUNG-2025-0108

Product:
Samsung 253L Double Door Refrigerator
Model: RT28T3922S8

Purchase Date: January 8, 2025

Warranty:
The refrigerator has a 1-year comprehensive warranty
from the purchase date.

Warranty Start Date: January 8, 2025
Warranty Expiry Date: January 7, 2026

The warranty covers manufacturing defects under normal
household use.

Seller: HomeTech Appliances
Customer: Alex Thomas

This is fictional demonstration data created for HomeMemory.
`.trim(),
  },

  {
    name: "Voltas AC Service Receipt",
    type: "service",

    content: `
VOLTAS AIR CONDITIONER — SERVICE RECEIPT

Receipt Number: DEMO-VOLTAS-2026-0614

Product:
Voltas 1.5 Ton Split Air Conditioner
Model: 183V EY

Service Date: June 14, 2026

Service Performed:
- Indoor unit cleaning
- Outdoor unit inspection
- Air filter cleaning
- Refrigerant pressure inspection
- Electrical connection inspection

Service Cost: ₹1,850

Technician: Ravi Kumar

Service Recommendation:
The next routine maintenance service is recommended
in December 2026.

Customer: Alex Thomas

This is fictional demonstration data created for HomeMemory.
`.trim(),
  },

  {
    name: "TV User Manual",
    type: "manual",

    content: `
SMART TV USER MANUAL

Product:
55-inch 4K Smart TV

Model: HM-TV-55-4K

Basic Information:

Screen Size: 55 inches
Resolution: 3840 × 2160
HDMI Ports: 3
USB Ports: 2

Troubleshooting:

If there is no picture:
1. Check that the TV is powered on.
2. Verify the HDMI cable connection.
3. Select the correct HDMI input using the Source button.
4. Restart the connected device.

If the TV has no sound:
1. Check the volume level.
2. Make sure the TV is not muted.
3. Check the selected audio output.
4. Restart the TV.

Factory Reset:

Open Settings → System → Reset → Factory Reset.

A factory reset removes saved settings, accounts,
and installed applications.

This is fictional demonstration data created for HomeMemory.
`.trim(),
  },

  {
    name: "Water Purifier Invoice",
    type: "receipt",

    content: `
WATER PURIFIER — PURCHASE INVOICE

Invoice Number: DEMO-WATER-2026-0220

Product:
HomePure RO + UV Water Purifier
Model: HP-ROUV-7

Purchase Date: February 20, 2026

Purchase Price: ₹18,499

Warranty:
The purifier is covered by a 1-year warranty from
the date of purchase.

Warranty Start Date: February 20, 2026
Warranty Expiry Date: February 19, 2027

Installation:
Installation was completed on February 21, 2026.

Seller: CleanWater Solutions
Customer: Alex Thomas

This is fictional demonstration data created for HomeMemory.
`.trim(),
  },
];