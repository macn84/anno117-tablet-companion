/**
 * @module save-manager
 * @description Save file profile CRUD, backed by localStorage.
 *
 * Key layout (all values JSON-serialised):
 *   saves:index       → string[]             ordered list of all save IDs
 *   save:{id}         → SaveProfile
 *   islands:{id}      → Island[]
 *   specialists:{id}  → SpecialistAssignment[]
 *   goods:{id}        → GoodEntry[]
 *   buildings:{id}    → BuildingEntry[]
 *   festivals:{id}    → FestivalState[]
 *
 * Child-data keys follow the pattern `{prefix}{saveId}` so a single prefix
 * scan is enough to wipe all related data when a save is deleted.
 */

/**
 * @typedef {Object} SaveProfile
 * @property {string}   id           - Stable ID (base-36 timestamp + random suffix).
 * @property {string}   name         - User-provided display name.
 * @property {string}   createdAt    - ISO 8601 creation timestamp.
 * @property {string}   updatedAt    - ISO 8601 last-modified timestamp.
 * @property {string[]} activeDlcIds - DLC IDs currently active in this save.
 */

/**
 * @typedef {Object} ExportBundle
 * @property {number}      exportVersion - Schema version; checked on import for forward-compat.
 * @property {string}      exportedAt    - ISO 8601 export timestamp.
 * @property {SaveProfile} profile       - Top-level profile for the save.
 * @property {Object}      childData     - Child datasets keyed by prefix name
 *                                         (e.g. `"islands"`, `"specialists"`).
 */

/** localStorage key prefixes whose data must be erased when a save is deleted. */
const CHILD_KEY_PREFIXES = [
  'islands:',
  'specialists:',
  'goods:',
  'buildings:',
  'festivals:',
];

/**
 * Generates a collision-resistant ID without requiring a crypto dependency.
 * Combines a base-36 timestamp with random entropy sufficient for local use.
 * @returns {string}
 */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function readIndex() {
  try {
    return JSON.parse(localStorage.getItem('saves:index') || '[]');
  } catch {
    return [];
  }
}

function writeIndex(ids) {
  localStorage.setItem('saves:index', JSON.stringify(ids));
}

function readSave(saveId) {
  try {
    return JSON.parse(localStorage.getItem(`save:${saveId}`));
  } catch {
    return null;
  }
}

function writeSave(profile) {
  localStorage.setItem(`save:${profile.id}`, JSON.stringify(profile));
}

function readChildKey(prefix, saveId) {
  try {
    return JSON.parse(localStorage.getItem(`${prefix}${saveId}`) || 'null');
  } catch {
    return null;
  }
}

