/**
 * Type definitions for Lutron fabric data
 */

export type FabricType = 'sheer' | 'translucent' | 'blackout' | 'solar_screen';
export type CollectionId = 'atelier' | 'classico' | 'gallery' | 'essentials';

export interface Fabric {
  sku: string;
  family: string;
  color: string;
  opacity: string;
  type: FabricType;
  collection: CollectionId;
  thumbnail?: string;
}

export interface CollectionInfo {
  name: string;
  families?: string[];
  subcategories?: Record<string, string[]>;
}

export interface FabricData {
  collections: Record<CollectionId, CollectionInfo>;
  fabrics: Fabric[];
  metadata: {
    totalFabrics: number;
    lastUpdated: string;
    source: string;
    totalErrors?: number;
    parseErrors?: Array<{
      sku: string;
      text: string;
      reason: string;
    }>;
  };
}

/**
 * Filter options for fabric search
 */
export interface FabricFilter {
  collections?: CollectionId[];
  families?: string[];
  types?: FabricType[];
  colors?: string[];
  opacityRange?: {
    min: number;
    max: number;
  };
}

/**
 * Grouped fabric data for UI rendering
 */
export interface GroupedFabrics {
  byFamily: Record<string, Fabric[]>;
  byType: Record<FabricType, Fabric[]>;
  byCollection: Record<CollectionId, Fabric[]>;
  byColor: Record<string, Fabric[]>;
}

/**
 * Helper function to parse opacity string to percentage
 */
export function parseOpacity(opacityStr: string): number | null {
  const match = opacityStr.match(/([<>]?\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Helper function to group fabrics
 */
export function groupFabrics(fabrics: Fabric[]): GroupedFabrics {
  const grouped: GroupedFabrics = {
    byFamily: {},
    byType: { sheer: [], translucent: [], blackout: [], solar_screen: [] },
    byCollection: { atelier: [], classico: [], gallery: [], essentials: [] },
    byColor: {}
  };

  for (const fabric of fabrics) {
    // By family
    if (!grouped.byFamily[fabric.family]) {
      grouped.byFamily[fabric.family] = [];
    }
    grouped.byFamily[fabric.family].push(fabric);

    // By type
    grouped.byType[fabric.type].push(fabric);

    // By collection
    grouped.byCollection[fabric.collection].push(fabric);

    // By color
    if (!grouped.byColor[fabric.color]) {
      grouped.byColor[fabric.color] = [];
    }
    grouped.byColor[fabric.color].push(fabric);
  }

  return grouped;
}

/**
 * Helper function to filter fabrics
 */
export function filterFabrics(fabrics: Fabric[], filter: FabricFilter): Fabric[] {
  return fabrics.filter(fabric => {
    if (filter.collections && !filter.collections.includes(fabric.collection)) {
      return false;
    }
    if (filter.families && !filter.families.includes(fabric.family)) {
      return false;
    }
    if (filter.types && !filter.types.includes(fabric.type)) {
      return false;
    }
    if (filter.colors && !filter.colors.includes(fabric.color)) {
      return false;
    }
    if (filter.opacityRange) {
      const opacity = parseOpacity(fabric.opacity);
      if (opacity !== null) {
        if (opacity < filter.opacityRange.min || opacity > filter.opacityRange.max) {
          return false;
        }
      }
    }
    return true;
  });
}
