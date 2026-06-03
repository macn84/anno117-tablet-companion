/**
 * @module festival-tracker
 * @description Festival active/inactive state and per-save timing notes.
 *
 * Data is stored in localStorage under `festivals:{saveId}` as a JSON array.
 * Reference data (effect, trigger conditions) comes from BASE_GAME.festivals and
 * active DLC data — this module stores only user-specific state per save.
 */

/**
 * @typedef {Object} FestivalState
 * @property {string}  festivalId - References a festival ID from game data.
 * @property {boolean} active     - Whether the festival is currently running.
 * @property {string}  note       - Free-form timing or reminder note.
 */

function readAll(saveId) {
  try {
    return JSON.parse(localStorage.getItem(`festivals:${saveId}`) || '[]');
  } catch {
    return [];
  }
}

function writeAll(saveId, entries) {
  localStorage.setItem(`festivals:${saveId}`, JSON.stringify(entries));
}

export const FestivalTracker = {

  /**
   * Returns all festival states for a save.
   * @param {string} saveId
   * @returns {FestivalState[]}
   */
  list(saveId) {
    return readAll(saveId);
  },

  /**
   * Sets the active/inactive state for a festival.
   * Creates a new state entry if one does not yet exist.
   * @param {string}  saveId
   * @param {string}  festivalId
   * @param {boolean} active
   * @returns {FestivalState}
   */
  toggle(saveId, festivalId, active) {
    const entries = readAll(saveId);
    const idx = entries.findIndex(e => e.festivalId === festivalId);
    if (idx === -1) {
      const entry = { festivalId, active: Boolean(active), note: '' };
      entries.push(entry);
      writeAll(saveId, entries);
      return entry;
    }
    entries[idx] = { ...entries[idx], active: Boolean(active) };
    writeAll(saveId, entries);
    return entries[idx];
  },

  /**
   * Updates the timing note for a festival.
   * Creates a new state entry if one does not yet exist.
   * @param {string} saveId
   * @param {string} festivalId
   * @param {string} note
   * @returns {FestivalState}
   */
  setNote(saveId, festivalId, note) {
    const entries = readAll(saveId);
    const idx = entries.findIndex(e => e.festivalId === festivalId);
    if (idx === -1) {
      const entry = { festivalId, active: false, note: String(note) };
      entries.push(entry);
      writeAll(saveId, entries);
      return entry;
    }
    entries[idx] = { ...entries[idx], note: String(note) };
    writeAll(saveId, entries);
    return entries[idx];
  },

  /**
   * Returns all festivals currently marked as active.
   * @param {string} saveId
   * @returns {FestivalState[]}
   */
  getActive(saveId) {
    return readAll(saveId).filter(e => e.active);
  },
};