const SaveManager = {

  /** @type {Array<{id: string}>} Populated by {@link SaveManager.init}; used for DLC validation on import. */
  _dlcRegistry: [],

  /**
   * Seeds the module with the DLC registry so import warnings can reference known DLC IDs.
   * Must be called once at app startup before any import operations.
   * @param {Array<{id: string}>} [dlcRegistry=[]] - All known DLC descriptors.
   */
  init(dlcRegistry = []) {
    this._dlcRegistry = dlcRegistry;
  },

  /**
   * Returns all save profiles sorted by most recently modified (newest first).
   * @returns {SaveProfile[]}
   */
  listAll() {
    const ids = readIndex();
    return ids
      .map(readSave)
      .filter(Boolean)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  /**
   * Creates a new save profile and persists it to storage.
   * @param {string}   name                - Display name for the save.
   * @param {string[]} [activeDlcIds=[]]   - DLC IDs to activate in this save.
   * @returns {SaveProfile}
   */
  create(name, activeDlcIds = []) {
    const now = new Date().toISOString();
    const profile = {
      id: uid(),
      name: name.trim(),
      createdAt: now,
      updatedAt: now,
      activeDlcIds: [...activeDlcIds],
    };
    writeSave(profile);
    const ids = readIndex();
    ids.push(profile.id);
    writeIndex(ids);
    return profile;
  },

  /**
   * Returns a single save profile by ID, or `null` if not found.
   * @param {string} saveId
   * @returns {SaveProfile|null}
   */
  get(saveId) {
    return readSave(saveId);
  },

  /**
   * Shallow-merges `patch` into the save profile and refreshes `updatedAt`.
   * `id` in the patch is ignored — the ID of a save is immutable.
   * @param {string}               saveId
   * @param {Partial<SaveProfile>} patch   - Fields to overwrite.
   * @returns {SaveProfile} The updated profile.
   * @throws {Error} If no save with this ID exists.
   */
  update(saveId, patch) {
    const profile = readSave(saveId);
    if (!profile) throw new Error(`Save not found: ${saveId}`);
    const updated = { ...profile, ...patch, id: saveId, updatedAt: new Date().toISOString() };
    writeSave(updated);
    return updated;
  },

  /**
   * Permanently removes a save and all its child data from localStorage.
   * @param {string} saveId
   */
  delete(saveId) {
    for (const prefix of CHILD_KEY_PREFIXES) {
      localStorage.removeItem(`${prefix}${saveId}`);
    }
    localStorage.removeItem(`save:${saveId}`);
    const ids = readIndex().filter((id) => id !== saveId);
    writeIndex(ids);
  },

  /**
   * Serialises a save (profile + all child data) to a pretty-printed JSON string,
   * suitable for file download or cross-device transfer.
   * @param {string} saveId
   * @returns {string} JSON representation of an {@link ExportBundle}.
   * @throws {Error} If no save with this ID exists.
   */
  exportToJSON(saveId) {
    const profile = readSave(saveId);
    if (!profile) throw new Error(`Save not found: ${saveId}`);

    const bundle = {
      exportVersion: 1,
      exportedAt: new Date().toISOString(),
      profile,
      childData: {},
    };

    for (const prefix of CHILD_KEY_PREFIXES) {
      const data = readChildKey(prefix, saveId);
      if (data !== null) {
        // Strip trailing ':' for the bundle key e.g. 'islands:' → 'islands'
        bundle.childData[prefix.slice(0, -1)] = data;
      }
    }

    return JSON.stringify(bundle, null, 2);
  },

  /**
   * Imports a single save from a JSON string produced by {@link SaveManager.exportToJSON}.
   * Always assigns a fresh ID to prevent collisions with existing saves.
   * Emits a console warning when the bundle references DLC IDs absent from the registry.
   * @param {string} jsonString
   * @returns {SaveProfile} The newly created profile.
   * @throws {Error} If the JSON is malformed or fails structure validation.
   */
  importFromJSON(jsonString) {
    let bundle;
    try {
      bundle = JSON.parse(jsonString);
    } catch {
      throw new Error('Invalid JSON — could not parse save file.');
    }

    if (!bundle.exportVersion || !bundle.profile) {
      throw new Error('Unrecognised save format — missing exportVersion or profile.');
    }

    const { profile, childData = {} } = bundle;

    if (!profile.name || !profile.createdAt) {
      throw new Error('Save profile is missing required fields (name, createdAt).');
    }

    const unknownDlcs = (profile.activeDlcIds || []).filter((id) => {
      if (!SaveManager._dlcRegistry) return false;
      return !SaveManager._dlcRegistry.some((dlc) => dlc.id === id);
    });
    if (unknownDlcs.length > 0) {
      console.warn('Imported save references DLC IDs not in current registry:', unknownDlcs);
    }

    const newId = uid();
    const now = new Date().toISOString();
    const imported = {
      ...profile,
      id: newId,
      name: `${profile.name} (imported)`,
      updatedAt: now,
    };

    writeSave(imported);
    const ids = readIndex();
    ids.push(newId);
    writeIndex(ids);

    // Restore child data under the new ID
    for (const [key, data] of Object.entries(childData)) {
      localStorage.setItem(`${key}:${newId}`, JSON.stringify(data));
    }

    return imported;
  },

  /**
   * Exports every save as a single JSON string — useful as a full device backup.
   * @returns {string}
   */
  exportAllToJSON() {
    const saves = this.listAll();
    const bundles = saves.map((s) => JSON.parse(this.exportToJSON(s.id)));
    return JSON.stringify({ exportVersion: 1, exportedAt: new Date().toISOString(), saves: bundles }, null, 2);
  },

  /**
   * Imports a full backup produced by {@link SaveManager.exportAllToJSON}.
   * Each save receives a fresh ID; duplicate detection is left to the caller.
   * @param {string} jsonString
   * @returns {SaveProfile[]} The newly created profiles, one per save in the backup.
   * @throws {Error} If the JSON is malformed or the saves array is missing.
   */
  importAllFromJSON(jsonString) {
    let data;
    try {
      data = JSON.parse(jsonString);
    } catch {
      throw new Error('Invalid JSON — could not parse backup file.');
    }
    if (!Array.isArray(data.saves)) {
      throw new Error('Unrecognised backup format — missing saves array.');
    }
    return data.saves.map((bundle) => this.importFromJSON(JSON.stringify(bundle)));
  },
};

export { SaveManager };
