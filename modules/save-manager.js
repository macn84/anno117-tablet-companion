// modules/save-manager.js — save file profile CRUD
//
// Storage key convention:  'save:{saveId}'
// Index of all save IDs:   'saves:index'  →  string[]
//
// A save profile object shape:
// {
//   id:           string,   // uuid or timestamp-based
//   name:         string,
//   createdAt:    ISO string,
//   updatedAt:    ISO string,
//   activeDlcIds: string[], // subset of DLC_REGISTRY ids
// }
//
// Island, specialist, goods, and building data are stored under separate keys
// namespaced by saveId, managed by their respective modules.

// Child-data key prefixes that must be cleaned up when a save is deleted.
const CHILD_KEY_PREFIXES = [
  'islands:',
  'specialists:',
  'goods:',
  'buildings:',
  'festivals:',
];

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

  _dlcRegistry: [],

  init(dlcRegistry = []) {
    this._dlcRegistry = dlcRegistry;
  },

  listAll() {
    const ids = readIndex();
    return ids
      .map(readSave)
      .filter(Boolean)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

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

  get(saveId) {
    return readSave(saveId);
  },

  update(saveId, patch) {
    const profile = readSave(saveId);
    if (!profile) throw new Error(`Save not found: ${saveId}`);
    const updated = { ...profile, ...patch, id: saveId, updatedAt: new Date().toISOString() };
    writeSave(updated);
    return updated;
  },

  delete(saveId) {
    // Remove child data first
    for (const prefix of CHILD_KEY_PREFIXES) {
      localStorage.removeItem(`${prefix}${saveId}`);
    }
    // Remove profile
    localStorage.removeItem(`save:${saveId}`);
    // Remove from index
    const ids = readIndex().filter((id) => id !== saveId);
    writeIndex(ids);
  },

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
        // Strip trailing ':' for the bundle key, e.g. 'islands:' → 'islands'
        bundle.childData[prefix.slice(0, -1)] = data;
      }
    }

    return JSON.stringify(bundle, null, 2);
  },

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

    // Warn about inactive DLCs referenced in this save
    const unknownDlcs = (profile.activeDlcIds || []).filter((id) => {
      if (!SaveManager._dlcRegistry) return false;
      return !SaveManager._dlcRegistry.some((dlc) => dlc.id === id);
    });
    if (unknownDlcs.length > 0) {
      console.warn('Imported save references DLC IDs not in current registry:', unknownDlcs);
    }

    // Assign a new ID to avoid collision with any existing save
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

  // Convenience: export every save as one JSON backup file.
  exportAllToJSON() {
    const saves = this.listAll();
    const bundles = saves.map((s) => JSON.parse(this.exportToJSON(s.id)));
    return JSON.stringify({ exportVersion: 1, exportedAt: new Date().toISOString(), saves: bundles }, null, 2);
  },

  // Import a full backup produced by exportAllToJSON. Returns array of imported profiles.
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
