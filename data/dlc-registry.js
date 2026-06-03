// data/dlc-registry.js — registry of available DLC data modules.
//
// To add a new DLC: create a file in data/dlc/ using the template in data/dlc/README.md,
// then import it here and add it to the DLC_REGISTRY array. That is the only code change needed.

import { BASE_GAME } from './base-game.js';
import { DLC_01 } from './dlc/dlc-01-prophecies-of-ash.js';

export const DLC_REGISTRY = [
  { id: 'dlc-01', name: 'Prophecies of Ash', releaseDate: '2026-04-30', data: DLC_01 },
];

/**
 * Merges BASE_GAME data with all active DLCs for a given save.
 * Returns a single object with concatenated arrays for each data category.
 * @param {string[]} [activeDlcIds=[]] - DLC IDs from the save's `activeDlcIds` field.
 * @returns {{ regions: Array, goods: Array, buildingTypes: Array, specialists: Array, festivals: Array, productionChains: Array }}
 */
export function getMergedData(activeDlcIds = []) {
  const active = DLC_REGISTRY
    .filter(d => activeDlcIds.includes(d.id))
    .map(d => d.data);

  return {
    regions:          [...BASE_GAME.regions,          ...active.flatMap(d => d.regions          ?? [])],
    goods:            [...BASE_GAME.goods,            ...active.flatMap(d => d.goods            ?? [])],
    buildingTypes:    [...BASE_GAME.buildingTypes,    ...active.flatMap(d => d.buildingTypes    ?? [])],
    specialists:      [...BASE_GAME.specialists,      ...active.flatMap(d => d.specialists      ?? [])],
    festivals:        [...BASE_GAME.festivals,        ...active.flatMap(d => d.festivals        ?? [])],
    productionChains: [...BASE_GAME.productionChains, ...active.flatMap(d => d.productionChains ?? [])],
  };
}
