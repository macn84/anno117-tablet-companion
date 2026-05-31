// js/islands.js — island CRUD per save
//
// Storage key: 'islands:{saveId}'  →  Island[]
//
// Island shape:
// {
//   id:       string,
//   name:     string,
//   regionId: string,  // references a region from base-game or active DLC
// }

const IslandsService = {

  // TODO: implement list(saveId) → Island[]
  list(saveId) {},

  // TODO: implement add(saveId, name, regionId) → Island
  add(saveId, name, regionId) {},

  // TODO: implement rename(saveId, islandId, newName)
  rename(saveId, islandId, newName) {},

  // TODO: implement delete(saveId, islandId)
  // Also clears any goods/building data keyed to this island within the save.
  delete(saveId, islandId) {},
};
