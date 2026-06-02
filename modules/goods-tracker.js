/**
 * @module goods-tracker
 * @description Goods trend tracking per island per save file.
 *
 * Data is stored in localStorage under `goods:{saveId}` as a JSON array.
 * An entry is created on first update; an absent entry means "not yet tracked"
 * (displayed as — in the UI).
 */

/**
 * @typedef {Object} GoodEntry
 * @property {string} goodId    - References a good ID from game data.
 * @property {string} islandId  - References an island within the same save.
 * @property {string} trend     - One of the {@link TRENDS} values.
 * @property {string} stockNote - Free-form note, e.g. "~200t" or "critically low".
 * @property {string} updatedAt - ISO 8601 timestamp of the last update.
 */

/**
 * Valid trend values, in UI picker display order.
 * @type {string[]}
 */
export const TRENDS = ['Surplus', 'Stable', 'Deficit', 'not-produced'];

function readAll(saveId) {
  try {
    return JSON.parse(localStorage.getItem(`goods:${saveId}`) || '[]');
  } catch {
    return [];
  }
}

function writeAll(saveId, entries) {
  localStorage.setItem(`goods:${saveId}`, JSON.stringify(entries));
}

export const GoodsTracker = {

  /**
   * Upserts the trend and stock note for a (goodId, islandId) pair.
   * Creates a new entry if none exists; replaces the existing entry otherwise.
   * @param {string} saveId
   * @param {string} goodId
   * @param {string} islandId
   * @param {string} trend        - Must be one of {@link TRENDS}.
   * @param {string} [stockNote='']
   * @returns {GoodEntry}
   */
  setGoodStatus(saveId, goodId, islandId, trend, stockNote = '') {
    const all = readAll(saveId);
    const idx = all.findIndex(e => e.goodId === goodId && e.islandId === islandId);
    const entry = { goodId, islandId, trend, stockNote, updatedAt: new Date().toISOString() };
    if (idx === -1) {
      all.push(entry);
    } else {
      all[idx] = entry;
    }
    writeAll(saveId, all);
    return entry;
  },

  /**
   * Returns all tracked goods entries for a specific island.
   * @param {string} saveId
   * @param {string} islandId
   * @returns {GoodEntry[]}
   */
  getIslandSummary(saveId, islandId) {
    return readAll(saveId).filter(e => e.islandId === islandId);
  },

  /**
   * Returns all tracked goods entries grouped by island ID.
   * @param {string} saveId
   * @returns {Object.<string, GoodEntry[]>} Keys are island IDs.
   */
  getAllSummary(saveId) {
    const result = {};
    for (const entry of readAll(saveId)) {
      if (!result[entry.islandId]) result[entry.islandId] = [];
      result[entry.islandId].push(entry);
    }
    return result;
  },

  /**
   * Returns all entries currently in Deficit — used by the Overview tab.
   * @param {string} saveId
   * @returns {GoodEntry[]}
   */
  getDeficitGoods(saveId) {
    return readAll(saveId).filter(e => e.trend === 'Deficit');
  },
};
