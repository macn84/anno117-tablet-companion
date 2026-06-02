/**
 * @module building-tracker
 * @description Building count and notes tracking per island per save file.
 *
 * Data will be stored in localStorage under `buildings:{saveId}` as a JSON array.
 * Each entry records how many of a given building type exist on an island, plus
 * optional free-form notes (e.g. specialist slot occupancy).
 *
 * @todo Phase 3 implementation pending.
 */

/**
 * @typedef {Object} BuildingEntry
 * @property {string} id             - Stable entry ID.
 * @property {string} islandId       - References an island within the same save.
 * @property {string} buildingTypeId - References a building type from game data.
 * @property {number} count          - Number of this building type on the island.
 * @property {string} notes          - Free-form user notes.
 */

export const BuildingTracker = {

  /**
   * Returns all building entries for a save.
   * @param {string} saveId
   * @returns {BuildingEntry[]}
   */
  list(saveId) { return []; },

  /**
   * Returns building entries for a specific island.
   * @param {string} saveId
   * @param {string} islandId
   * @returns {BuildingEntry[]}
   */
  listByIsland(saveId, islandId) { return []; },

  /**
   * Creates a new building entry for an island.
   * @param {string} saveId
   * @param {string} islandId
   * @param {string} buildingTypeId
   * @param {number} count
   * @param {string} [notes='']
   * @returns {BuildingEntry|null}
   */
  add(saveId, islandId, buildingTypeId, count, notes) { return null; },

  /**
   * Shallow-merges `patch` into an existing building entry.
   * @param {string}                      saveId
   * @param {string}                      entryId
   * @param {Partial<BuildingEntry>}       patch
   * @returns {BuildingEntry|null}
   */
  update(saveId, entryId, patch) { return null; },

  /**
   * Permanently removes a building entry.
   * @param {string} saveId
   * @param {string} entryId
   */
  remove(saveId, entryId) {},
};
