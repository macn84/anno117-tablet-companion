/**
 * @module production-ref
 * @description Read-only production chain reference viewer.
 *
 * Merges BASE_GAME.productionChains with chains from active DLCs for a given save.
 * No user data is written by this module — it is a lookup tool only.
 * Chain ratios in the data files assume 100% building efficiency with no
 * specialist buffs applied unless noted otherwise in the data file.
 *
 * @todo Phase 3 implementation pending.
 */

export const ProductionRef = {

  /**
   * Returns all production chains that output the specified good.
   * @param {string} goodId      - Good ID to look up.
   * @param {Object} mergedData  - Merged game data object (base + active DLCs).
   * @returns {Array}
   */
  getChainsForGood(goodId, mergedData) { return []; },

  /**
   * Returns every production chain in the merged dataset.
   * @param {Object} mergedData - Merged game data object (base + active DLCs).
   * @returns {Array}
   */
  getAllChains(mergedData) { return []; },
};
