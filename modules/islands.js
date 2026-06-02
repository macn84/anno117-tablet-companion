/**
 * @module islands
 * @description Island CRUD per save file.
 *
 * Islands are stored in localStorage under `islands:{saveId}` as a JSON array.
 * Each island has a stable ID that is referenced by specialist assignments and
 * goods entries — IDs must never be reassigned after creation.
 */

/**
 * @typedef {Object} Island
 * @property {string} id       - Stable ID (base-36 timestamp + random suffix).
 * @property {string} name     - User-provided display name.
 * @property {string} regionId - Region the island belongs to (e.g. `'latium'`, `'albion'`).
 */

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function readIslands(saveId) {
  try {
    return JSON.parse(localStorage.getItem(`islands:${saveId}`) || '[]');
  } catch {
    return [];
  }
}

function writeIslands(saveId, islands) {
  localStorage.setItem(`islands:${saveId}`, JSON.stringify(islands));
}

export const IslandsService = {

  /**
   * Returns all islands for a save, in creation order.
   * @param {string} saveId
   * @returns {Island[]}
   */
  list(saveId) {
    return readIslands(saveId);
  },

  /**
   * Creates and persists a new island.
   * @param {string} saveId
   * @param {string} name     - Display name; leading/trailing whitespace is stripped.
   * @param {string} regionId - Region ID from game data (e.g. `'latium'`).
   * @returns {Island}
   */
  add(saveId, name, regionId) {
    const island = { id: uid(), name: name.trim(), regionId };
    const islands = readIslands(saveId);
    islands.push(island);
    writeIslands(saveId, islands);
    return island;
  },

  /**
   * Renames an island in place.
   * @param {string} saveId
   * @param {string} islandId
   * @param {string} newName  - Leading/trailing whitespace is stripped.
   * @returns {Island} The updated island.
   * @throws {Error} If no island with this ID exists in the save.
   */
  rename(saveId, islandId, newName) {
    const islands = readIslands(saveId);
    const island = islands.find(i => i.id === islandId);
    if (!island) throw new Error(`Island not found: ${islandId}`);
    island.name = newName.trim();
    writeIslands(saveId, islands);
    return island;
  },

  /**
   * Permanently removes an island and its associated goods tracking entries.
   * Specialist assignments are not modified — the caller must ensure they are
   * reassigned or removed first, otherwise this throws to prevent orphaned data.
   * @param {string} saveId
   * @param {string} islandId
   * @throws {Error} If any specialist is still assigned to this island.
   */
  delete(saveId, islandId) {
    let specialists = [];
    try {
      specialists = JSON.parse(localStorage.getItem(`specialists:${saveId}`) || '[]');
    } catch { /* storage read failure treated as empty */ }

    const hasAssignments = specialists.some(s => s.islandId === islandId);
    if (hasAssignments) {
      throw new Error('This island still has specialists assigned to it. Reassign or remove them first.');
    }

    const islands = readIslands(saveId).filter(i => i.id !== islandId);
    writeIslands(saveId, islands);

    // Clean up orphaned goods entries for this island
    try {
      const goods = JSON.parse(localStorage.getItem(`goods:${saveId}`) || '[]');
      const pruned = goods.filter(g => g.islandId !== islandId);
      localStorage.setItem(`goods:${saveId}`, JSON.stringify(pruned));
    } catch { /* storage read failure is non-fatal */ }
  },
};
