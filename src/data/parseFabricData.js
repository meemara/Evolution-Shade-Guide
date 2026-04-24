#!/usr/bin/env node

/**
 * parseFabricData.js
 *
 * Parses raw Lutron fabric filter page data into structured JSON.
 *
 * Expected raw data format: array of objects with {text, sku, img}
 * Text format: "FamilyColor Opacity%" (e.g., "AuraParchment 5%")
 *
 * Usage: node parseFabricData.js < raw-data.json > fabricData.json
 */

// Known fabric families - MUST be sorted longest-first to match correctly
const FABRIC_FAMILIES = [
  "Basketweave 4000 Eco",
  "Element Facade",
  "E Screen with KOOLBLACK",
  "T Screen with KOOLBLACK",
  "GreenScreen Evolve",
  "Luna Blackout FR",
  "Luna Blackout",
  "Blackout Screen",
  "Boucle Blackout",
  "Basketweave 90C",
  "Basketweave 90",
  "Basketweave Eco2",
  "Basketweave 27",
  "Matrice Blackout",
  "Mosaic Blackout",
  "Palette Blackout",
  "Roseau Blackout",
  "Satine Blackout",
  "Stria Blackout",
  "Harbor BO",
  "Highland BO",
  "Mirage BO",
  "Stratus BO",
  "Sheerweave 4900",
  "Element",
  "SheerLite",
  "Shadow",
  "Mystic",
  "Canvas",
  "Jacquard",
  "Chroma",
  "Bistre",
  "Aura",
  "E Screen",
  "M Screen",
  "T Screen",
  "Verso",
  "Pochoir",
  "Hue",
  "Loop",
  "Luna",
  "Premiere",
  "Pure",
  "Standard"
];

// Collection mappings
const COLLECTION_MAP = {
  "Canvas": "atelier",
  "Mystic": "atelier",
  "Pure": "atelier",
  "Shadow": "atelier",

  "E Screen": "classico",
  "E Screen with KOOLBLACK": "classico",
  "M Screen": "classico",
  "T Screen": "classico",
  "T Screen with KOOLBLACK": "classico",
  "GreenScreen Evolve": "classico",
  "Sheerweave 4900": "classico",
  "Basketweave 27": "classico",
  "Basketweave 4000 Eco": "classico",
  "Basketweave 90": "classico",
  "Basketweave 90C": "classico",
  "Basketweave Eco2": "classico",
  "Blackout Screen": "classico",
  "Boucle Blackout": "classico",
  "Harbor BO": "classico",
  "Highland BO": "classico",
  "Luna Blackout": "classico",
  "Luna Blackout FR": "classico",
  "Matrice Blackout": "classico",
  "Mirage BO": "classico",
  "Mosaic Blackout": "classico",
  "Palette Blackout": "classico",
  "Roseau Blackout": "classico",
  "Satine Blackout": "classico",
  "Stratus BO": "classico",
  "Stria Blackout": "classico",

  "Aura": "gallery",
  "SheerLite": "gallery",
  "Verso": "gallery",
  "Pochoir": "gallery",
  "Hue": "gallery",
  "Chroma": "gallery",
  "Element": "gallery",
  "Element Facade": "gallery",
  "Jacquard": "gallery",
  "Loop": "gallery",
  "Luna": "gallery",
  "Premiere": "gallery",
  "Bistre": "gallery",

  "Standard": "essentials"
};

// Type determination based on opacity
function getType(opacityStr) {
  const percent = parseFloat(opacityStr);

  if (opacityStr === "0%") return "blackout";
  if (percent > 0 && percent < 1) return "translucent"; // <1%
  if (percent >= 1 && percent <= 5) return "sheer";
  if (percent > 5) return "translucent";

  return "sheer"; // default
}

// Parse text field: "FamilyColor Opacity%" -> {family, color, opacity}
function parseTextField(text, sku) {
  // Extract opacity at the end: "5%", "3%", "0%", "<1%", ">10%"
  const opacityMatch = text.match(/([<>]?\d+%|<1%)$/);
  if (!opacityMatch) {
    console.warn(`[WARN] Could not extract opacity from: "${text}" (SKU: ${sku})`);
    return null;
  }

  const opacity = opacityMatch[1];
  let textWithoutOpacity = text.substring(0, text.length - opacity.length).trim();

  // Try to match fabric family (longest-first to avoid partial matches)
  let family = null;
  let color = null;

  for (const fabricFamily of FABRIC_FAMILIES) {
    if (textWithoutOpacity.startsWith(fabricFamily)) {
      family = fabricFamily;
      color = textWithoutOpacity.substring(fabricFamily.length).trim();
      break;
    }
  }

  if (!family) {
    console.warn(`[WARN] Could not identify fabric family from: "${textWithoutOpacity}" (SKU: ${sku})`);
    return null;
  }

  if (!color) {
    console.warn(`[WARN] No color extracted after family "${family}" from: "${text}" (SKU: ${sku})`);
    return null;
  }

  return { family, color, opacity };
}

// Main parser
function parseFabricData(rawData) {
  const fabrics = [];
  const errors = [];

  for (const entry of rawData) {
    const parsed = parseTextField(entry.text, entry.sku);

    if (!parsed) {
      errors.push({ sku: entry.sku, text: entry.text, reason: "Failed to parse text field" });
      continue;
    }

    const { family, color, opacity } = parsed;
    const collection = COLLECTION_MAP[family] || "unknown";
    const type = getType(opacity);

    fabrics.push({
      sku: entry.sku,
      family,
      color,
      opacity,
      type,
      collection,
      thumbnail: entry.img || null
    });
  }

  return { fabrics, errors };
}

// Read stdin
function main() {
  let input = "";

  process.stdin.on("data", chunk => {
    input += chunk;
  });

  process.stdin.on("end", () => {
    try {
      const rawData = JSON.parse(input);
      const { fabrics, errors } = parseFabricData(rawData);

      // Group by collection
      const collections = {
        atelier: { name: "The Atelier Collection", families: [...new Set(fabrics.filter(f => f.collection === "atelier").map(f => f.family))] },
        classico: { name: "The Classico Collection", subcategories: {} },
        gallery: { name: "The Gallery Collection", subcategories: {} },
        essentials: { name: "The Essentials Collection", subcategories: {} }
      };

      // Output structured JSON
      const output = {
        collections,
        fabrics: fabrics.sort((a, b) => a.sku.localeCompare(b.sku)),
        metadata: {
          totalFabrics: fabrics.length,
          totalErrors: errors.length,
          lastUpdated: new Date().toISOString().split("T")[0],
          source: "Lutron Fabric Filter Page"
        }
      };

      if (errors.length > 0) {
        output.metadata.parseErrors = errors;
      }

      console.log(JSON.stringify(output, null, 2));

    } catch (err) {
      console.error("Error parsing input:", err.message);
      process.exit(1);
    }
  });
}

main();
