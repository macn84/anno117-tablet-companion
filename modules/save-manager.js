// js/saves.js — save file profile CRUD
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

const SavesService = {

  // TODO: implement listAll() → SaveProfile[]
  listAll() {},

  // TODO: implement create(name, activeDlcIds) → SaveProfile
  create(name, activeDlcIds) {},

  // TODO: implement get(saveId) → SaveProfile | null
  get(saveId) {},

  // TODO: implement update(saveId, patch) — merges patch into existing profile
  update(saveId, patch) {},

  // TODO: implement delete(saveId)
  // Must also delete all child data:  islands, specialists, goods, buildings
  // keyed under this saveId. Enumerate with StorageService.keys() and filter.
  delete(saveId) {},

  // TODO: implement exportToJSON(saveId) → JSON string
  // Bundles the save profile + all child data into a single portable object.
  exportToJSON(saveId) {},

  // TODO: implement importFromJSON(jsonString) → SaveProfile
  // Validates shape before writing. Assigns a new saveId to avoid collisions.
  importFromJSON(jsonString) {},
};
