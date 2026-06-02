/**
 * @module specialist-tracker
 * @description Specialist assignment CRUD per save file.
 *
 * Data is stored in localStorage under `specialists:{saveId}` as a JSON array.
 * Each entry links a known game specialist — or a user-created custom one — to
 * an island and building slot within a specific save.
 */

/**
 * @typedef {Object} SpecialistAssignment
 * @property {string}      id           - Stable assignment ID.
 * @property {string|null} specialistId - References a specialist from game data;
 *                                        `null` when `isCustom` is `true`.
 * @property {string}      customName   - Display name for custom entries or overrides.
 * @property {boolean}     isCustom     - `true` when the user added a specialist not
 *                                        present in the data files.
 * @property {string}      [rarity]     - Required when `isCustom` is `true`; ignored
 *                                        otherwise (resolved from game data instead).
 * @property {string}      [category]   - Required when `isCustom` is `true`.
 * @property {string|null} islandId     - Island the specialist is assigned to;
 *                                        `null` means unassigned.
 * @property {string}      structure    - Building slot description, e.g. "Trade Union".
 * @property {string}      notes        - Free-form user notes.
 */

/**
 * @typedef {Object} FilterCriteria
 * @property {string}  [rarity]     - Restrict to a specific rarity tier.
 * @property {string}  [category]   - Restrict to a specific category.
 * @property {string}  [islandId]   - Restrict to a specific island.
 * @property {boolean} [unassigned] - When `true`, return only entries with no island set.
 */

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function readAll(saveId) {
  try {
    return JSON.parse(localStorage.getItem(`specialists:${saveId}`) || '[]');
  } catch {
    return [];
  }
}

function writeAll(saveId, assignments) {
  localStorage.setItem(`specialists:${saveId}`, JSON.stringify(assignments));
}

export const SpecialistTracker = {

  /**
   * Returns all specialist assignments for a save, in insertion order.
   * @param {string} saveId
   * @returns {SpecialistAssignment[]}
   */
  list(saveId) {
    return readAll(saveId);
  },

  /**
   * Creates a new specialist assignment and appends it to the save.
   * @param {string}                          saveId
   * @param {Omit<SpecialistAssignment, 'id'>} fields
   * @returns {SpecialistAssignment} The created assignment with a generated `id`.
   */
  add(saveId, fields) {
    const assignment = { id: uid(), ...fields };
    const all = readAll(saveId);
    all.push(assignment);
    writeAll(saveId, all);
    return assignment;
  },

  /**
   * Shallow-merges `patch` into an existing assignment.
   * @param {string}                          saveId
   * @param {string}                          assignmentId
   * @param {Partial<SpecialistAssignment>}   patch
   * @returns {SpecialistAssignment} The updated assignment.
   * @throws {Error} If no assignment with this ID exists in the save.
   */
  update(saveId, assignmentId, patch) {
    const all = readAll(saveId);
    const idx = all.findIndex(a => a.id === assignmentId);
    if (idx === -1) throw new Error(`Assignment not found: ${assignmentId}`);
    all[idx] = { ...all[idx], ...patch };
    writeAll(saveId, all);
    return all[idx];
  },

  /**
   * Permanently removes an assignment from the save.
   * @param {string} saveId
   * @param {string} assignmentId
   */
  remove(saveId, assignmentId) {
    const all = readAll(saveId).filter(a => a.id !== assignmentId);
    writeAll(saveId, all);
  },

  /**
   * Returns assignments matching all supplied criteria (AND logic).
   * Omitted criteria keys are ignored.
   * @param {string}         saveId
   * @param {FilterCriteria} [criteria={}]
   * @returns {SpecialistAssignment[]}
   */
  filter(saveId, criteria = {}) {
    let results = readAll(saveId);
    if (criteria.rarity)     results = results.filter(a => a.rarity === criteria.rarity);
    if (criteria.category)   results = results.filter(a => a.category === criteria.category);
    if (criteria.islandId)   results = results.filter(a => a.islandId === criteria.islandId);
    if (criteria.unassigned) results = results.filter(a => !a.islandId);
    return results;
  },

  /**
   * Returns the count of assignments that have no island set.
   * Used by the Overview tab to surface the unassigned specialist count.
   * @param {string} saveId
   * @returns {number}
   */
  getUnassignedCount(saveId) {
    return readAll(saveId).filter(a => !a.islandId).length;
  },
};
