/**
 * @module building-tracker
 * @description Building count and notes tracking per island per save file.
 *
 * Data is stored in localStorage under `buildings:{saveId}` as a JSON array.
 * Each entry records how many of a given building type exist on an island, plus
 * optional free-form notes (e.g. specialist slot occupancy).
 */

/**
 * @typedef {Object} BuildingEntry
 * @property {string} id             - Stable entry ID.
 * @property {string} islandId       - References an island within the same save.
 * @property {string} buildingTypeId - References a building type from game data.
 * @property {number} count          - Number of this building type on the island.
 * @property {string} notes          - Free-form user notes.
 */

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function readAll(saveId) {
  try {
    return JSON.parse(localStorage.getItem(`buildings:${saveId}`) || '[]');
  } catch {
    return [];
  }
}

function writeAll(saveId, entries) {
  localStorage.setItem(`buildings:${saveId}`, JSON.stringify(entries));
}

export const BuildingTracker = {

  /**
   * Returns all building entries for a save.
   * @param {string} saveId
   * @returns {BuildingEntry[]}
   */
  list(saveId) {
    return readAll(saveId);
  },

  /**
   * Returns building entries for a specific island.
   * @param {string} saveId
   * @param {string} islandId
   * @returns {BuildingEntry[]}
   */
  listByIsland(saveId, islandId) {
    return readAll(saveId).filter(e => e.islandId === islandId);
  },

  /**
   * Creates a new building entry for an island.
   * @param {string} saveId
   * @param {string} islandId
   * @param {string} buildingTypeId
   * @param {number} [count=0]
   * @param {string} [notes='']
   * @returns {BuildingEntry}
   */
  add(saveId, islandId, buildingTypeId, count = 0, notes = '') {
    const entries = readAll(saveId);
    const entry = { id: uid(), islandId, buildingTypeId, count: Number(count), notes };
    entries.push(entry);
    writeAll(saveId, entries);
    return entry;
  },

  /**
   * Shallow-merges `patch` into an existing building entry.
   * @param {string}                 saveId
   * @param {string}                 entryId
   * @param {Partial<BuildingEntry>} patch
   * @returns {BuildingEntry|null} The updated entry, or `null` if not found.
   */
  update(saveId, entryId, patch) {
    const entries = readAll(saveId);
    const idx = entries.findIndex(e => e.id === entryId);
    if (idx === -1) return null;
    if ('count' in patch) patch.count = Number(patch.count);
    entries[idx] = { ...entries[idx], ...patch };
    writeAll(saveId, entries);
    return entries[idx];
  },

  /**
   * Permanently removes a building entry.
   * @param {string} saveId
   * @param {string} entryId
   */
  remove(saveId, entryId) {
    const entries = readAll(saveId).filter(e => e.id !== entryId);
    writeAll(saveId, entries);
  },

  /**
   * Removes all building entries for a given island.
   * Called when an island is deleted to prevent orphaned data.
   * @param {string} saveId
   * @param {string} islandId
   */
  removeByIsland(saveId, islandId) {
    const entries = readAll(saveId).filter(e => e.islandId !== islandId);
    writeAll(saveId, entries);
  },
};
