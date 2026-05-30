// js/buildings.js — building tracker per save
//
// Storage key: 'buildings:{saveId}'  →  BuildingEntry[]
//
// BuildingEntry shape:
// {
//   id:             string,
//   islandId:       string,
//   buildingTypeId: string,  // references buildingTypes in base-game or active DLC
//   label:          string,  // optional user-given name (e.g. "North Harbour")
// }
//
// Primarily used to know "which specialist-holding structures exist on each island"
// so the specialist assignment picker can offer them as targets.

const BuildingsService = {

  // TODO: implement list(saveId) → BuildingEntry[]
  list(saveId) {},

  // TODO: implement listByIsland(saveId, islandId) → BuildingEntry[]
  listByIsland(saveId, islandId) {},

  // TODO: implement add(saveId, islandId, buildingTypeId, label) → BuildingEntry
  add(saveId, islandId, buildingTypeId, label) {},

  // TODO: implement update(saveId, buildingId, patch)
  update(saveId, buildingId, patch) {},

  // TODO: implement delete(saveId, buildingId)
  // Should also clear specialist assignments pointing to this building.
  delete(saveId, buildingId) {},
};
