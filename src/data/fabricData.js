// Real Lutron roller shade fabric families with actual SKUs and CDN image URLs

// Images loaded directly from Lutron's CDN (assets.lutron.com)
export function getFabricImageUrl(sku) {
  return `https://assets.lutron.com/a/images/fabrics/fabric_thumbnail_image_${sku.toLowerCase()}_1.jpg`;
}

// Get the Lutron fabrics page URL for a given family
export function getLutronFabricUrl(family) {
  const slug = family.name.toLowerCase()
    .replace(/é/g, 'e')
    .replace(/\s+/g, '-');
  return `https://www.lutronfabrics.com/us/en/fabrics/family/${slug}/${family.sku}`;
}

// Common Lutron 2-letter color suffixes → display names
export const COLOR_CODES = {
  SI: 'Silver', WH: 'White', CH: 'Charcoal', PE: 'Pearl', AL: 'Alabaster',
  AN: 'Antique', MO: 'Mocha', DO: 'Dove', AS: 'Ash', OY: 'Oyster',
  IN: 'Indigo', CL: 'Cloud', SA: 'Sand', GP: 'Graphite', HE: 'Hemp',
  BL: 'Blue', MS: 'Muslin', CG: 'Cloud Gray', DG: 'Dark Gray', OC: 'Ochre',
  ME: 'Merlot', PY: 'Putty', CD: 'Cedar', BI: 'Bisque', CR: 'Cream',
  IV: 'Ivory', LN: 'Linen', ST: 'Stone', SL: 'Slate', GR: 'Gray',
  BE: 'Beige', TN: 'Tan', CO: 'Cocoa', ES: 'Espresso', ON: 'Onyx',
  SN: 'Snow', IC: 'Ice', FG: 'Fog', MN: 'Midnight', AG: 'Ash Gray',
  PL: 'Platinum', BR: 'Bronze', CP: 'Copper', GD: 'Gold', PN: 'Pine',
  SG: 'Sage', MI: 'Mist', CB: 'Carbon', SE: 'Sesame', CA: 'Canvas',
  AB: 'Almond Beige', WN: 'Walnut', DV: 'Dove Gray',
};

// Parse the SKU base (everything before the last dash-segment = the color code)
export function getSkuBase(sku) {
  const parts = sku.split('-');
  return parts.slice(0, -1).join('-');
}

// Build a candidate SKU by replacing the color suffix
export function buildColorSku(baseSku, colorCode) {
  return `${baseSku}-${colorCode}`;
}

export function getColorName(code) {
  return COLOR_CODES[code.toUpperCase()] || code.toUpperCase();
}

