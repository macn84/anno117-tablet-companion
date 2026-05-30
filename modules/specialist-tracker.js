// js/specialists.js — specialist CRUD and filtering per save
//
// Storage key: 'specialists:{saveId}'  →  Specialist[]
//
// Specialist shape:
// {
//   id:             string,
//   name:           string,
//   rarity:         'Common' | 'Rare' | 'Epic' | 'Legendary',
//   categoryId:     string,   // references specialistCategories in base-game or DLC
//   islandId:       string | null,
//   assignmentType: string,   // references assignmentTypes (e.g. 'trade_union')
// }

const RARITIES = ['Common', 'Rare', 'Epic', 'Legendary'];

const SpecialistsService = {

  // TODO: implement list(saveId) → Specialist[]
  list(saveId) {},

  // TODO: implement add(saveId, fields) → Specialist
  add(saveId, fields) {},

  // TODO: implement update(saveId, specialistId, patch)
  update(saveId, specialistId, patch) {},

  // TODO: implement delete(saveId, specialistId)
  delete(saveId, specialistId) {},

  // TODO: implement filter(saveId, criteria) → Specialist[]
  // criteria: { rarity?, categoryId?, islandId?, assignmentType?, assigned? }
  // 'assigned' = islandId is not null AND assignmentType !== 'unassigned'
  filter(saveId, criteria) {},
};
