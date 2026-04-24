# Fabric Data Files

## Overview

This directory contains Lutron fabric configuration data for the Evolution Shade Guide application.

### Files

- **fabricData.json** - Processed fabric catalog with collection organization, parsed SKUs, colors, opacities, and type classification
- **parseFabricData.js** - Node.js parser script that converts raw Lutron data into structured JSON

## fabricData.json Structure

```json
{
  "collections": {
    "atelier": {
      "name": "The Atelier Collection",
      "families": ["Canvas", "Mystic", "Pure", "Shadow"]
    },
    "classico": {
      "name": "The Classico Collection",
      "subcategories": { ... }
    },
    "gallery": { ... },
    "essentials": { ... }
  },
  "fabrics": [
    {
      "sku": "RF-AUR5-1",
      "family": "Aura",
      "color": "Parchment",
      "opacity": "5%",
      "type": "sheer|translucent|blackout",
      "collection": "atelier|classico|gallery|essentials",
      "thumbnail": "https://assets.lutron.com/..."
    }
  ],
  "metadata": {
    "totalFabrics": 106,
    "lastUpdated": "2026-04-24",
    "source": "Lutron Fabric Filter Page"
  }
}
```

## Type Classification

Fabrics are classified by light transmission percentage:

- **blackout** (0%) - Complete light blockage
- **sheer** (1-5%) - Minimal light reduction, high transparency
- **translucent** (>5%) - Moderate light reduction
- **solar_screen** - Variant classification for solar control fabrics

## Collections

### The Atelier Collection
Premium, curated fabrics: Canvas, Mystic, Pure, Shadow

### The Classico Collection
Grouped by subcategories:
- **Solar Screens**: E Screen, M Screen, T Screen variants with/without KOOLBLACK, GreenScreen Evolve
- **Solar Screen**: Sheerweave 4900, Basketweave variants (27, 4000 Eco, 90, 90C, Eco2)
- **Blackouts**: Blackout Screen, Boucle Blackout, various BO (Blackout) families

### The Gallery Collection
Organized by light transmission:
- **Sheer**: Aura, SheerLite, Verso, Pochoir, Hue
- **Translucent**: Chroma, Element, Element Facade, Jacquard, Loop, Luna, Premiere, Bistre
- **Blackout**: Multiple blackout options

### The Essentials Collection
Basic, affordable options: Standard (sheer), Stratus BO (translucent), Shadow (blackout)

## Using parseFabricData.js

To parse raw Lutron data into the structured format:

```bash
node parseFabricData.js < raw-data.json > fabricData.json
```

**Input format** (raw-data.json):
```json
[
  {
    "text": "AuraParchment 5%",
    "sku": "RF-AUR5-1",
    "img": "https://assets.lutron.com/a/images/fabrics/fabric_thumbnail_image_rf-aur5-1_1.jpg"
  },
  ...
]
```

The parser:
1. Extracts opacity percentage from the end of the text field
2. Matches fabric family name (longest-first, case-sensitive)
3. Extracts color as the remaining text
4. Determines fabric type based on opacity
5. Assigns collection based on family name
6. Outputs structured JSON with error logging

**Error handling**: Non-parseable entries are logged in `metadata.parseErrors` array.

## Fabric Families

All known families (sorted by length for parsing):

- Basketweave 4000 Eco, Element Facade, E Screen with KOOLBLACK, T Screen with KOOLBLACK
- GreenScreen Evolve, Luna Blackout FR, Luna Blackout, Blackout Screen, Boucle Blackout
- Basketweave 90C, Basketweave 90, Basketweave Eco2, Basketweave 27
- Matrice Blackout, Mosaic Blackout, Palette Blackout, Roseau Blackout, Satine Blackout, Stria Blackout
- Harbor BO, Highland BO, Mirage BO, Stratus BO, Sheerweave 4900
- Element, SheerLite, Shadow, Mystic, Canvas, Jacquard, Chroma
- Bistre, Aura, E Screen, M Screen, T Screen, Verso, Pochoir, Hue, Loop, Luna, Premiere, Pure, Standard

## Next Steps

1. **Populate with actual data**: Replace the example entries in fabricData.json with complete Lutron catalog data
2. **Add thumbnail images**: Ensure all `thumbnail` URLs point to valid Lutron asset URLs
3. **Validate parsing**: Run parseFabricData.js against real raw data and verify accuracy
4. **Update metadata**: Correct totalFabrics count when all 863 entries are processed
