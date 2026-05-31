// data/base-game.js
// Source-of-truth for all base Anno 117: Pax Romana content.
// Add DLC content in data/dlc-registry.js, NOT here.
//
// Shape mirrors dlc-registry.js entries so the app can merge them uniformly.

const BASE_GAME = {
  id: 'base',
  name: 'Anno 117: Pax Romana — Base Game',

  regions: [
    // TODO: populate base regions (e.g. Latium, Albion)
    // { id: 'latium', name: 'Latium' },
    // { id: 'albion', name: 'Albion' },
  ],

  goods: [
    // TODO: populate full base-game goods list
    // Each entry: { id, name, category, regionId? }
    // Categories to cover: food, clothing, luxury, construction, military, etc.
  ],

  buildingTypes: [
    // TODO: populate base building types that can hold specialists
    // Each entry: { id, name, slots }  (slots = max specialists)
    // Structures per spec: Trade Union, Harbour, Ship, Storage, + others
  ],

  specialistCategories: [
    // Defined in spec — do not remove without checking specialists-view.js
    { id: 'economy',    name: 'Economy' },
    { id: 'military',   name: 'Military' },
    { id: 'culture',    name: 'Culture' },
    { id: 'religion',   name: 'Religion' },
    { id: 'research',   name: 'Research' },
    { id: 'seafaring',  name: 'Seafaring' },
    { id: 'nature',     name: 'Nature' },
    { id: 'finance',    name: 'Finance' },
  ],

  // Location types a specialist can be assigned to (shared across all content)
  assignmentTypes: [
    { id: 'trade_union', name: 'Trade Union' },
    { id: 'harbour',     name: 'Harbour' },
    { id: 'ship',        name: 'Ship' },
    { id: 'storage',     name: 'Storage' },
    { id: 'unassigned',  name: 'Unassigned' },
    // TODO: add any additional base-game assignment types
  ],
};