export const FABRIC_FAMILIES = [
  { name: "Aura", sku: "RF-AUR3-7", count: 14, type: "sheer", collection: "gallery" },
  { name: "Basketweave", sku: "PV61-48-1", count: 12, type: "translucent", collection: "essentials" },
  { name: "Basketweave 27", sku: "SP92-27-3", count: 44, type: "translucent", collection: "essentials" },
  { name: "Basketweave 4000 Eco", sku: "SU61-4E-3", count: 27, type: "translucent", collection: "essentials" },
  { name: "Basketweave 90", sku: "SP14-90-3", count: 40, type: "translucent", collection: "essentials" },
  { name: "Basketweave 90 C", sku: "90AF-3-OP", count: 15, type: "translucent", collection: "essentials" },
  { name: "Basketweave Eco2", sku: "SI2-PG3-5", count: 27, type: "translucent", collection: "essentials" },
  { name: "Bistre", sku: "RF-BISTR-3", count: 6, type: "translucent", collection: "gallery" },
  { name: "Blackout Screen", sku: "RF-BOSC-CG", count: 9, type: "blackout", collection: "classico" },
  { name: "Bouclé", sku: "RF-BOU-MO", count: 11, type: "translucent", collection: "atelier" },
  { name: "Bouclé Blackout", sku: "RF-BOU0-MO", count: 11, type: "blackout", collection: "atelier" },
  { name: "E Screen", sku: "S0207-E-1", count: 55, type: "sheer", collection: "essentials" },
  { name: "E Screen THEIA", sku: "S0202ET-A", count: 22, type: "sheer", collection: "essentials" },
  { name: "E Screen KOOLBLACK", sku: "S0M22-KB-3", count: 15, type: "sheer", collection: "essentials" },
  { name: "Element", sku: "RF-LMNT-CH", count: 8, type: "translucent", collection: "gallery" },
  { name: "Element Facade", sku: "RF-LMNTF-G", count: 4, type: "translucent", collection: "gallery" },
  { name: "Encore Blackout", sku: "RF-7001-WH", count: 11, type: "blackout", collection: "classico" },
  { name: "GreenScreen Evolve", sku: "QS-0035-3", count: 9, type: "sheer", collection: "essentials" },
  { name: "Harbor", sku: "RF-HAR-PE", count: 4, type: "translucent", collection: "gallery" },
  { name: "Harbor Blackout", sku: "RF-HAR0-AN", count: 4, type: "blackout", collection: "gallery" },
  { name: "Highland Blackout", sku: "RF-HIG0-DG", count: 3, type: "blackout", collection: "atelier" },
  { name: "Hue", sku: "RF-HUE-5", count: 8, type: "translucent", collection: "gallery" },
  { name: "Jacquard", sku: "SD60-5K-10", count: 5, type: "translucent", collection: "atelier" },
  { name: "Loop", sku: "RF-LOOP-AL", count: 8, type: "translucent", collection: "gallery" },
  { name: "Luna", sku: "RF-LUNA-10", count: 9, type: "translucent", collection: "gallery" },
  { name: "Luna Blackout", sku: "RF-LUNA-22", count: 9, type: "blackout", collection: "gallery" },
  { name: "Luna Blackout FR", sku: "RF-LFR0-CH", count: 5, type: "blackout", collection: "gallery" },
  { name: "M Screen", sku: "S3030-M-5", count: 27, type: "sheer", collection: "essentials" },
  { name: "Matrice", sku: "RF-MAT-GP", count: 9, type: "translucent", collection: "atelier" },
  { name: "Matrice Blackout", sku: "RF-MAT0-CD", count: 9, type: "blackout", collection: "atelier" },
  { name: "Mirage", sku: "RF-MIR-HE", count: 4, type: "translucent", collection: "gallery" },
  { name: "Mirage Blackout", sku: "RF-MIR0-ME", count: 4, type: "blackout", collection: "gallery" },
  { name: "Monomer", sku: "RF-MNMR-2", count: 5, type: "translucent", collection: "gallery" },
  { name: "Mosaic", sku: "RF-MSC-6", count: 8, type: "translucent", collection: "atelier" },
  { name: "Mosaic Blackout", sku: "RF-MSC0-6", count: 8, type: "blackout", collection: "atelier" },
  { name: "Natural Screen", sku: "RF-NSCRN-B", count: 4, type: "sheer", collection: "gallery" },
  { name: "OmniaScreen Silver", sku: "RF-OMNSN-6", count: 6, type: "sheer", collection: "essentials" },
  { name: "Palette", sku: "RF-PALT-13", count: 7, type: "translucent", collection: "classico" },
  { name: "Palette Blackout", sku: "RF-PALT-1", count: 8, type: "blackout", collection: "classico" },
  { name: "Pochoir", sku: "RF-POC-OC", count: 7, type: "translucent", collection: "atelier" },
  { name: "Pochoir Blackout", sku: "RF-POC0-OC", count: 7, type: "blackout", collection: "atelier" },
  { name: "Premiere", sku: "BM-623-0", count: 5, type: "roomdarkening", collection: "essentials" },
  { name: "Roseau", sku: "RF-ROS-DO", count: 13, type: "translucent", collection: "atelier" },
  { name: "Roseau Blackout", sku: "RF-ROS0-PY", count: 13, type: "blackout", collection: "atelier" },
  { name: "Satine", sku: "RF-SAT-SI", count: 11, type: "translucent", collection: "gallery" },
  { name: "Satine Blackout", sku: "RF-SAT0-SI", count: 11, type: "blackout", collection: "gallery" },
  { name: "SheerLite", sku: "SHL-002-5", count: 12, type: "sheer", collection: "essentials" },
  { name: "Sheerweave 4900", sku: "Q07-49-3", count: 26, type: "sheer", collection: "essentials" },
  { name: "Sheerweave 8000", sku: "RF-8000-1", count: 5, type: "sheer", collection: "essentials" },
  { name: "Standard", sku: "BN-903-0", count: 6, type: "roomdarkening", collection: "essentials" },
  { name: "Stratus", sku: "RF-STS-CH", count: 6, type: "translucent", collection: "gallery" },
  { name: "Stratus Blackout", sku: "RF-STS0-OY", count: 6, type: "blackout", collection: "gallery" },
  { name: "Stria", sku: "RF-STR-CG", count: 6, type: "translucent", collection: "gallery" },
  { name: "Stria Blackout", sku: "RF-STR0-MS", count: 6, type: "blackout", collection: "gallery" },
  { name: "T Screen", sku: "SM387-T-1", count: 24, type: "sheer", collection: "essentials" },
  { name: "T Screen KOOLBLACK", sku: "TS2131K-5", count: 11, type: "sheer", collection: "essentials" },
  { name: "Tela", sku: "RF-TEL-BL", count: 8, type: "translucent", collection: "gallery" },
  { name: "Tela Blackout", sku: "RF-TEL0-AS", count: 8, type: "blackout", collection: "gallery" },
  { name: "Tre Blackout", sku: "RF-TREB-MS", count: 7, type: "blackout", collection: "gallery" },
  { name: "Tre Light Filtering", sku: "RF-TREL-IN", count: 7, type: "translucent", collection: "gallery" },
  { name: "Tre Sheer", sku: "RF-TRES-AS", count: 7, type: "sheer", collection: "gallery" },
  { name: "Verso", sku: "RF-VRSO-CL", count: 6, type: "translucent", collection: "gallery" },
  { name: "Vista", sku: "RF-VIS-SA", count: 6, type: "translucent", collection: "gallery" },
];

export const OPACITY_TYPES = [
  { key: "sheer", label: "Sheer / Solar Screen" },
  { key: "translucent", label: "Light Filtering" },
  { key: "roomdarkening", label: "Room Darkening" },
  { key: "blackout", label: "Blackout" },
];

export const COLLECTIONS = ["atelier", "classico", "gallery", "essentials"];

// Legacy exports for backward compatibility
export const FABRICS = FABRIC_FAMILIES;
export function getThumbnailUrl(sku) {
  return getFabricImageUrl(sku);
}
export function getSwatchColor(fabric) {
  return fabric.hex || '#CCCCCC';
}
