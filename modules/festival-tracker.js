/**
 * @module festival-tracker
 * @description Festival active/inactive state and per-save timing notes.
 *
 * Data will be stored in localStorage under `festivals:{saveId}` as a JSON array.
 * Reference data (effect, trigger conditions) comes from BASE_GAME.festivals and
 * active DLC data — this module stores only user-specific state per save.
 *
 * @todo Phase 3 implementation pending.
 */

/**
 * @typedef {Object} FestivalState
 * @property {string}  festivalId - References a festival ID from game data.
 * @property {boolean} active     - Whether the festival is currently running.
 * @property {string}  note       - Free-form timing or reminder note.
 */

export const FestivalTracker = {

  /**
   * Returns all festival states for a save.
   * @param {string} saveId
   * @returns {FestivalState[]}
   */
  list(saveId) { return []; },

  /**
   * Sets the active/inactive state for a festival.
   * Creates a new state entry if one does not yet exist.
   * @param {string}  saveId
   * @param {string}  festivalId
   * @param {boolean} active
   * @returns {FestivalState|null}
   */
  toggle(saveId, festivalId, active) { return null; },

  /**
   * Updates the timing note for a festival.
   * @param {string} saveId
   * @param {string} festivalId
   * @param {string} note
   * @returns {FestivalState|null}
   */
  setNote(saveId, festivalId, note) { return null; },

  /**
   * Returns all festivals currently marked as active.
   * @param {string} saveId
   * @returns {FestivalState[]}
   */
  getActive(saveId) { return []; },
};
