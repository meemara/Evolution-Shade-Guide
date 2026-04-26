/**
 * Lutron Fabric Family Color Scraper
 *
 * Run this in the browser console on any page in lutronfabrics.com domain.
 * It will fetch all fabric family pages, parse the color data, and output a JS module.
 *
 * Usage:
 * 1. Go to https://www.lutronfabrics.com (any page on that domain)
 * 2. Open DevTools console (F12 or Cmd+Option+I)
 * 3. Copy-paste this entire script
 * 4. Run it and wait for completion
 * 5. Copy the output from the console log
 * 6. Paste into fabricData.js
 */

(async () => {
  // All fabric families with their representative SKUs
  const families = [
    { name: "Aura", sku: "RF-AUR3-7" },
    { name: "Basketweave", sku: "PV61-48-1" },
    { name: "Basketweave 27", sku: "SP92-27-3" },
    { name: "Basketweave 4000 Eco", sku: "SU61-4E-3" },
    { name: "Basketweave 90", sku: "SP14-90-3" },
    { name: "Basketweave 90 C", sku: "90AF-3-OP" },
    { name: "Basketweave Eco2", sku: "SI2-PG3-5" },
    { name: "Bistre", sku: "RF-BISTR-3" },
    { name: "Blackout Screen", sku: "RF-BOSC-CG" },
    { name: "Bouclé", sku: "RF-BOU-MO" },
    { name: "Bouclé Blackout", sku: "RF-BOU0-MO" },
    { name: "E Screen", sku: "S0207-E-1" },
    { name: "E Screen THEIA", sku: "S0202ET-A" },
    { name: "E Screen KOOLBLACK", sku: "S0M22-KB-3" },
    { name: "Element", sku: "RF-LMNT-CH" },
    { name: "Element Facade", sku: "RF-LMNTF-G" },
    { name: "Encore Blackout", sku: "RF-7001-WH" },
    { name: "GreenScreen Evolve", sku: "QS-0035-3" },
    { name: "Harbor", sku: "RF-HAR-PE" },
    { name: "Harbor Blackout", sku: "RF-HAR0-AN" },
    { name: "Highland Blackout", sku: "RF-HIG0-DG" },
    { name: "Hue", sku: "RF-HUE-5" },
    { name: "Jacquard", sku: "SD60-5K-10" },
    { name: "Loop", sku: "RF-LOOP-AL" },
    { name: "Luna", sku: "RF-LUNA-10" },
    { name: "Luna Blackout", sku: "RF-LUNA-22" },
    { name: "Luna Blackout FR", sku: "RF-LFR0-CH" },
    { name: "M Screen", sku: "S3030-M-5" },
    { name: "Matrice", sku: "RF-MAT-GP" },
    { name: "Matrice Blackout", sku: "RF-MAT0-CD" },
    { name: "Mirage", sku: "RF-MIR-HE" },
    { name: "Mirage Blackout", sku: "RF-MIR0-ME" },
    { name: "Monomer", sku: "RF-MNMR-2" },
    { name: "Mosaic", sku: "RF-MSC-6" },
    { name: "Mosaic Blackout", sku: "RF-MSC0-6" },
    { name: "Natural Screen", sku: "RF-NSCRN-B" },
    { name: "OmniaScreen Silver", sku: "RF-OMNSN-6" },
    { name: "Palette", sku: "RF-PALT-13" },
    { name: "Palette Blackout", sku: "RF-PALT-1" },
    { name: "Pochoir", sku: "RF-POC-OC" },
    { name: "Pochoir Blackout", sku: "RF-POC0-OC" },
    { name: "Premiere", sku: "BM-623-0" },
    { name: "Roseau", sku: "RF-ROS-DO" },
    { name: "Roseau Blackout", sku: "RF-ROS0-PY" },
    { name: "Satine", sku: "RF-SAT-SI" },
    { name: "Satine Blackout", sku: "RF-SAT0-SI" },
    { name: "SheerLite", sku: "SHL-002-5" },
    { name: "Sheerweave 4900", sku: "Q07-49-3" },
    { name: "Sheerweave 8000", sku: "RF-8000-1" },
    { name: "Standard", sku: "BN-903-0" },
    { name: "Stratus", sku: "RF-STS-CH" },
    { name: "Stratus Blackout", sku: "RF-STS0-OY" },
    { name: "Stria", sku: "RF-STR-CG" },
    { name: "Stria Blackout", sku: "RF-STR0-MS" },
    { name: "T Screen", sku: "SM387-T-1" },
    { name: "T Screen KOOLBLACK", sku: "TS2131K-5" },
    { name: "Tela", sku: "RF-TEL-BL" },
    { name: "Tela Blackout", sku: "RF-TEL0-AS" },
    { name: "Tre Blackout", sku: "RF-TREB-MS" },
    { name: "Tre Light Filtering", sku: "RF-TREL-IN" },
    { name: "Tre Sheer", sku: "RF-TRES-AS" },
    { name: "Verso", sku: "RF-VRSO-CL" },
    { name: "Vista", sku: "RF-VIS-SA" },
  ];

  // Convert family name to URL slug
  function toSlug(name) {
    return name
      .toLowerCase()
      .normalize("NFD") // Remove accents
      .replace(/[̀-ͯ]/g, "") // Strip diacritics
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, ""); // Remove non-word chars except hyphen
  }

  // Extract color data from HTML using DOMParser
  function parseColorData(html, familyName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Look for color cards - try multiple selector patterns
    const selectors = [
      '[class*="Card"]',
      '[class*="card"]',
      '[class*="item"]',
      '[class*="color"]',
      '[class*="Color"]',
      'article',
      'div[role="button"]'
    ];

    const colors = [];
    const seenColors = new Set();

    for (const selector of selectors) {
      const cards = doc.querySelectorAll(selector);

      cards.forEach(card => {
        const img = card.querySelector('img');
        if (!img || !img.alt) return;

        const alt = img.alt.trim();

        // Match SKUs that start with RF- or uppercase alphanumeric
        if (!alt.match(/^(RF-|[A-Z0-9])/)) return;

        const text = card.textContent.trim();
        // Look for pattern: "ColorName, SKU" or similar
        const match = text.match(/^([^,\n]+?),\s*([A-Z0-9][\w\-]*)/);

        if (match) {
          const colorName = match[1].trim();
          const colorKey = `${familyName}:${colorName}`;

          if (!seenColors.has(colorKey)) {
            seenColors.add(colorKey);
            colors.push({
              color: colorName,
              sku: alt
            });
          }
        }
      });

      // If we found colors, stop trying other selectors
      if (colors.length > 0) break;
    }

    return colors;
  }

  // Main scraping loop
  const results = {};
  const errors = [];

  console.log(`Starting scrape of ${families.length} fabric families...`);
  console.log("=".repeat(60));

  for (let i = 0; i < families.length; i++) {
    const family = families[i];
    const slug = toSlug(family.name);
    const url = `https://www.lutronfabrics.com/us/en/fabrics/family/${slug}/${family.sku}`;

    try {
      console.log(`[${i + 1}/${families.length}] Fetching ${family.name}...`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      const colors = parseColorData(html, family.name);

      if (colors.length > 0) {
        results[family.name] = colors;
        console.log(`  ✓ Found ${colors.length} colors`);
      } else {
        console.warn(`  ⚠ No colors found (check selector patterns)`);
        results[family.name] = [];
      }

      // Small delay to avoid hammering the server
      await new Promise(r => setTimeout(r, 300));

    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
      errors.push({ family: family.name, error: err.message });
      results[family.name] = null;
    }
  }

  console.log("=".repeat(60));
  console.log("SCRAPING COMPLETE");
  console.log(`Completed: ${Object.values(results).filter(v => v !== null).length}/${families.length}`);

  if (errors.length > 0) {
    console.warn(`\nErrors (${errors.length}):`);
    errors.forEach(e => console.warn(`  - ${e.family}: ${e.error}`));
  }

  // Generate the module export
  const moduleExport = `export const FABRIC_COLOR_DATA = ${JSON.stringify(results, null, 2)};`;

  console.log("\n" + "=".repeat(60));
  console.log("OUTPUT: Copy everything between the lines below\n");
  console.log(moduleExport);
  console.log("\n" + "=".repeat(60));

  // Also make it available as a global for easy copy
  window.FABRIC_COLOR_DATA = results;
  window.FABRIC_MODULE_EXPORT = moduleExport;

  console.log("\nData also available as:");
  console.log("  window.FABRIC_COLOR_DATA (object)");
  console.log("  window.FABRIC_MODULE_EXPORT (export statement)\n");
  console.log("To copy the module export, run:");
  console.log("  copy(window.FABRIC_MODULE_EXPORT)");

})();
