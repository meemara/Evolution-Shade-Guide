// Fabric Master Repository — processed views for UI consumption
// Source: fabric-master-repository.json (Lutron + Crestron)
// This module is ADDITIVE — fabricColorData.js and fabricData.js remain untouched.

import repoData from './fabric-master-repository.json';

// ─── Lutron helpers ──────────────────────────────────────────────
// Group Lutron fabrics by family, attach per-family metadata
const lutronByFamily = {};
for (const fab of repoData.lutron.fabrics) {
  if (!lutronByFamily[fab.family]) {
    lutronByFamily[fab.family] = {
      family: fab.family,
      canRailroad: fab.canRailroad,
      canSeam: fab.canSeam,
      boltWidthIn: fab.boltWidthIn,
      colors: [],
    };
  }
  lutronByFamily[fab.family].colors.push({
    color: fab.color,
    sku: fab.sku,
    notes: fab.notes || '',
  });
}

export const LUTRON_FAMILIES = Object.values(lutronByFamily);

/** Look up Lutron family metadata (railroadable, seamable, bolt width) */
export function getLutronFamilyMeta(familyName) {
  return lutronByFamily[familyName] || null;
}

// ─── Crestron helpers ────────────────────────────────────────────
// Group Crestron fabrics by fabricName (= family equivalent)
const crestronByFamily = {};
for (const fab of repoData.crestron.fabrics) {
  if (!crestronByFamily[fab.fabricName]) {
    crestronByFamily[fab.fabricName] = {
      fabricName: fab.fabricName,
      manufacturer: fab.manufacturer,
      fabricStyle: fab.fabricStyle,
      openness: fab.openness,
      composition: fab.composition || '',
      canRailroad: fab.canRailroad,
      canSeam: fab.canSeam,
      warrantyYears: fab.warrantyYears,
      colors: [],
    };
  }
  crestronByFamily[fab.fabricName].colors.push({
    color: fab.color,
    colorGroup: fab.colorGroup,
    csfCode: fab.csfCode,
    dualSided: fab.dualSided,
    pvcFree: fab.pvcFree,
    fireRetardant: fab.fireRetardant,
    moldResistant: fab.moldResistant,
    leadFree: fab.leadFree,
    recyclable: fab.recyclable,
    certEnvSafe: fab.certEnvSafe,
    solarReflectance: fab.solarReflectance,
    solarAbsorbance: fab.solarAbsorbance,
    solarTransmittance: fab.solarTransmittance,
    visibleTransmittance: fab.visibleTransmittance,
  });
}

export const CRESTRON_FAMILIES = Object.values(crestronByFamily).sort((a, b) =>
  a.fabricName.localeCompare(b.fabricName)
);

// Crestron filter option sets
export const CRESTRON_MANUFACTURERS = [...new Set(repoData.crestron.fabrics.map(f => f.manufacturer))].sort();
export const CRESTRON_STYLES = [...new Set(repoData.crestron.fabrics.map(f => f.fabricStyle))].filter(s => s !== 'n/a').sort();
export const CRESTRON_OPENNESS = [...new Set(repoData.crestron.fabrics.map(f => f.openness))].filter(s => s !== 'n/a').sort((a, b) => parseInt(a) - parseInt(b));
export const CRESTRON_COLOR_GROUPS = [...new Set(repoData.crestron.fabrics.map(f => f.colorGroup))].sort();

/** Get the opacity category for a Crestron fabric based on openness % */
export function getCrestronOpacityType(openness) {
  if (openness === '0%') return 'blackout';
  if (openness === 'n/a') return 'unknown';
  const pct = parseInt(openness);
  if (pct <= 3) return 'sheer';      // 1-3% = solar screen / sheer
  if (pct <= 5) return 'sheer';      // 4-5% = still sheer territory
  return 'sheer';                     // 7-10% = very open sheer
}

export default repoData;
