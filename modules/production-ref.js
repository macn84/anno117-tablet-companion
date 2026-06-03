/**
 * @module production-ref
 * @description Read-only production chain reference viewer.
 * Merges BASE_GAME.productionChains with chains from active DLCs.
 * No user data is written — this is a lookup tool only.
 */

export const ProductionRef = {

  /**
   * Returns all production chains that output the specified good.
   * @param {string} goodId
   * @param {Object} mergedData - Result of getMergedData().
   * @returns {Array}
   */
  getChainsForGood(goodId, mergedData) {
    return (mergedData.productionChains ?? []).filter(c => c.outputGoodId === goodId);
  },

  /**
   * Returns every production chain in the merged dataset.
   * @param {Object} mergedData
   * @returns {Array}
   */
  getAllChains(mergedData) {
    return mergedData.productionChains ?? [];
  },

  /**
   * Returns all good IDs that have at least one production chain.
   * Useful for populating the output-good selector in the reference view.
   * @param {Object} mergedData
   * @returns {string[]} Unique outputGoodId values, sorted by the good's name if goods are provided.
   */
  getProducibleGoodIds(mergedData) {
    const ids = [...new Set((mergedData.productionChains ?? []).map(c => c.outputGoodId))];
    return ids;
  },
};
