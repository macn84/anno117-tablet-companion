// data/base-game.js — All base Anno 117: Pax Romana game content.
//
// Last verified: 2026-06-01
// Primary source: anno.land/en/anno-117-datenbanken/
// Additional sources: anno-companion.com/wiki/117/, community guides
//
// Completeness:
//   Production chains: ~100% (all tiers, Latium + Albion)
//   Goods: ~95%
//   Buildings: ~80% (production buildings included; ornamental/civic incomplete)
//   Specialists: ~281 entries — anno.land lists 264 verified; 382+ total exist in game.
//                The remainder are likely unlockable or DLC items not yet confirmed.
//   Festivals: Amphitheatre events confirmed. Hippodrome is an Aug 2026 DLC (not base game).
//
// Uncertain entries are marked // UNVERIFIED — cross-check against anno.land before relying on them.
// DLC content belongs in /data/dlc/, not here.

export const BASE_GAME = {

  // ─── REGIONS ────────────────────────────────────────────────────────────────

  regions: [
    { id: 'latium', name: 'Latium' },
    { id: 'albion', name: 'Albion' },
  ],

  // ─── GOODS ──────────────────────────────────────────────────────────────────
  // Categories: Raw Material, Agricultural, Intermediate, Food, Clothing,
  //             Construction, Military, Luxury, Trade Good
  // regions: array of region IDs where this good can be produced
  // (trade goods can be obtained in both via import even if only produced in one)

  goods: [

    // — RAW MATERIALS (extracted directly from terrain) —
    { id: 'wood',           name: 'Wood',           category: 'Raw Material',  regions: ['latium', 'albion'] },
    { id: 'clay',           name: 'Clay',           category: 'Raw Material',  regions: ['latium'] },
    { id: 'mud',            name: 'Mud',             category: 'Raw Material',  regions: ['albion'] },
    { id: 'reed',           name: 'Reed',            category: 'Raw Material',  regions: ['albion'] },
    { id: 'limestone',      name: 'Limestone',       category: 'Raw Material',  regions: ['latium'] }, // UNVERIFIED: Albion availability
    { id: 'quartz_sand',    name: 'Quartz Sand',     category: 'Raw Material',  regions: ['latium', 'albion'] }, // UNVERIFIED: Albion native or import
    { id: 'iron_ore',       name: 'Iron Ore',        category: 'Raw Material',  regions: ['latium', 'albion'] },
    { id: 'copper_ore',     name: 'Copper Ore',      category: 'Raw Material',  regions: ['albion'] },
    { id: 'tin_ore',        name: 'Tin Ore',         category: 'Raw Material',  regions: ['albion'] },
    { id: 'silver_ore',     name: 'Silver Ore',      category: 'Raw Material',  regions: ['latium', 'albion'] },
    { id: 'gold_ore',       name: 'Gold Ore',        category: 'Raw Material',  regions: ['latium'] },
    { id: 'raw_marble',     name: 'Raw Marble',      category: 'Raw Material',  regions: ['latium'] },
    { id: 'granite_blocks', name: 'Granite Blocks',  category: 'Raw Material',  regions: ['albion'] },
    { id: 'minerals',       name: 'Minerals',        category: 'Raw Material',  regions: ['latium'] }, // UNVERIFIED: exact source building
    { id: 'resin',          name: 'Resin',           category: 'Raw Material',  regions: ['latium', 'albion'] },
    { id: 'purple_snails',  name: 'Purple Snails',   category: 'Raw Material',  regions: ['latium'] },
    { id: 'scallop_shells', name: 'Scallop Shells',  category: 'Raw Material',  regions: ['albion'] },
    { id: 'salt',           name: 'Salt',            category: 'Raw Material',  regions: ['latium'] }, // Salt Pans

    // — AGRICULTURAL GOODS (farms/plantations requiring fertility) —
    { id: 'oats',           name: 'Oats',            category: 'Agricultural',  regions: ['latium'] },
    { id: 'hemp',           name: 'Hemp',            category: 'Agricultural',  regions: ['latium', 'albion'] },
    { id: 'wheat',          name: 'Wheat',           category: 'Agricultural',  regions: ['latium', 'albion'] },
    { id: 'flax',           name: 'Flax',            category: 'Agricultural',  regions: ['latium', 'albion'] },
    { id: 'grapes',         name: 'Grapes',          category: 'Agricultural',  regions: ['latium'] }, // Albion at 50% via import
    { id: 'olives',         name: 'Olives',          category: 'Agricultural',  regions: ['latium'] },
    { id: 'lavender',       name: 'Lavender',        category: 'Agricultural',  regions: ['latium', 'albion'] }, // "Lavendula"
    { id: 'sandarac_wood',  name: 'Sandarac Wood',   category: 'Agricultural',  regions: ['latium'] },
    { id: 'weld_plants',    name: 'Weld Plants',     category: 'Agricultural',  regions: ['albion'] }, // source of Celtic dye
    { id: 'dye_plants',     name: 'Dye Plants',      category: 'Agricultural',  regions: ['albion'] }, // UNVERIFIED: same as weld or separate
    { id: 'barley',         name: 'Barley',          category: 'Agricultural',  regions: ['albion'] },
    { id: 'herbs',          name: 'Herbs',           category: 'Agricultural',  regions: ['albion'] },
    { id: 'saltcabbage',    name: 'Saltcabbage',     category: 'Agricultural',  regions: ['albion'] }, // "Salted Greens"

    // — LIVESTOCK —
    { id: 'sheep',          name: 'Sheep',           category: 'Agricultural',  regions: ['latium', 'albion'] },
    { id: 'pigs',           name: 'Pigs',            category: 'Agricultural',  regions: ['latium', 'albion'] },
    { id: 'oxen',           name: 'Oxen',            category: 'Agricultural',  regions: ['latium', 'albion'] },
    { id: 'horses',         name: 'Horses',          category: 'Agricultural',  regions: ['albion'] },
    { id: 'ponies',         name: 'Ponies',          category: 'Agricultural',  regions: ['albion'] }, // UNVERIFIED: separate from horses?
    { id: 'beaver',         name: 'Beaver',          category: 'Agricultural',  regions: ['albion'] },
    { id: 'small_birds',    name: 'Small Birds',     category: 'Agricultural',  regions: ['latium', 'albion'] }, // UNVERIFIED: Albion availability

    // — FISH/SEAFOOD (raw) —
    { id: 'mackerel',       name: 'Mackerel',        category: 'Raw Material',  regions: ['latium'] },
    { id: 'sardines',       name: 'Sardines',        category: 'Raw Material',  regions: ['latium'] },
    { id: 'mussels',        name: 'Mussels',         category: 'Raw Material',  regions: ['albion'] },
    { id: 'eels',           name: 'Eels',            category: 'Raw Material',  regions: ['albion'] },
    { id: 'oysters',        name: 'Oysters',         category: 'Raw Material',  regions: ['latium'] },
    { id: 'sturgeon',       name: 'Sturgeon',        category: 'Raw Material',  regions: ['latium'] },

    // — INTERMEDIATE GOODS —
    { id: 'boards',         name: 'Boards',          category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'coal',           name: 'Coal',            category: 'Intermediate',  regions: ['latium', 'albion'] }, // Charcoal Burner
    { id: 'iron',           name: 'Iron',            category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'bronze',         name: 'Bronze',          category: 'Intermediate',  regions: ['albion'] },
    { id: 'silver',         name: 'Silver',          category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'gold',           name: 'Gold',            category: 'Intermediate',  regions: ['latium'] },
    { id: 'leather',        name: 'Leather',         category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'lard',           name: 'Lard',            category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'flour',          name: 'Flour',           category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'malt',           name: 'Malt',            category: 'Intermediate',  regions: ['albion'] },
    { id: 'tyrian_purple',  name: 'Tyrian Purple',   category: 'Intermediate',  regions: ['latium'] },
    { id: 'celtic_green',   name: 'Celtic Green',    category: 'Intermediate',  regions: ['albion'] },
    { id: 'fabrics',        name: 'Fabrics',         category: 'Intermediate',  regions: ['latium'] }, // Loom output (Toga chain)
    { id: 'strings',        name: 'Strings',         category: 'Intermediate',  regions: ['latium'] }, // Lyre chain (sheep → strings)
    { id: 'honeycomb',      name: 'Honeycomb',       category: 'Intermediate',  regions: ['latium', 'albion'] }, // Beehive
    { id: 'glass',          name: 'Glass',           category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'decorated_wood', name: 'Decorated Wood',  category: 'Intermediate',  regions: ['latium'] },
    { id: 'cushions',       name: 'Cushions',        category: 'Intermediate',  regions: ['latium'] },
    { id: 'frame',          name: 'Frame',           category: 'Intermediate',  regions: ['latium', 'albion'] }, // Chariot chain
    { id: 'hairnet',        name: 'Hair Net',        category: 'Intermediate',  regions: ['albion'] }, // Wig chain
    { id: 'roe',            name: 'Roe',             category: 'Intermediate',  regions: ['latium'] }, // Caviar chain
    { id: 'tongues',        name: 'Tongues',         category: 'Intermediate',  regions: ['latium', 'albion'] }, // Bird Tongues chain
    { id: 'aspic',          name: 'Aspic',           category: 'Intermediate',  regions: ['latium', 'albion'] },
    { id: 'brine',          name: 'Brine',           category: 'Intermediate',  regions: ['albion'] }, // Fur Hat chain

    // — CONSTRUCTION MATERIALS —
    { id: 'tiles',          name: 'Tiles',           category: 'Construction',  regions: ['latium', 'albion'] },
    { id: 'concrete',       name: 'Concrete',        category: 'Construction',  regions: ['latium', 'albion'] },
    { id: 'marble',         name: 'Marble',          category: 'Construction',  regions: ['latium'] },
    { id: 'granite',        name: 'Granite',         category: 'Construction',  regions: ['albion'] },
    { id: 'wattle_daub',    name: 'Wattle & Daub',   category: 'Construction',  regions: ['albion'] },
    { id: 'mosaics',        name: 'Mosaics',         category: 'Construction',  regions: ['latium'] },
    { id: 'wickerwork',     name: 'Wickerwork',      category: 'Construction',  regions: ['albion'] }, // UNVERIFIED: construction vs luxury

    // — MILITARY GOODS —
    { id: 'weapons',        name: 'Weapons',         category: 'Military',      regions: ['latium', 'albion'] },
    { id: 'armour',         name: 'Armour',          category: 'Military',      regions: ['latium', 'albion'] },
    { id: 'sails',          name: 'Sails',           category: 'Military',      regions: ['latium', 'albion'] },
    { id: 'ropes',          name: 'Ropes',           category: 'Military',      regions: ['latium', 'albion'] },

    // — FOOD (consumer goods, final tier) —
    { id: 'porridge',       name: 'Porridge',        category: 'Food',          regions: ['latium'] },
    { id: 'bread',          name: 'Bread',           category: 'Food',          regions: ['latium', 'albion'] },
    { id: 'garum',          name: 'Garum',           category: 'Food',          regions: ['latium'] },
    { id: 'olive_oil',      name: 'Olive Oil',       category: 'Food',          regions: ['latium'] }, // Albion via import
    { id: 'cheese',         name: 'Cheese',          category: 'Food',          regions: ['latium', 'albion'] },
    { id: 'soap',           name: 'Soap',            category: 'Food',          regions: ['latium', 'albion'] }, // Hygiene need
    { id: 'sausages',       name: 'Sausages',        category: 'Food',          regions: ['albion'] },
    { id: 'roast_beef',     name: 'Roast Beef',      category: 'Food',          regions: ['albion'] },
    { id: 'oysters_caviar', name: 'Oysters with Caviar', category: 'Food',     regions: ['latium'] },
    { id: 'bird_tongues',   name: 'Bird Tongues in Aspic', category: 'Food',   regions: ['latium', 'albion'] },

    // — CLOTHING (consumer goods) —
    { id: 'tunics',         name: 'Tunics',          category: 'Clothing',      regions: ['latium', 'albion'] },
    { id: 'pilei',          name: 'Pilei',           category: 'Clothing',      regions: ['latium'] }, // hats
    { id: 'sandals',        name: 'Sandals',         category: 'Clothing',      regions: ['latium'] },
    { id: 'reed_shoes',     name: 'Reed Shoes',      category: 'Clothing',      regions: ['albion'] },
    { id: 'trousers',       name: 'Trousers',        category: 'Clothing',      regions: ['albion'] },
    { id: 'togas',          name: 'Togas',           category: 'Clothing',      regions: ['latium', 'albion'] }, // Albion via import
    { id: 'cloaks',         name: 'Cloaks',          category: 'Clothing',      regions: ['albion'] },    // UNVERIFIED: separate from Capes?
    { id: 'capes',          name: 'Capes',           category: 'Clothing',      regions: ['latium', 'albion'] }, // "Birrus" capes
    { id: 'fur_hats',       name: 'Fur Hats',        category: 'Clothing',      regions: ['albion'] },
    { id: 'wigs',           name: 'Wigs',            category: 'Clothing',      regions: ['albion'] },

    // — LUXURY GOODS (consumer goods) —
    { id: 'wine',           name: 'Wine',            category: 'Luxury',        regions: ['latium', 'albion'] }, // Albion at lower efficiency
    { id: 'writing_tablets', name: 'Writing Tablets', category: 'Luxury',      regions: ['latium'] },
    { id: 'amphorae',       name: 'Amphorae',        category: 'Luxury',        regions: ['latium', 'albion'] },
    { id: 'fine_glass',     name: 'Fine Glass',      category: 'Luxury',        regions: ['latium', 'albion'] },
    { id: 'beer',           name: 'Beer',            category: 'Luxury',        regions: ['albion'] },
    { id: 'drinking_horns', name: 'Drinking Horns',  category: 'Luxury',        regions: ['albion'] },
    { id: 'torcs',          name: 'Torcs',           category: 'Luxury',        regions: ['albion'] },
    { id: 'fibulae',        name: 'Fibulae',         category: 'Luxury',        regions: ['latium', 'albion'] },
    { id: 'brooches',       name: 'Brooches',        category: 'Luxury',        regions: ['albion'] }, // UNVERIFIED: same as Fibulae?
    { id: 'necklaces',      name: 'Necklaces',       category: 'Luxury',        regions: ['latium'] },
    { id: 'hand_mirrors',   name: 'Hand Mirrors',    category: 'Luxury',        regions: ['latium', 'albion'] },
    { id: 'lyres',          name: 'Lyres',           category: 'Luxury',        regions: ['latium'] },
    { id: 'loungers',       name: 'Loungers',        category: 'Luxury',        regions: ['latium'] }, // "Recliners"
    { id: 'chariots',       name: 'Chariots',        category: 'Luxury',        regions: ['latium', 'albion'] },
    { id: 'ceremonial_shields', name: 'Ceremonial Shields', category: 'Luxury', regions: ['albion'] },
  ],

  // ─── BUILDING TYPES ─────────────────────────────────────────────────────────
  // specialistSlots: max number of specialists this building can hold
  // canHoldSpecialist: true if any slots > 0
  // category: Production | Civic | Military | Religious | Storage | Trade | Ornamental | Monument
  // regions: which regions this building appears in

  buildingTypes: [

    // — SPECIALIST-HOLDING STRUCTURES —
    { id: 'governors_villa',  name: "Governor's Villa",  category: 'Civic',       regions: ['latium', 'albion'], specialistSlots: 5,  canHoldSpecialist: true,  notes: 'Slots increase with Prestige progression' },
    { id: 'officium',         name: 'Officium',          category: 'Civic',       regions: ['latium', 'albion'], specialistSlots: 2,  canHoldSpecialist: true,  notes: 'Area-of-effect buff building; 3 slots with late Discovery Tree unlock' },
    { id: 'ship',             name: 'Ship (Captain Slot)', category: 'Trade',     regions: ['latium', 'albion'], specialistSlots: 1,  canHoldSpecialist: true,  notes: 'Each ship has one captain slot for seafaring specialists' },

    // — LATIUM PRODUCTION — Tier 1 (Liberti)
    { id: 'lumberjack',       name: 'Lumberjack',        category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sawmill',          name: 'Sawmill',           category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sardine_hut',      name: 'Sardine Hut',       category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'oat_farm',         name: 'Oat Farm',          category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'porridge_stall',   name: 'Porridge Stall',    category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'hemp_farm',        name: 'Hemp Farm',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'spinner',          name: 'Spinner',           category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sheep_farm',       name: 'Sheep Farm',        category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'pileus_hatter',    name: 'Pileus Hatter',     category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },

    // Tier 2 (Plebeians / Latium)
    { id: 'charcoal_burner',  name: 'Charcoal Burner',   category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'clay_pit',         name: 'Clay Pit',          category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'tiler',            name: 'Tiler',             category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'ropemaker',        name: 'Ropemaker',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'iron_mine',        name: 'Iron Mine',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'furnace',          name: 'Furnace',           category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'weaponsmith',      name: 'Weaponsmith',       category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'pig_farm',         name: 'Pig Farm',          category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'salt_pans',        name: 'Salt Pans',         category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'tannery',          name: 'Tannery',           category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'armorsmith',       name: 'Armorsmith',        category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sailmaker',        name: 'Sailmaker',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'wheat_farm',       name: 'Wheat Farm',        category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'mill',             name: 'Mill',              category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'donkey_mill',      name: 'Donkey Mill',       category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'bakery',           name: 'Bakery',            category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'mackerel_hut',     name: "Mackerel Hut",      category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'garum_workshop',   name: 'Garum Workshop',    category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sandal_maker',     name: 'Sandal Maker',      category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'tallow_boiler',    name: 'Tallow Boiler',     category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'lavendula_grower', name: 'Lavendula Grower',  category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'soapmaker',        name: 'Soapmaker',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'resin_tapper',     name: 'Resin Tapper',      category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'potter',           name: 'Potter',            category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'olive_grower',     name: 'Olive Grower',      category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'olive_press',      name: 'Olive Press',       category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },

    // Tier 3 (Equites / Latium)
    { id: 'limestone_quarry', name: 'Limestone Quarry',  category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sand_refinery',    name: 'Sand Refinery',     category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'concrete_mixer',   name: 'Concrete Mixer',    category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'marble_quarry',    name: 'Marble Quarry',     category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'marble_mason',     name: 'Marble Mason',      category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'vineyard',         name: 'Vineyard',          category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false, notes: 'Albion at reduced efficiency' },
    { id: 'beehive',          name: 'Beehive',           category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'winemaker',        name: 'Winemaker',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'ox_farm',          name: 'Ox Farm',           category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'dairy',            name: 'Dairy',             category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'flax_farm',        name: 'Flax Farm',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'snail_breeder',    name: 'Snail Breeder',     category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'weaver',           name: 'Weaver',            category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'dye_workshop',     name: 'Dye Workshop',      category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'loom',             name: 'Loom',              category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'silver_mine',      name: 'Silver Mine',       category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'silversmith',      name: 'Silversmith',       category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'fibulaium',        name: 'Fibulaium',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sandarak_grove',   name: 'Sandarak Grove',    category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'tabulus',          name: 'Tabulus',           category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Writing tablet production' },
    { id: 'mineral_quarry',   name: 'Mineral Quarry',    category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'mineral_crusher',  name: 'Mineral Crusher',   category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'glass_melter',     name: 'Glass Melter',      category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'glassblower',      name: 'Glassblower',       category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },

    // Tier 4 (Patricians / Latium)
    { id: 'mosaic_maker',     name: 'Mosaic Maker',      category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sturgeon_farm',    name: 'Sturgeon Farm',     category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'fish_weir',        name: 'Fish Weir',         category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'oyster_farm',      name: 'Oyster Farm',       category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sea_gourmet',      name: 'Sea Gourmet',       category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'bird_catcher',     name: 'Bird Catcher',      category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'tongue_puller',    name: 'Tongue Puller',     category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'delium',           name: 'Delium',            category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false, notes: 'Aspic finishing building' },
    { id: 'gold_mine',        name: 'Gold Mine',         category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'goldsmith',        name: 'Goldsmith',         category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'jeweller',         name: 'Jeweller',          category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'copper_mine',      name: 'Copper Mine',       category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'greenhand',        name: 'Greenhand',         category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false, notes: 'Weld/dye processing for Capes' },
    { id: 'birrus_tailor',    name: 'Birrus Tailor',     category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'upholsterer',      name: 'Upholsterer',       category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'recliner_maker',   name: 'Recliner Maker',    category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'comb_shell_collector', name: 'Comb Shell Collector', category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'narcissium',       name: 'Narcissium',        category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false, notes: 'Hand mirror finishing' },
    { id: 'stringmaker',      name: 'Stringmaker',       category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'gilder',           name: 'Gilder',            category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'lyre_maker',       name: 'Lyre Maker',        category: 'Production', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'horse_catcher',    name: 'Horse Catcher',     category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'frame_builder',    name: 'Frame Builder',     category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'wagon_maker',      name: 'Wagon Maker',       category: 'Production', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'reed_collector',   name: 'Reed Collector',    category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },

    // — ALBION-SPECIFIC PRODUCTION —
    { id: 'mussel_collector', name: 'Mussel Collector',  category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'eel_fisher',       name: 'Eel Fisher',        category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'shoe_weaver',      name: 'Shoe Weaver',       category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'mud_dryer',        name: 'Mud Dryer',         category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'salsicium',        name: 'Salsicium',         category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Sausage production' },
    { id: 'herb_garden',      name: 'Herb Garden',       category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'barley_farm',      name: 'Barley Farm',       category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'malt_house',       name: 'Malt House',        category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'brewery',          name: 'Brewery',           category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'hosier',           name: 'Hosier',            category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Trousers production' },
    { id: 'wire_twister',     name: 'Wire Twister',      category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Torcs production' },
    { id: 'tin_mine',         name: 'Tin Mine',          category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'horner',           name: 'Horner',            category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Drinking Horns' },
    { id: 'bronze_smelter',   name: 'Bronze Smelter',    category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'shield_maker',     name: 'Shield Maker',      category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'saltcabbage_collector', name: 'Saltcabbage Collector', category: 'Production', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'saltcabbage_burner',    name: 'Saltcabbage Burner',    category: 'Production', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'beaver_trapper',   name: 'Beaver Trapper',    category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'beaver_hatter',    name: 'Beaver Hatter',     category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'earth_oven',       name: 'Earth Oven',        category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Roast Beef' },
    { id: 'hairnet_weaver',   name: 'Hairnet Weaver',    category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'horse_breeder',    name: 'Horse Breeder',     category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'wig_weaver',       name: 'Wig Weaver',        category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'granite_quarry',   name: 'Granite Quarry',    category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'granite_cutter',   name: 'Granite Cutter',    category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'trouser_maker',    name: 'Trouser Maker',     category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false },
    { id: 'artisan_house',    name: 'Artisan House',     category: 'Production', regions: ['albion'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Wickerwork' },

    // — CIVIC / RESIDENTIAL —
    { id: 'liberti_residence',   name: 'Liberti Residence',   category: 'Civic', regions: ['latium'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'plebeian_residence',  name: 'Plebeian Residence',  category: 'Civic', regions: ['latium'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'equites_residence',   name: 'Equites Residence',   category: 'Civic', regions: ['latium'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'patrician_residence', name: 'Patrician Residence', category: 'Civic', regions: ['latium'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'wader_residence',     name: 'Wader Residence',     category: 'Civic', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'smith_residence',     name: 'Smith Residence',     category: 'Civic', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'alderman_residence',  name: 'Alderman Residence',  category: 'Civic', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'mercator_residence',  name: 'Mercator Residence',  category: 'Civic', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false }, // UNVERIFIED: tier name
    { id: 'market',              name: 'Market',              category: 'Civic', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'tavern',              name: 'Tavern',              category: 'Civic', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'sanctuary',           name: 'Sanctuary',           category: 'Religious', regions: ['latium'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'fanum',               name: 'Fanum',               category: 'Religious', regions: ['albion'], specialistSlots: 0, canHoldSpecialist: false },

    // — MILITARY —
    { id: 'tower',               name: 'Tower',               category: 'Military', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'recruitment_building', name: 'Recruitment Building', category: 'Military', regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'repair_crane',        name: 'Repair Crane',        category: 'Trade',    regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false },
    { id: 'vigiles',             name: 'Vigiles',             category: 'Civic',    regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Fire safety building' },
    { id: 'medici',              name: 'Medici',              category: 'Civic',    regions: ['latium', 'albion'], specialistSlots: 0, canHoldSpecialist: false }, // UNVERIFIED: exact name/function

    // — MONUMENT —
    { id: 'amphitheatre',        name: 'Amphitheatre',        category: 'Monument', regions: ['latium'],           specialistSlots: 0, canHoldSpecialist: false, notes: 'Hosts Gladiator Games and Naumachia events; requires Patricians unlocked' },
  ],

  // ─── SPECIALIST CATEGORIES ──────────────────────────────────────────────────
  // Used for filtering in the UI

  specialistCategories: [
    { id: 'economy',   name: 'Economy' },
    { id: 'military',  name: 'Military' },
    { id: 'culture',   name: 'Culture' },
    { id: 'religion',  name: 'Religion' },
    { id: 'research',  name: 'Research' },
    { id: 'seafaring', name: 'Seafaring' },
    { id: 'nature',    name: 'Nature' },
    { id: 'finance',   name: 'Finance' },
    { id: 'civic',     name: 'Civic' },
  ],

  // ─── ASSIGNMENT TYPES ───────────────────────────────────────────────────────
  // Where a specialist can be physically placed in-game

  assignmentTypes: [
    { id: 'governors_villa', name: "Governor's Villa" },
    { id: 'officium',        name: 'Officium' },
    { id: 'ship',            name: 'Ship (Captain Slot)' },
  ],

  // ─── SPECIALISTS ────────────────────────────────────────────────────────────
  // rarity: Common | Rare | Epic | Unique | Legendary
  // category: matches specialistCategories ids
  // validSlots: array of assignmentTypes ids
  // effect: in-game description of the specialist's bonus
  // Note: 382+ specialists exist in base game. ~60 confirmed here.
  //       Flag uncertain entries // UNVERIFIED. Users can add custom specialists in-app.

  specialists: [

    // — CONFIRMED COMMON SPECIALISTS —
    { id: 'actuary',            name: 'Actuary',            rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+0.6 income area effect to residences in range' },
    { id: 'physician',          name: 'Physician',           rarity: 'Common', category: 'nature',    validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+0.6 health to residences in range' },
    { id: 'sartorist',          name: 'Sartorist',           rarity: 'Common', category: 'research',  validSlots: ['governors_villa', 'officium'], regions: ['latium'],           effect: '+1 knowledge from Pileus, if supplied, to residences in range' },
    { id: 'preacher',           name: 'Preacher',            rarity: 'Common', category: 'religion',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+0.6 belief to residences in range' },
    { id: 'reangler',           name: 'Reangler',            rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium'],           effect: '-25% needed workforce for Fishing Huts and Mackerel Huts in range' },
    { id: 'eelhunter',          name: 'Eelhunter',           rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: 'Eel Grabber in range increases belief area effect by +0.5' },
    { id: 'upholder',           name: 'Upholder',            rarity: 'Common', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+15% hitpoints to towers in range' },
    { id: 'enlister',           name: 'Enlister',            rarity: 'Common', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+50% troop recruitment speed to Recruitment Building in range' },
    { id: 'twiner',             name: 'Twiner',              rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+10% productivity to Ropemaker and Ropes supply chain' },
    { id: 'seamster',           name: 'Seamster',            rarity: 'Common', category: 'finance',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+10% productivity to Tunics supply chain' },
    { id: 'quencher',           name: 'Quencher',            rarity: 'Common', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium'],           effect: '+0.6 fire safety to residences in range' },
    { id: 'shellpicker',        name: 'Shellpicker',         rarity: 'Common', category: 'culture',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+10% productivity to Cockles supply chain' },
    { id: 'filleter',           name: 'Filleter',            rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+1 population from Eels, if supplied, to residences' },
    { id: 'busy_sprout',        name: 'Busy Sprout',         rarity: 'Common', category: 'culture',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+10% productivity to Beer supply chain' },
    { id: 'essentialist',       name: 'Essentialist',        rarity: 'Common', category: 'religion',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '-25% workforce needed, -50% upkeep cost to Extractors in range' },
    { id: 'constructivist',     name: 'Constructivist',      rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '-25% workforce needed, -50% upkeep cost to Refineries in range' },
    { id: 'renaturer',          name: 'Renaturer',           rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '-25% workforce needed; Herb Garden and Barley Farm run on Smith workforce instead of Wader' },
    { id: 'measurer',           name: 'Measurer',            rarity: 'Common', category: 'finance',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '-25% workforce needed, -50% upkeep cost for Clothiers in range' },
    { id: 'mudlark',            name: 'Mudlark',             rarity: 'Common', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+10% productivity to Eel supply chain in range' },
    { id: 'rockhopper',         name: 'Rockhopper',          rarity: 'Common', category: 'nature',    validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+0.5 health area effect to Cockle Piker in range' },
    { id: 'reedbroguer',        name: 'Reedbroguer',         rarity: 'Common', category: 'finance',   validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+1 income from Reed Shoes to residences in range' },
    { id: 'plaiter',            name: 'Plaiter',             rarity: 'Common', category: 'nature',    validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+10% productivity to Reed Shoes supply chain' },
    { id: 'obtorquist',         name: 'Obtorquist',          rarity: 'Common', category: 'civic',     validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+10% productivity for Torcs supply chain' },
    { id: 'unburdener',         name: 'Unburdener',          rarity: 'Common', category: 'finance',   validSlots: ['ship'],                        regions: ['latium', 'albion'], effect: '-5% trade prices, -25% cargo weight slowdown' },

    // — CONFIRMED RARE SPECIALISTS —
    { id: 'adept_troughtender',   name: 'Adept Troughtender',   rarity: 'Rare', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '-50% water consumption to all Plantations in range' },
    { id: 'laconic_swordsmith',   name: 'Laconic Swordsmith',   rarity: 'Rare', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+20% production to weapon production buildings in range' },
    { id: 'threefold_defender',   name: 'Threefold Defender',   rarity: 'Rare', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+15% attack range, +35% hitpoints, +50% self-repair speed to towers in range' },
    { id: 'judicious_rigger',     name: 'Judicious Rigger',     rarity: 'Rare', category: 'seafaring', validSlots: ['ship'],                        regions: ['latium', 'albion'], effect: '+25% hitpoints, -40% cargo weight slowdown' },
    { id: 'deep_water_dredger',   name: 'Deep-Water Dredger',   rarity: 'Rare', category: 'seafaring', validSlots: ['ship'],                        regions: ['latium', 'albion'], effect: '+500 Denarii for sunk ships, +10% scorpion attack range' },
    { id: 'whataboutist_watis',   name: 'Whataboutist Watis',   rarity: 'Rare', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+1.2 knowledge to residences in range' },
    { id: 'stalwar_harbourward',  name: 'Stalwar Harbourward',  rarity: 'Rare', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+25% ship repair speed, +1 simultaneous repairs, +25% hitpoints to repair crane' },
    { id: 'traditionalist_torquatus', name: 'Traditionalist Torquatus', rarity: 'Rare', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['albion'],      effect: '+2 Prestige from Torcs to residences in range' },
    { id: 'confident_vigilo',     name: 'Confident Vigilo',     rarity: 'Rare', category: 'military',  validSlots: ['governors_villa', 'officium'], regions: ['latium'],           effect: '+1 fire safety area effect for Vigiles' },
    { id: 'even_keepler',         name: 'Even Keepler',         rarity: 'Rare', category: 'seafaring', validSlots: ['ship'],                        regions: ['latium', 'albion'], effect: '+35% hitpoints, +100 self-repair speed' },
    { id: 'hestian_culinarian',   name: 'Hestian Culinarian',   rarity: 'Rare', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '-33% workforce needed, -66% upkeep cost to kitchens in range' },
    { id: 'kibisisist',           name: 'Kibisisist',           rarity: 'Rare', category: 'finance',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+1 income area effect to Tannery' },
    { id: 'brisk_boater',         name: 'Brisk Boater',         rarity: 'Rare', category: 'seafaring', validSlots: ['ship'],                        regions: ['latium', 'albion'], effect: '+10% movement speed, +20% province transfer speed' },
    { id: 'cursory_bursarius',    name: 'Cursory Bursarius',    rarity: 'Rare', category: 'finance',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+1.2 income to residences in range' },
    { id: 'porcine_muckraker',    name: 'Porcine Muckraker',    rarity: 'Rare', category: 'finance',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+1 income area effect to Pig Farms' },
    { id: 'baker_augcrusta',      name: 'Baker Augcrusta',      rarity: 'Rare', category: 'economy',   validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+2 population from Bread, if supplied, to residences in range' },
    { id: 'trusty_trouserer',     name: 'Trusty Trouserer',     rarity: 'Rare', category: 'nature',    validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+1 health area effect for Hosier in range' },
    { id: 'cassiteridean_caster', name: 'Cassiteridean Caster', rarity: 'Rare', category: 'research',  validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+1 knowledge area effect for Tin Mine in range' },

    // — CONFIRMED EPIC SPECIALISTS —
    { id: 'brutus_julius_lupus',  name: 'Brutus Julius Lupus, Pollux of Polities', rarity: 'Epic', category: 'economy',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+20% workforce from residents for residences in range' },
    { id: 'gaius_julius_lupus',   name: 'Gaius Julius Lupus, Castor of Fortunes',  rarity: 'Epic', category: 'economy',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+1.5x income area effect for markets in range' },
    { id: 'uassoro',              name: 'Uassoro, Neck-Deep Wader',                rarity: 'Epic', category: 'economy',  validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+25% workforce from residents to Wader Residence in range' },
    { id: 'philon_baitylologist', name: 'Philon, Baitylologist',                   rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+1.5 belief area effect for Granite Cutter' },
    { id: 'gygaea_of_megaria',    name: 'Gygaea of Megaria, Eupalianian Reservist', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '-50% water consumption, additional 1t every 8 cycles to mines in range' },
    { id: 'sophocles_of_athens',  name: 'Sophocles of Athens, Agraphian Dogmatist', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+2 knowledge from Tavern, if supplied, for residences in range' },
    { id: 'cermaid_mac_ealadha',  name: 'Cermaid Mac Ealadha, Dagda\'s Goodman',   rarity: 'Epic', category: 'civic',    validSlots: ['governors_villa', 'officium'], regions: ['albion'],           effect: '+1 prestige area of effect, +1 available patrols, -10% response time to Medici in range' },

    // — CONFIRMED UNIQUE SPECIALISTS —
    { id: 'merypath',             name: 'Merypath, Gromatic Surveyor',             rarity: 'Unique', category: 'seafaring', validSlots: ['ship'], regions: ['latium', 'albion'], effect: '+100% discovery radius, +25% hitpoints, +15% movement speed, +45 favorable wind angle' },
    { id: 'actorius_maximinus',   name: 'Actorius Maximinus, Nummularius Nonpareil', rarity: 'Unique', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+2.5 income area effect, -75% upkeep cost for markets' },
    { id: 'troucotouto',          name: 'Troucotouto, Subjugating Subiudex',       rarity: 'Unique', category: 'economy',  validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+30% workforce from residents, -1 happiness for Liberti and Wader Residences' },
    { id: 'judoc_daidalos',       name: 'Judoc Daidalos, of the Myrtle Tower',     rarity: 'Unique', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+20% attack range, -80% workforce needed, -50% upkeep cost, +50% hitpoints to towers' },
    { id: 'arruns_spedius',       name: 'Arruns Spedius Fastus, Sutor Supra Crepidam', rarity: 'Unique', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: '+1 happiness from Sandals, +3 Prestige from Sandals, +1 happiness from Reed Shoes' },
    { id: 'menander_of_nicomedes', name: 'Menander of Nicomedes, Auspicious Haruspex', rarity: 'Unique', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Sanctuary and Fanum in range: +1.5 belief area effect, +0.5 knowledge area effect, -50% upkeep cost' },
    { id: 'siochainri_bichearb',  name: 'Siochainri Bichearb, Boioran Rhapsodist', rarity: 'Unique', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range +25% belief and +25% knowledge' },

    // — ADDITIONAL SPECIALISTS FROM anno.land SCRAPE (2026-06-01) —
    { id: 'abdfil_elephant_handler', name: 'Abdfil, Elephant Handler', rarity: 'Epic', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Prestige 1,5' },
    { id: 'divergent_factor', name: 'Divergent Factor', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'City Watches in range: Workforce needed -25%; Upkeep cost -50%; Run by Plebeian Workforce, instead of Libertus Workforce' },
    { id: 'axle_wheeler', name: 'Axle Wheeler', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Chariots Chain in range: Productivity +20%' },
    { id: 'a_d_leamh_n_oracle_of_sages', name: 'Aéd Leamhán, Oracle of Sages', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief from Recreation Ground, if supplied +2' },
    { id: 'aedela_alder_than_alder', name: 'Aedela, Alder Than Alder', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Alderman Residence in range: Workforce from residents +25%' },
    { id: 'agrippina_pontificus_the_divine_fervour', name: 'Agrippina Pontificus, the Divine Fervour', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief +1,8' },
    { id: 'agronomic_aerator', name: 'Agronomic Aerator', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Herb Gardens in range: Health area effect +1' },
    { id: 'ahinadab_the_eternal_city_s_praefectus', name: 'Ahinadab, The Eternal City\'s Praefectus', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Health +0,5; Fire Safety +2' },
    { id: 'gleaner', name: 'Gleaner', rarity: 'Common', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Gatherers in range: Workforce needed -25%; Upkeep cost -50%' },
    { id: 'ailbhe_giunnae_fence_cut_tonsurist', name: 'Ailbhe Giunnae, Fence-Cut Tonsurist', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Wig Maker in range: Belief area effect +1,5' },
    { id: 'aisling_ui_democritus_hermeneutician', name: 'Aisling ui Democritus, Hermeneutician', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mercator Residence in range: Also provides equal amounts of Smith Workforce' },
    { id: 'aisling_ollamh_of_shadow', name: 'Aisling, Ollamh of Shadow', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness from Sacred Grove, if supplied +2; Knowledge from Sacred Grove, if supplied +1' },
    { id: 'akhaz_who_parts_asunder', name: 'Akhaz, Who Parts Asunder', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Fire Safety from Chariots, if supplied +3' },
    { id: 'meticulous_aimer', name: 'Meticulous Aimer', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Towers in range: Attack range +25%; Ranged offence +2' },
    { id: 'alarming_signaller', name: 'Alarming Signaller', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Vigiles in range: Fire Safety +30; Available patrols +1' },
    { id: 'alberon_notorious_lyer', name: 'Alberon, Notorious Lyer', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Saltwort Burners in range: Knowledge area effect +1,5' },
    { id: 'alys_circus_charioteer', name: 'Alys, Circus Charioteer', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Chariot Workshop in range: Happiness area effect +1,5' },
    { id: 'amalgamist', name: 'Amalgamist', rarity: 'Common', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Smelters in range: Workforce needed -25%; Upkeep cost -50%' },
    { id: 'amurca_apothecary', name: 'Amurca Apothecary', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Olive Press in range: Health area effect +1' },
    { id: 'aneirin_gwawdrydd_smith_weard', name: 'Aneirin Gwawdrydd, Smith Weard', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Smelters in range: Productivity +25%; Additional 1t every 10 cycles; Fuel efficiency +25%' },
    { id: 'roasted_roustabout', name: 'Roasted Roustabout', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Fire Safety +1,2' },
    { id: 'aodhan_master_lutist_of_the_scathach', name: 'Aodhan, Master Lutist of the Scathach', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness from Bardic Hearth, if supplied +1; Prestige from Bardic Hearth, if supplied +2' },
    { id: 'the_aeolian_modist', name: 'The Aeolian Modist', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Lyres Chain in range: Productivity +35%' },
    { id: 'appius_gagilius_ismarus_glass_aficionado', name: 'Appius Gagilius Ismarus, Glass Aficionado', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Knowledge from Fine Glass, if supplied +3' },
    { id: 'aprilis_snail_stirrer', name: 'Aprilis, Snail Stirrer', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Dye Works in range: Prestige area effect +1,5' },
    { id: 'aquila_dulcis_curator_aquarum', name: 'Aquila Dulcis, Curator Aquarum', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Aqueduct Basins in range: Water supply +200%; Fire Safety +100; Upkeep cost -30%' },
    { id: 'asteria_of_delphi_apollonian_musagete', name: 'Asteria of Delphi, Apollonian Musagete', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Belief from Standing Lyres, if supplied +3' },
    { id: 'athr_iorgwyn_once_and_former_king', name: 'Athr Iorgwyn, Once-And-Former King', rarity: 'Unique', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Smith Residence and Alderman Residence in range: Fire Safety +25%; Also provides equal amounts of Wader Workforce; Health from Recreation Ground, if supplied +1; Fire Safety from Recreation Ground, if supplied +3' },
    { id: 'caustic_renderer', name: 'Caustic Renderer', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Soap Chain in range: Productivity +10%' },
    { id: 'inflammatory_flamincia', name: 'Inflammatory Flamincia', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief +1,2' },
    { id: 'ascendant_endorser', name: 'Ascendant Endorser', rarity: 'Rare', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Prestige +1,2' },
    { id: 'aulus_pecunius_magnus_patrician_profiteer', name: 'Aulus Pecunius Magnus, Patrician Profiteer', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Income +1,8' },
    { id: 'aulus_rannius_aureate_collegiate', name: 'Aulus Rannius, Aureate Collegiate', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Goldsmith in range: Income area effect +1,5' },
    { id: 'aun_proselyte_of_mars_loucetius', name: 'Aun, Proselyte of Mars Loucetius', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Armouries in range: Productivity +10%; Fuel efficiency +35%; Belief area effect +1,5; Upkeep cost -25%' },
    { id: 'sublime_herbalist', name: 'Sublime Herbalist', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Lavender Grower in range: Belief area effect +1' },
    { id: 'breechblanketer', name: 'Breechblanketer', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Fire Safety from Trousers, if supplied +2' },
    { id: 'belmaglo_atrius_leo_noble_nominator', name: 'Belmaglo Atrius Leo, Noble Nominator', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Noble Residence in range: Workforce from residents +25%' },
    { id: 'irrigator', name: 'Irrigator', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Arable Farms in range: Water consumption -50%' },
    { id: 'brian_na_gcapall_n_scathing_satirist', name: 'Brian na gCapallín, Scathing Satirist', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Clothiers in range: Prestige area effect +1,5' },
    { id: 'brian_of_the_many_blessings', name: 'Brian of the Many Blessings', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Shrines in range: Happiness area effect +0,5; Health area effect +0,5; Fire Safety area effect +0,5; Upkeep cost -25%' },
    { id: 'brooch_boutiquer', name: 'Brooch Boutiquer', rarity: 'Rare', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Happiness from Brooches, if supplied +2' },
    { id: 'cairbre_u_murchad_bonny_beastherd', name: 'Cairbre Uí Murchad, Bonny Beastherd', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Chair Maker in range: Prestige area effect +1,5' },
    { id: 'cairbre_u_merchad_h_bscher_hirte', name: 'Cairbre Uí Merchad, hübscher Hirte', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Ochs Farm, Sheep Farm, Pig Farm in Albion in range: Workforce needed -35%; Upkeep cost -80%; Run by Nobles Workfors, instead of Wader Workforce' },
    { id: 'calchas_of_colchis_avian_auspex', name: 'Calchas of Colchis, Avian Auspex', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Knowledge from Bird Tongues in Aspic, if supplied +3' },
    { id: 'canus_praecilius_thrax_sociable_syndexioi', name: 'Canus Praecilius Thrax, Sociable Syndexioi', rarity: 'Legendary', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness +2; Belief +0,5' },
    { id: 'casponia_casta_sacerdos_cereris', name: 'Casponia Casta, Sacerdos Cereris', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Arable Farms in range: Productivity +25%; Additional 1t Flax every 10 cycles; Belief area effect +1' },
    { id: 'catt_n_apothegmatic_apothecary', name: 'Cattín, Apothegmatic Apothecary', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Plantations in range: Productivity +25%; Additional 1t Herbs every 10 cycles.; Health area effect +1' },
    { id: 'ceannglan_healer_of_hats', name: 'Ceannglan, Healer of Hats', rarity: 'Epic', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Health from Fur Hats, if supplied +3' },
    { id: 'centonarion', name: 'Centonarion', rarity: 'Common', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Spinners in range: Happiness area effect +0,5' },
    { id: 'cermaid_mac_ealadha_dagda_s_goodman', name: 'Cermaid Mac Ealadha, Dagda\'s Goodman', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Medici in range: Prestige area effect +1; Available patrols +1; Response time -10%' },
    { id: 'chalcolithist', name: 'Chalcolithist', rarity: 'Rare', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Copper Mine in range: Knowledge area effect +1' },
    { id: 'concordia_ashen_vestal', name: 'Concordia, Ashen Vestal', rarity: 'Unique', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Patrician Residence in range: Belief +15%; Also provides equal amout of Libertus Workforce; Happiness from Temple, if supplied +1; Belief from Temple, if supplied +3' },
    { id: 'the_bifurcator', name: 'The Bifurcator', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Trousers Chain in range: Productivity +20%' },
    { id: 'the_lapidarius_aureate', name: 'The Lapidarius Aureate', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Necklaces Chain in range: Productivity +35%' },
    { id: 'dibblorix_optima_lixa', name: 'Dibblorix, Optima Lixa', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Towers in range: Happiness area effect +1; Workforce needed -50%; Upkeep cost -80%' },
    { id: 'dorian_philos_of_philhellenes', name: 'Dorian, Philos of Philhellenes', rarity: 'Unique', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Equites Residence in range: Health +25%; Also provides equal amout of Libertus Workforce; Health from Baths, if supplied +3; Fire Safety from Baths, if supplied +1' },
    { id: 'dragonesque_doyenne', name: 'Dragonesque Doyenne', rarity: 'Rare', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Fibularium in range: Prestige area effect +1' },
    { id: 'ductuarius', name: 'Ductuarius', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Aqueduct Basins in range: Water supply +50%' },
    { id: 'fervent_burnisher', name: 'Fervent Burnisher', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Bronze Smelter in range: Belief area effect +1' },
    { id: 'haughty_phenomenal_saucier', name: 'Haughty Phenomenal Saucier', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness from Roast Beef, if supplied +3' },
    { id: 'iron_grade_ironist', name: 'Iron-Grade Ironist', rarity: 'Rare', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness +1,2' },
    { id: 'ironclad_distributor', name: 'Ironclad Distributor', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'City Watches in Albion in range: Workforce needed -25%; Upkeep cost -50%; Run by Smith Workforce, instead of Wader Workforce' },
    { id: 'emer_thumping_advocate', name: 'Emer, Thumping Advocate', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Prestige +1,8' },
    { id: 'enna_ardsolas_shining_bulwark', name: 'Enna Ardsolas, Shining Bulwark', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Armourer in range: Prestige area effect +1,5' },
    { id: 'deboner', name: 'Deboner', rarity: 'Common', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Health from Sardines, if supplied +1' },
    { id: 'equestrian_trainer', name: 'Equestrian Trainer', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Equites Residence in range: Workforce from residents +15%' },
    { id: 'prodigious_stuffer', name: 'Prodigious Stuffer', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Salsicium in range: Belief area effect +1' },
    { id: 'euphrosyne_patuleia_plebeian_suffragist', name: 'Euphrosyne Patuleia, Plebeian Suffragist', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Liberti Residences in range: Also provides equal amounts of Plebeian Workforce' },
    { id: 'exuperata_popular_assemblist', name: 'Exuperata, Popular Assemblist', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Workshops in range: Workforce needed -40%; Upkeep cost -80%' },
    { id: 'clarion_caller', name: 'Clarion Caller', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Barracks in range: Troop recruitment speed +100%; Troop recruitment cost -20%' },
    { id: 'vesseler', name: 'Vesseler', rarity: 'Common', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Victuallers in range: Workforce needed -25%; Upkeep cost -50%' },
    { id: 'favillus_survivor_of_sands_and_sandals', name: 'Favillus, Survivor of Sands and Sandals', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Smelters and Armouries in range: Productivity +35%; Fuel efficiency +35%; Fire Safety area effect +1' },
    { id: 'festina_lacer', name: 'Festina Lacer', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Health from Sandals, if supplied +2' },
    { id: 'fiachra_d_ite_n_culinary_immolator', name: 'Fiachra Dóiteán, Culinary Immolator', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Earth Oven in range: Belief area effect +1,5' },
    { id: 'fideus_loyal_hound', name: 'Fideus, Loyal Hound', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Sheep Farm in range: Productivity +35%; Additional 1t every 10 cycles; Workforce needed -50%' },
    { id: 'fionnbharr_young_wolf', name: 'Fionnbharr, Young Wolf', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Towers in range: Accuracy +25%; Attack range +35%; Ranged offence +2' },
    { id: 'piscine_docent', name: 'Piscine Docent', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Garum Chain in range: Productivity +10%' },
    { id: 'flavius_cerialis_birrus_buff', name: 'Flavius Cerialis, Birrus Buff', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Prestige from Cloaks, if supplied +3' },
    { id: 'snappy_snaremaker', name: 'Snappy Snaremaker', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Fur Hats Chain in range: Productivity +20%' },
    { id: 'progressive_storekeeper', name: 'Progressive Storekeeper', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Warehouses in Albion in range: Workforce needed -25%; Upkeep cost -50%; Run by Mercators Workforce, instead of Wader Workforce' },
    { id: 'buccaneering_bucketeer', name: 'Buccaneering Bucketeer', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Fire Safety from Amphorae, if supplied +2' },
    { id: 'galerius_natta_prime_prospector', name: 'Galerius Natta, Prime Prospector', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Marble Quarry in range: Prestige area effect +1,5' },
    { id: 'gallus_vinicius_the_light_tread', name: 'Gallus Vinicius, the Light Tread', rarity: 'Epic', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Vintners in range: Health area effect +1,5' },
    { id: 'equitable_trainer', name: 'Equitable Trainer', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Equitum Campus in range: Troop recruitment speed +100%; Troop recruitment cost -20%' },
    { id: 'adroit_assembler', name: 'Adroit Assembler', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Siege Workshop in range: Troop recruitment speed +100%; Troop recruitment cost -20%' },
    { id: 'glasspoet', name: 'Glasspoet', rarity: 'Rare', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Glass Smelter in range: Prestige area effect +1' },
    { id: 'oat_roller', name: 'Oat Roller', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Porridge Chain in range: Productivity +10%' },
    { id: 'brass_necked_pashedu', name: 'Brass-Necked Pashedu', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Income from Necklaces, if supplied +3' },
    { id: 'handler', name: 'Handler', rarity: 'Common', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Amphorae Chain in range: Productivity +10%' },
    { id: 'harchebis_high_tonsurist', name: 'Harchebis, High Tonsurist', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Happiness from Wigs, if supplied +3' },
    { id: 'hasdrubal_pedagogic_authority', name: 'Hasdrubal, Pedagogic Authority', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Recruitment Building in range: Troop recruitment speed +100%; Troop recruitment cost -25%; Hitpoints +25%' },
    { id: 'hephaestian_polysmith', name: 'Hephaestian Polysmith', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Armouries in range: Workforce needed -33%; Upkeep cost -66%' },
    { id: 'heracalius_sage_of_panta_rhei', name: 'Heracalius, Sage of Panta Rhei', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Glassblower in range: Knowledge area effect +1,5' },
    { id: 'herius_fraucus_cornelius_patrician_palatine', name: 'Herius Fraucus Cornelius, Patrician Palatine', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Patrician Residence in range: Workforce from residents +25%' },
    { id: 'capillary_coiffurist', name: 'Capillary Coiffurist', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Wigs Chain in range: Productivity +20%' },
    { id: 'caloric_meter', name: 'Caloric Meter', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Renderers in range: Health area effect +1' },
    { id: 'horatia_hemina_alliterative_litterateur', name: 'Horatia Hemina, Alliterative Litterateur', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Knowledge from Writing Tablets, if supplied +3' },
    { id: 'hosta_vulpius_silencer_of_song', name: 'Hosta Vulpius, Silencer of Song', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Bird Tongues Chain in range: Productivity +35%' },
    { id: 'humiliore', name: 'Humiliore', rarity: 'Common', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Porridge Stand in range: Belief area effect +0,5' },
    { id: 'steward_of_flame', name: 'Steward of Flame', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Brewery in range: Fire Safety area effect +1' },
    { id: 'milliner', name: 'Milliner', rarity: 'Common', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Pileus Chain in range: Productivity +10%' },
    { id: 'hygeian_garumedicus', name: 'Hygeian Garumedicus', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Health from Garum, if supplied +2' },
    { id: 'iain_thespis_brightener_of_days', name: 'Iain Thespis, Brightener of Days', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness +1,8' },
    { id: 'de_nimh_bane_of_pugilists', name: 'Íde Nimh, Bane of Pugilists', rarity: 'Legendary', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Medici in range: Health area effect +1; Available patrols +1' },
    { id: 'incidentus_consular_horse', name: 'Incidentus, Consular Horse', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Encampments in range: Fire Safety area effect +1; Knowledge area effect -2; Prestige area effect +3' },
    { id: 'ironic_interviewer', name: 'Ironic Interviewer', rarity: 'Rare', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Iron Mines in range: Knowledge area effect +1' },
    { id: 'renavigator', name: 'Renavigator', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Cockle Picker, Saltwort Picker in range: Workforce needed -25%; Run by Mercators Workforce, instead of Wader Workforce' },
    { id: 'juicer_of_lime', name: 'Juicer of Lime', rarity: 'Rare', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Limestone Quarry in range: Income area effect +1' },
    { id: 'savvy_capsarius', name: 'Savvy Capsarius', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Medici in range: Health +30; Available patrols +1' },
    { id: 'knekkfjall_of_the_crisp_tundra', name: 'Knekkfjall of the Crisp Tundra', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Prestige from Cheese, if supplied +3' },
    { id: 'reappraising_codifier', name: 'Reappraising Codifier', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Warehouses in Latium in range: Workforce needed -25%; Upkeep cost -50%; Run by Plebeian Workforce, instead of Libertus Workforce' },
    { id: 'artisan_allsmelter', name: 'Artisan Allsmelter', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Fine Glass Chain in range: Productivity +20%' },
    { id: 'lamellary_armourer', name: 'Lamellary Armourer', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Armour Chain in range: Productivity +20%' },
    { id: 'lar_syracus_minedriver', name: 'Lar Syracus, Minedriver', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mines in Range:: Income area effect +6; Happiness area effect -2; Health area effect -2; Workforce needed -75%; Upkeep cost -75%' },
    { id: 'prurient_pourer', name: 'Prurient Pourer', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Fire Safety from Beer, if supplied +2' },
    { id: 'leonine_ceramicist', name: 'Leonine Ceramicist', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Tilers in range: Fire Safety area effect +1' },
    { id: 'lepidius_exoratus_polylithologist', name: 'Lepidius Exoratus, Polylithologist', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mineral Quarry in range: Prestige area effect +1,5' },
    { id: 'libertine', name: 'Libertine', rarity: 'Common', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Pileus Felter in range: Prestige area effect +0,5' },
    { id: 'litugenus_sage_cultivator', name: 'Litugenus, Sage Cultivator', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Knowledge +1,8' },
    { id: 'luchta_ancillary_godguardian', name: 'Luchta, Ancillary Godguardian', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Fire Safety from Clan Shields, if supplied +3' },
    { id: 'lucia_sophus_imperial_occultist', name: 'Lucia Sophus, Imperial Occultist', rarity: 'Legendary', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'City Watches in range: Belief area effect +3; Knowledge area effect -1; Upkeep cost -20%' },
    { id: 'lygos_exakion_architectus_eparchus', name: 'Lygos Exakion, Architectus Eparchus', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Gates in range: Ranged offence +1; Attack speed +25%; Hitpoints +40%' },
    { id: 'macrobius_minucianus_microcosmologist', name: 'Macrobius Minucianus, Microcosmologist', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Production Buildings in range: Productivity +20%; Happiness +0,5; Health +0,5; Fire Safety +0,5; Workforce needed -10%; Upkeep cost -10%' },
    { id: 'madaidhin_wooly_comber', name: 'Madaidhin, Wooly Comber', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Sheep Farm in range: Income area effect +1,5' },
    { id: 'magnus_bantius_the_deipnosophist', name: 'Magnus Bantius the Deipnosophist', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Kitchens in range: Knowledge area effect +1,5' },
    { id: 'prime_mantler', name: 'Prime Mantler', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Cloaks Chain in range: Productivity +20%' },
    { id: 'marcus_coriolan_thundrous_speaker', name: 'Marcus Coriolan, Thundrous Speaker', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief from Togas, if supplied +3' },
    { id: 'marix_who_knows_the_merrows', name: 'Marix, Who Knows The Merrows', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mirrors Chain in range: Productivity +35%' },
    { id: 'materialist_medicus', name: 'Materialist Medicus', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Medici in range: Health area effect +1' },
    { id: 'maxima_cottius_upholsterer_of_atlas', name: 'Maxima Cottius, Upholsterer of Atlas', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Loungers Chain in range: Productivity +35%' },
    { id: 'mellarius', name: 'Mellarius', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Wax Tablets Chain in range: Productivity +10%' },
    { id: 'meresamun_reflective_intellect', name: 'Meresamun, Reflective Intellect', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Prestige from Handmirrors, if supplied +3' },
    { id: 'mico_annius_unearther_of_lodestars', name: 'Mico Annius, Unearther of Lodestars', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Marble Mason in range: Belief area effect +1,5' },
    { id: 'minas_rl_mh_the_gilted_touch', name: 'Minas Órlámh, the Gilted Touch', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mines in Range:: Productivity +25%; Additional 1t Gold Ore every 10 cycles; Income +100' },
    { id: 'moccix_escutcheological_herald', name: 'Moccix. Escutcheological Herald', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Shiedlbeater in range: Prestige area effect +1,5' },
    { id: 'fashionist', name: 'Fashionist', rarity: 'Common', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Prestige from Tunics, if supplied +1' },
    { id: 'mercurial_marketeer', name: 'Mercurial Marketeer', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Mercator Residence in range: Workforce from residents +15%' },
    { id: 'natanhael_sithar_the_star_diver', name: 'Natanhael Sithar, the Star Diver', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief from Baths, if supplied +1; Knowledge from Baths, if supplied +2' },
    { id: 'necroeudaimon', name: 'Necroeudaimon', rarity: 'Rare', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Garum Works in range: Happiness area effect +1' },
    { id: 'neferneru_lion_in_waiting', name: 'Neferneru, Lion In Waiting', rarity: 'Unique', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mercator Residence and Noble Residence in range: Income +25%; Also provides equal amounts of Wader Workforce; Income from Fanum, if supplied +3; Belief from Fanum, if supplied +1' },
    { id: 'nero_vulius_fama_pastoralist_pastor', name: 'Nero Vulius Fama, Pastoralist Pastor', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Snailery, and Sheep Farm, Pig Farm in Latium in range: Workforce needed -35%; Upkeep cost -80%; Run by Equites Workforce, instead of Libertus Workforce' },
    { id: 'netter', name: 'Netter', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Sardines Chain in range: Productivity +10%' },
    { id: 'nomadic_herder', name: 'Nomadic Herder', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Livestock Farms in range: Workforce needed -33%; Upkeep cost -66%' },
    { id: 'o_bu_ochas_master_of_unwinding', name: 'O\'Buíochas, Master of Unwinding', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Lythier in range: Happiness area effect +1,5' },
    { id: 'obairrix_full_metalsmith', name: 'Obairrix, Full Metalsmith', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Smelters in range: Fire Safety area effect +1,5' },
    { id: 'octriuil_gifted_healer', name: 'Octriuil, Gifted Healer', rarity: 'Epic', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Health +1,8' },
    { id: 'optimate', name: 'Optimate', rarity: 'Common', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Prestige +0,6' },
    { id: 'owain_o_ywen_keeper_of_lore', name: 'Owain o Ywen, Keeper of Lore', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Knowledge from Alder Council, if supplied +2' },
    { id: 'palaephaesta_dextrous_demiurgus', name: 'Palaephaesta, Dextrous Demiurgus', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Artisinal Studios in Range:: Workforce needed -40%; Upkeep cost -80%' },
    { id: 'panoplian_potterer', name: 'Panoplian Potterer', rarity: 'Rare', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Potter in range: Income area effect +1' },
    { id: 'patanjali_flavor_lexicologist', name: 'Patanjali, Flavor Lexicologist', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Epicure of Water in range: Knowledge area effect +1,5' },
    { id: 'pericles_brother_of_heracles', name: 'Pericles, Brother of Heracles', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Marvels in range: Fire Safety area effect -1; Prestige area effect +3; Epidemic immunity; Plague immunity' },
    { id: 'pharmacognostic', name: 'Pharmacognostic', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Health +1,2' },
    { id: 'philof_baitylician', name: 'Philof, Baitylician', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Granite Quarry in range: Belief area effect +1,5' },
    { id: 'philosophokles_eurekean_epigonoi', name: 'Philosophokles, Eurekean Epigonoi', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Fire Safety +0,5; Knowledge +2' },
    { id: 'phlebas_handsome_phoenician', name: 'Phlebas, Handsome Phoenician', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Loom Weavery in range: Belief area effect +1,5' },
    { id: 'plebeian_praepositus', name: 'Plebeian Praepositus', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Plebeian Residence in range: Workforce from residents +15%' },
    { id: 'prefect_of_ochsen', name: 'Prefect of Ochsen', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Roast Beef Chain in range: Productivity +20%' },
    { id: 'pragmatic_aegis', name: 'Pragmatic Aegis', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Clan Shields Chain in range: Productivity +20%' },
    { id: 'practitioner', name: 'Practitioner', rarity: 'Common', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Medici in range: Available patrols +1' },
    { id: 'princeps_of_porphyr', name: 'Princeps of Porphyr', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Togas Chain in range: Productivity +20%' },
    { id: 'privatus_ouvido_naso_civic_elegist', name: 'Privatus Ouvido Naso, Civic Elegist', rarity: 'Legendary', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness +0,5; Prestige +2' },
    { id: 'publius_quintus_amphipraetorian', name: 'Publius Quintus, Amphipraetorian', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'City Watches in range: Income area effect +1; Workforce needed -25%; Available patrols +1' },
    { id: 'vengeful_villicus', name: 'Vengeful Villicus', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Gates in range: Attack range +25%; Ranged offence +1; Attack speed +20%' },
    { id: 'rhea_proserpina_dis_mater', name: 'Rhea Proserpina, Dis Mater', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Mines and Pits in range: Workforce needed -40%; Upkeep cost -80%' },
    { id: 'rusa_of_knossos_benthic_ecclesiast', name: 'Rusa of Knossos, Benthic Ecclesiast', rarity: 'Epic', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief from Oysters with Caviar, if supplied +3' },
    { id: 's_p_q_r', name: 'S.P.Q.R.', rarity: 'Rare', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Income from Sausages, if supplied +2' },
    { id: 'sole_survivor', name: 'Sole Survivor', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Sandal Maker in range: Health area effect +1' },
    { id: 'saturnine_smelter', name: 'Saturnine Smelter', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Brooches Chain in range: Productivity +20%' },
    { id: 'purifying_perfumer', name: 'Purifying Perfumer', rarity: 'Rare', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Soap Maker in range: Health area effect +1' },
    { id: 'sceilg_eremitic_reductionist', name: 'Sceilg, Eremitic Reductionist', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Forest Camps in range: Productivity +30%; Required area -30%; Additional 1t every 10 cycles' },
    { id: 'shucker', name: 'Shucker', rarity: 'Common', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Residences in range: Health from Cockles, if supplied +1' },
    { id: 'luscious_soaper', name: 'Luscious Soaper', rarity: 'Rare', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Prestige from Soap, if supplied +2' },
    { id: 'unleaded_leader', name: 'Unleaded Leader', rarity: 'Rare', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Silver Forge in range: Income area effect +1' },
    { id: 'reedwainer', name: 'Reedwainer', rarity: 'Common', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Shoe Weaver in range: Income area effect +0,5' },
    { id: 'scholast', name: 'Scholast', rarity: 'Common', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Knowledge +0,6' },
    { id: 'chimneysweeper', name: 'Chimneysweeper', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Charcoal Burner in range: Fire Safety area effect +1' },
    { id: 'boar_whisperer', name: 'Boar Whisperer', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Sausages Chain in range: Productivity +35%' },
    { id: 'sailer', name: 'Sailer', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Sailmaker and Sails Chain in range: Productivity +10%' },
    { id: 'senchaid_sciatharglan_ensconced_escutcheon', name: 'Senchaid Sciatharglan, Ensconced Escutcheon', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Gates in range: Ranged offence +3; Hitpoints +45%; Self-repair speed +80%' },
    { id: 'senuacus_dousing_dozer', name: 'Senuacus, Dousing Dozer', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Fire Safety +1,8' },
    { id: 'servia_bellia_lily_of_the_coast', name: 'Servia Bellia, Lily of the Coast', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Coastal Factories in range: Productivity +25%; Income area effect +1' },
    { id: 'sextus_fontinalis_head_of_fountains', name: 'Sextus Fontinalis, Head of Fountains', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Fire Safety from Aqueduct Cistern, if supplied +2' },
    { id: 'shapur_of_chalcis_eponian_eques', name: 'Shapur of Chalcis, Eponian Eques', rarity: 'Epic', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Horse Breeders in range: Health area effect +1,5' },
    { id: 'champion_bruiser', name: 'Champion Bruiser', rarity: 'Rare', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Custodes in range: Happiness +30; Available patrols +1' },
    { id: 'argent_hand', name: 'Argent Hand', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Silver Mine in range: Belief area effect +1' },
    { id: 's_och_inri_b_chearb_boioran_rhapsodist', name: 'Síocháinri Bíchearb, Boioran Rhapsodist', rarity: 'Unique', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Belief +25%; Knowledge +25%' },
    { id: 'stalwart_harbourward', name: 'Stalwart Harbourward', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Repair Crane in range: Ship repair speed +25%; Simultaneous repairs +1; Hitpoints +25%' },
    { id: 'dramatist', name: 'Dramatist', rarity: 'Common', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness +0,6' },
    { id: 'tutoring_tabulist', name: 'Tutoring Tabulist', rarity: 'Rare', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Tabulus in range: Knowledge area effect +1' },
    { id: 'tanisius_savvy_scrapblanketer', name: 'Tanisius, Savvy Scrapblanketer', rarity: 'Epic', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Birrus Stitcher in range: Fire Safety area effect +1,5' },
    { id: 'tarragon_whose_voyages_have_ended', name: 'Tarragon, Whose Voyages Have Ended', rarity: 'Unique', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Plebeian Residence in range: Happiness +35%; Also provides equal amout of Libertus Workforce; Happiness from Sactuary, if supplied +3; Knowledge from Sanctuary, if supplied +1' },
    { id: 'diviner_of_dough', name: 'Diviner of Dough', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Bread Chain in range: Productivity +10%' },
    { id: 'thrinacian_herder', name: 'Thrinacian Herder', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Ochs Farm in range: Belief area effect +1' },
    { id: 'tiarnan_tine_the_fire_forged', name: 'Tiarnan Tine, the Fire-Forged', rarity: 'Legendary', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Vigiles in range: Fire Safety area effect +1; Available patrols +2' },
    { id: 'tirech_n_ua_aergol_tireless_tiller', name: 'Tirechán Ua Aergol, Tireless Tiller', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Plantations in range: Workforce needed -40%; Upkeep cost -80%' },
    { id: 'titus_faber_master_of_tasks', name: 'Titus Faber, Master of Tasks', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Libertus Residence in range: Workforce from residents +25%' },
    { id: 'tolupist', name: 'Tolupist', rarity: 'Rare', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Stringer in range: Knowledge area effect +1' },
    { id: 'vinecrusher', name: 'Vinecrusher', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Vintner and Wine Chain in range: Productivity +20%' },
    { id: 'stalwart_smith', name: 'Stalwart Smith', rarity: 'Rare', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Smith Residence in range: Workforce from residents +30%' },
    { id: 'uesuca_of_the_holy_terroir', name: 'Uesuca, of the Holy Terroir', rarity: 'Epic', category: 'civic', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Prestige from Wine, if supplied +3' },
    { id: 'uiscarix_hygiean_fishmonger', name: 'Uiscarix, Hygiean Fishmonger', rarity: 'Epic', category: 'finance', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Fisheries in range: Income area effect +1,5' },
    { id: 'unerring_bladeworker', name: 'Unerring Bladeworker', rarity: 'Rare', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Weaponsmiths in range: Happiness area effect +1' },
    { id: 'urbane_auxila', name: 'Urbane Auxila', rarity: 'Rare', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Custodes in range: Happiness area effect +1' },
    { id: 'urbicius_creticus_graffitographer', name: 'Urbicius Creticus, Graffitographer', rarity: 'Epic', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Custodes in range: Knowledge area effect +1; Available patrols +1; Response time -10%' },
    { id: 'vel_moderatius_shaper_of_testaments', name: 'Vel Moderatius, Shaper of Testaments', rarity: 'Legendary', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Aphitheatre and Construction Sites in range: Belief area effect +0,5; Knowledge area effect +0,5; Prestige area effect +2; Upkeep cost -15%' },
    { id: 'venator_of_artemis', name: 'Venator of Artemis', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Hunting Cabins and Fisheries in range: Workforce needed -33%; Upkeep cost -66%' },
    { id: 'mad_cook_favourite_of_moguns', name: 'Mad Cook, Favourite of Moguns', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Happiness from Tavern, if supplied +1; Health from Tavern, if supplied +1; Knowledge from Tavern, if supplied +1' },
    { id: 'vespertine_anointer', name: 'Vespertine Anointer', rarity: 'Rare', category: 'religion', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Residences in range: Belief from Olive Oil, if supplied +2' },
    { id: 'vexillarius', name: 'Vexillarius', rarity: 'Common', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Vigiles in range: Available patrols +1' },
    { id: 'aunt_jellification', name: 'Aunt Jellification', rarity: 'Epic', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['albion'], effect: 'Epicure of Air in range: Happiness area effect +1,5' },
    { id: 'vigilant_baker', name: 'Vigilant Baker', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Bakeries in range: Fire Safety area effect +1' },
    { id: 'watchful_villicus', name: 'Watchful Villicus', rarity: 'Rare', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Gates in range: Ranged offence +2; Hitpoints +35%' },
    { id: 'watchman', name: 'Watchman', rarity: 'Common', category: 'culture', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Custodes in range: Available patrols +1' },
    { id: 'wareholder', name: 'Wareholder', rarity: 'Common', category: 'military', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Trading Posts, Warehouses and Depot in range: Hitpoints +50%; Self-repair speed +100%' },
    { id: 'tawer', name: 'Tawer', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Sandals Chain in range: Productivity +10%' },
    { id: 'reunionist', name: 'Reunionist', rarity: 'Common', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Oat Farm, Olive Grower in range: Workforce needed -25%; Run by Plebeian Workforce, instead of Libertus Workforce' },
    { id: 'xeno_of_phillipopolis_hipparchon', name: 'Xeno of Phillipopolis, Hipparchon', rarity: 'Epic', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium'], effect: 'Horses Chain in range: Productivity +35%' },
    { id: 'zara_nitu_queen_of_mesopotamia', name: 'Zara Nitu, Queen of Mesopotamia', rarity: 'Unique', category: 'research', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Patrician Residence in range: Knowledge +15%; Also provides equal amounts of Plebeian Workforce; Knowledge from Library, if supplied +3; Prestige from Library, if supplied +1' },
    { id: 'zeno_salvia_collegiate_of_rex_infernus', name: 'Zeno Salvia, Collegiate of Rex Infernus', rarity: 'Legendary', category: 'nature', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Residences in range: Income +0,5; Health +2' },
    { id: 'zorsines_sarmatian_swordshaper', name: 'Zorsines, Sarmatian Swordshaper', rarity: 'Legendary', category: 'economy', validSlots: ['governors_villa', 'officium'], regions: ['latium', 'albion'], effect: 'Armouries in range: Productivity +30%; Additional 1t every 10 cycles; Fuel efficiency +25%' },

  ],

  // ─── PRODUCTION CHAINS ──────────────────────────────────────────────────────
  // outputGoodId: references goods[].id
  // region: 'latium' | 'albion'
  // steps: array of { buildingTypeId, count } — count = buildings needed at 100% efficiency, no specialist buffs
  // inputGoodIds: raw inputs consumed (for cross-reference)
  // notes: caveats, efficiency notes

  productionChains: [

    // ══ LATIUM ══

    // — Infrastructure —
    {
      id: 'lc_boards', outputGoodId: 'boards', region: 'latium',
      steps: [{ buildingTypeId: 'lumberjack', count: 1 }, { buildingTypeId: 'sawmill', count: 1 }],
      inputGoodIds: ['wood'], notes: 'Ratio 1:1'
    },
    {
      id: 'lc_coal', outputGoodId: 'coal', region: 'latium',
      steps: [{ buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['wood'], notes: 'Utility resource used in most chains'
    },
    {
      id: 'lc_tiles', outputGoodId: 'tiles', region: 'latium',
      steps: [{ buildingTypeId: 'clay_pit', count: 1 }, { buildingTypeId: 'tiler', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['clay', 'coal'], notes: ''
    },
    {
      id: 'lc_concrete', outputGoodId: 'concrete', region: 'latium',
      steps: [{ buildingTypeId: 'limestone_quarry', count: 2 }, { buildingTypeId: 'sand_refinery', count: 3 }, { buildingTypeId: 'concrete_mixer', count: 6 }],
      inputGoodIds: ['limestone', 'quartz_sand'], notes: ''
    },
    {
      id: 'lc_marble', outputGoodId: 'marble', region: 'latium',
      steps: [{ buildingTypeId: 'marble_quarry', count: 2 }, { buildingTypeId: 'marble_mason', count: 3 }],
      inputGoodIds: ['raw_marble'], notes: ''
    },
    {
      id: 'lc_mosaics', outputGoodId: 'mosaics', region: 'latium',
      steps: [{ buildingTypeId: 'mineral_quarry', count: 3 }, { buildingTypeId: 'mineral_crusher', count: 4 }, { buildingTypeId: 'clay_pit', count: 2 }, { buildingTypeId: 'mosaic_maker', count: 8 }, { buildingTypeId: 'charcoal_burner', count: 2 }],
      inputGoodIds: ['minerals', 'clay', 'coal'], notes: ''
    },
    {
      id: 'lc_ropes', outputGoodId: 'ropes', region: 'latium',
      steps: [{ buildingTypeId: 'hemp_farm', count: 1 }, { buildingTypeId: 'ropemaker', count: 2 }],
      inputGoodIds: ['hemp'], notes: ''
    },
    {
      id: 'lc_sails', outputGoodId: 'sails', region: 'latium',
      steps: [{ buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'sailmaker', count: 3 }],
      inputGoodIds: ['sheep'], notes: ''
    },
    {
      id: 'lc_weapons', outputGoodId: 'weapons', region: 'latium',
      steps: [{ buildingTypeId: 'iron_mine', count: 1 }, { buildingTypeId: 'furnace', count: 2 }, { buildingTypeId: 'weaponsmith', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1.25 }],
      inputGoodIds: ['iron_ore', 'coal'], notes: ''
    },
    {
      id: 'lc_armour', outputGoodId: 'armour', region: 'latium',
      steps: [{ buildingTypeId: 'iron_mine', count: 1 }, { buildingTypeId: 'furnace', count: 2 }, { buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'salt_pans', count: 1 }, { buildingTypeId: 'tannery', count: 2 }, { buildingTypeId: 'armorsmith', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1.25 }],
      inputGoodIds: ['iron_ore', 'coal', 'pigs', 'salt'], notes: ''
    },

    // — Liberti needs —
    {
      id: 'lc_porridge', outputGoodId: 'porridge', region: 'latium',
      steps: [{ buildingTypeId: 'oat_farm', count: 1 }, { buildingTypeId: 'porridge_stall', count: 1 }],
      inputGoodIds: ['oats'], notes: 'Ratio 1:1'
    },
    {
      id: 'lc_tunics_lat', outputGoodId: 'tunics', region: 'latium',
      steps: [{ buildingTypeId: 'hemp_farm', count: 1 }, { buildingTypeId: 'spinner', count: 1 }],
      inputGoodIds: ['hemp'], notes: 'Ratio 1:1'
    },
    {
      id: 'lc_pilei', outputGoodId: 'pilei', region: 'latium',
      steps: [{ buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'pileus_hatter', count: 2 }],
      inputGoodIds: ['sheep'], notes: '1 Sheep Farm : 2 Hatters'
    },

    // — Plebeian needs —
    {
      id: 'lc_bread_lat', outputGoodId: 'bread', region: 'latium',
      steps: [{ buildingTypeId: 'wheat_farm', count: 2 }, { buildingTypeId: 'mill', count: 1 }, { buildingTypeId: 'bakery', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['wheat', 'coal'], notes: ''
    },
    {
      id: 'lc_garum', outputGoodId: 'garum', region: 'latium',
      steps: [{ buildingTypeId: 'mackerel_hut', count: 2 }, { buildingTypeId: 'salt_pans', count: 1 }, { buildingTypeId: 'garum_workshop', count: 3 }],
      inputGoodIds: ['mackerel', 'salt'], notes: ''
    },
    {
      id: 'lc_soap_lat', outputGoodId: 'soap', region: 'latium',
      steps: [{ buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'tallow_boiler', count: 2 }, { buildingTypeId: 'lavendula_grower', count: 4 }, { buildingTypeId: 'soapmaker', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['pigs', 'lavender', 'coal'], notes: ''
    },
    {
      id: 'lc_sandals', outputGoodId: 'sandals', region: 'latium',
      steps: [{ buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'salt_pans', count: 1 }, { buildingTypeId: 'tannery', count: 2 }, { buildingTypeId: 'sandal_maker', count: 4 }],
      inputGoodIds: ['pigs', 'salt'], notes: ''
    },
    {
      id: 'lc_amphorae_lat', outputGoodId: 'amphorae', region: 'latium',
      steps: [{ buildingTypeId: 'clay_pit', count: 1 }, { buildingTypeId: 'resin_tapper', count: 2 }, { buildingTypeId: 'potter', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['clay', 'resin', 'coal'], notes: ''
    },
    {
      id: 'lc_olive_oil', outputGoodId: 'olive_oil', region: 'latium',
      steps: [{ buildingTypeId: 'olive_grower', count: 4 }, { buildingTypeId: 'olive_press', count: 3 }],
      inputGoodIds: ['olives'], notes: ''
    },

    // — Equites needs —
    {
      id: 'lc_wine_lat', outputGoodId: 'wine', region: 'latium',
      steps: [{ buildingTypeId: 'vineyard', count: 2 }, { buildingTypeId: 'beehive', count: 1 }, { buildingTypeId: 'winemaker', count: 1 }],
      inputGoodIds: ['grapes', 'honeycomb'], notes: ''
    },
    {
      id: 'lc_cheese_lat', outputGoodId: 'cheese', region: 'latium',
      steps: [{ buildingTypeId: 'ox_farm', count: 1 }, { buildingTypeId: 'dairy', count: 2 }],
      inputGoodIds: ['oxen'], notes: 'Import possible from Albion'
    },
    {
      id: 'lc_togas', outputGoodId: 'togas', region: 'latium',
      steps: [{ buildingTypeId: 'flax_farm', count: 3 }, { buildingTypeId: 'weaver', count: 4 }, { buildingTypeId: 'loom', count: 2 }, { buildingTypeId: 'snail_breeder', count: 3 }, { buildingTypeId: 'dye_workshop', count: 4 }],
      inputGoodIds: ['flax', 'purple_snails'], notes: 'Tyrian Purple dye intermediate'
    },
    {
      id: 'lc_fibulae_lat', outputGoodId: 'fibulae', region: 'latium',
      steps: [{ buildingTypeId: 'silver_mine', count: 1 }, { buildingTypeId: 'silversmith', count: 2 }, { buildingTypeId: 'fibulaium', count: 4 }, { buildingTypeId: 'charcoal_burner', count: 1.5 }],
      inputGoodIds: ['silver_ore', 'coal'], notes: ''
    },
    {
      id: 'lc_writing_tablets', outputGoodId: 'writing_tablets', region: 'latium',
      steps: [{ buildingTypeId: 'sandarak_grove', count: 6 }, { buildingTypeId: 'beehive', count: 3 }, { buildingTypeId: 'tabulus', count: 8 }],
      inputGoodIds: ['sandarac_wood', 'honeycomb'], notes: ''
    },
    {
      id: 'lc_fine_glass_lat', outputGoodId: 'fine_glass', region: 'latium',
      steps: [{ buildingTypeId: 'mineral_quarry', count: 3 }, { buildingTypeId: 'mineral_crusher', count: 4 }, { buildingTypeId: 'sand_refinery', count: 3 }, { buildingTypeId: 'glass_melter', count: 6 }, { buildingTypeId: 'glassblower', count: 8 }, { buildingTypeId: 'charcoal_burner', count: 3.5 }],
      inputGoodIds: ['minerals', 'quartz_sand', 'coal'], notes: ''
    },

    // — Patrician needs —
    {
      id: 'lc_oysters_caviar', outputGoodId: 'oysters_caviar', region: 'latium',
      steps: [{ buildingTypeId: 'oyster_farm', count: 6 }, { buildingTypeId: 'sturgeon_farm', count: 6 }, { buildingTypeId: 'fish_weir', count: 3 }, { buildingTypeId: 'sea_gourmet', count: 4 }],
      inputGoodIds: ['oysters', 'sturgeon'], notes: ''
    },
    {
      id: 'lc_bird_tongues_lat', outputGoodId: 'bird_tongues', region: 'latium',
      steps: [{ buildingTypeId: 'bird_catcher', count: 3 }, { buildingTypeId: 'tongue_puller', count: 4 }, { buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'tallow_boiler', count: 2 }, { buildingTypeId: 'delium', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['small_birds', 'pigs', 'coal'], notes: ''
    },
    {
      id: 'lc_necklaces', outputGoodId: 'necklaces', region: 'latium',
      steps: [{ buildingTypeId: 'mineral_quarry', count: 3 }, { buildingTypeId: 'gold_mine', count: 10 }, { buildingTypeId: 'goldsmith', count: 4 }, { buildingTypeId: 'jeweller', count: 6 }, { buildingTypeId: 'charcoal_burner', count: 2.5 }],
      inputGoodIds: ['minerals', 'gold_ore', 'coal'], notes: ''
    },
    {
      id: 'lc_capes_lat', outputGoodId: 'capes', region: 'latium',
      steps: [{ buildingTypeId: 'copper_mine', count: 1 }, { buildingTypeId: 'greenhand', count: 3 }, { buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'birrus_tailor', count: 2 }],
      inputGoodIds: ['copper_ore', 'weld_plants', 'sheep'], notes: 'Copper from Albion import or local UNVERIFIED'
    },
    {
      id: 'lc_loungers', outputGoodId: 'loungers', region: 'latium',
      steps: [{ buildingTypeId: 'snail_breeder', count: 3 }, { buildingTypeId: 'dye_workshop', count: 4 }, { buildingTypeId: 'upholsterer', count: 3 }, { buildingTypeId: 'sandarak_grove', count: 3 }, { buildingTypeId: 'recliner_maker', count: 4 }, { buildingTypeId: 'sheep_farm', count: 1 }],
      inputGoodIds: ['purple_snails', 'sandarac_wood', 'sheep'], notes: ''
    },
    {
      id: 'lc_hand_mirrors_lat', outputGoodId: 'hand_mirrors', region: 'latium',
      steps: [{ buildingTypeId: 'silver_mine', count: 2 }, { buildingTypeId: 'silversmith', count: 4 }, { buildingTypeId: 'comb_shell_collector', count: 3 }, { buildingTypeId: 'narcissium', count: 8 }, { buildingTypeId: 'charcoal_burner', count: 3 }],
      inputGoodIds: ['silver_ore', 'scallop_shells', 'coal'], notes: ''
    },
    {
      id: 'lc_chariots_lat', outputGoodId: 'chariots', region: 'latium',
      steps: [{ buildingTypeId: 'lumberjack', count: 1 }, { buildingTypeId: 'reed_collector', count: 2 }, { buildingTypeId: 'frame_builder', count: 3 }, { buildingTypeId: 'horse_catcher', count: 3 }, { buildingTypeId: 'wagon_maker', count: 4 }],
      inputGoodIds: ['wood', 'reed', 'horses'], notes: 'Reed from Albion import or local UNVERIFIED'
    },
    {
      id: 'lc_lyres', outputGoodId: 'lyres', region: 'latium',
      steps: [{ buildingTypeId: 'gold_mine', count: 5 }, { buildingTypeId: 'goldsmith', count: 2 }, { buildingTypeId: 'sandarak_grove', count: 3 }, { buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'stringmaker', count: 3 }, { buildingTypeId: 'gilder', count: 2 }, { buildingTypeId: 'lyre_maker', count: 2 }],
      inputGoodIds: ['gold_ore', 'sandarac_wood', 'sheep', 'coal'], notes: ''
    },

    // ══ ALBION ══

    // — Infrastructure —
    {
      id: 'ab_boards', outputGoodId: 'boards', region: 'albion',
      steps: [{ buildingTypeId: 'lumberjack', count: 1 }, { buildingTypeId: 'sawmill', count: 1 }],
      inputGoodIds: ['wood'], notes: 'Same chain as Latium'
    },
    {
      id: 'ab_coal', outputGoodId: 'coal', region: 'albion',
      steps: [{ buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['wood'], notes: ''
    },
    {
      id: 'ab_tiles', outputGoodId: 'tiles', region: 'albion',
      steps: [{ buildingTypeId: 'mud_dryer', count: 2 }, { buildingTypeId: 'tiler', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['mud', 'coal'], notes: 'Uses Mud instead of Clay'
    },
    {
      id: 'ab_wattle_daub', outputGoodId: 'wattle_daub', region: 'albion',
      steps: [{ buildingTypeId: 'reed_collector', count: 1 }, { buildingTypeId: 'mud_dryer', count: 1 }, { buildingTypeId: 'artisan_house', count: 1 }],
      inputGoodIds: ['reed', 'mud'], notes: 'Albion-only construction material'
    },
    {
      id: 'ab_concrete', outputGoodId: 'concrete', region: 'albion',
      steps: [{ buildingTypeId: 'limestone_quarry', count: 2 }, { buildingTypeId: 'sand_refinery', count: 3 }, { buildingTypeId: 'concrete_mixer', count: 6 }],
      inputGoodIds: ['limestone', 'quartz_sand'], notes: 'Same as Latium chain UNVERIFIED: input availability in Albion'
    },
    {
      id: 'ab_granite', outputGoodId: 'granite', region: 'albion',
      steps: [{ buildingTypeId: 'granite_quarry', count: 3 }, { buildingTypeId: 'granite_cutter', count: 8 }],
      inputGoodIds: ['granite_blocks'], notes: 'Albion-only construction material'
    },
    {
      id: 'ab_ropes', outputGoodId: 'ropes', region: 'albion',
      steps: [{ buildingTypeId: 'hemp_farm', count: 1 }, { buildingTypeId: 'ropemaker', count: 2 }],
      inputGoodIds: ['hemp'], notes: ''
    },
    {
      id: 'ab_sails', outputGoodId: 'sails', region: 'albion',
      steps: [{ buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'sailmaker', count: 3 }],
      inputGoodIds: ['sheep'], notes: ''
    },
    {
      id: 'ab_weapons', outputGoodId: 'weapons', region: 'albion',
      steps: [{ buildingTypeId: 'iron_mine', count: 1 }, { buildingTypeId: 'furnace', count: 2 }, { buildingTypeId: 'weaponsmith', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1.25 }],
      inputGoodIds: ['iron_ore', 'coal'], notes: ''
    },
    {
      id: 'ab_armour', outputGoodId: 'armour', region: 'albion',
      steps: [{ buildingTypeId: 'iron_mine', count: 1 }, { buildingTypeId: 'furnace', count: 2 }, { buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'tannery', count: 2 }, { buildingTypeId: 'armorsmith', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1.25 }],
      inputGoodIds: ['iron_ore', 'coal', 'pigs', 'wood'], notes: 'Albion uses Wood instead of Salt in leather step UNVERIFIED'
    },

    // — Wader needs —
    {
      id: 'ab_reed_shoes', outputGoodId: 'reed_shoes', region: 'albion',
      steps: [{ buildingTypeId: 'reed_collector', count: 1 }, { buildingTypeId: 'shoe_weaver', count: 1 }],
      inputGoodIds: ['reed'], notes: ''
    },
    {
      id: 'ab_tunics', outputGoodId: 'tunics', region: 'albion',
      steps: [{ buildingTypeId: 'hemp_farm', count: 1 }, { buildingTypeId: 'spinner', count: 1 }],
      inputGoodIds: ['hemp'], notes: ''
    },

    // — Smith needs —
    {
      id: 'ab_cheese', outputGoodId: 'cheese', region: 'albion',
      steps: [{ buildingTypeId: 'ox_farm', count: 1 }, { buildingTypeId: 'dairy', count: 2 }],
      inputGoodIds: ['oxen'], notes: ''
    },
    {
      id: 'ab_beer', outputGoodId: 'beer', region: 'albion',
      steps: [{ buildingTypeId: 'barley_farm', count: 2 }, { buildingTypeId: 'malt_house', count: 1 }, { buildingTypeId: 'brewery', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['barley', 'coal'], notes: ''
    },
    {
      id: 'ab_trousers', outputGoodId: 'trousers', region: 'albion',
      steps: [{ buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'dye_workshop', count: 2 }, { buildingTypeId: 'trouser_maker', count: 3 }],
      inputGoodIds: ['sheep', 'dye_plants'], notes: 'Weld Plants / Dye Plants for colour'
    },
    {
      id: 'ab_torcs', outputGoodId: 'torcs', region: 'albion',
      steps: [{ buildingTypeId: 'copper_mine', count: 1 }, { buildingTypeId: 'wire_twister', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['copper_ore', 'coal'], notes: ''
    },
    {
      id: 'ab_drinking_horns', outputGoodId: 'drinking_horns', region: 'albion',
      steps: [{ buildingTypeId: 'tin_mine', count: 1 }, { buildingTypeId: 'ox_farm', count: 2 }, { buildingTypeId: 'horner', count: 4 }],
      inputGoodIds: ['tin_ore', 'oxen'], notes: ''
    },
    {
      id: 'ab_ceremonial_shields', outputGoodId: 'ceremonial_shields', region: 'albion',
      steps: [{ buildingTypeId: 'tin_mine', count: 1 }, { buildingTypeId: 'copper_mine', count: 1 }, { buildingTypeId: 'bronze_smelter', count: 4 }, { buildingTypeId: 'dye_workshop', count: 2 }, { buildingTypeId: 'shield_maker', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['tin_ore', 'copper_ore', 'dye_plants', 'coal'], notes: ''
    },
    {
      id: 'ab_bread', outputGoodId: 'bread', region: 'albion',
      steps: [{ buildingTypeId: 'wheat_farm', count: 2 }, { buildingTypeId: 'donkey_mill', count: 2 }, { buildingTypeId: 'bakery', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['wheat', 'coal'], notes: 'Donkey Mill instead of Water Mill'
    },
    {
      id: 'ab_sausages', outputGoodId: 'sausages', region: 'albion',
      steps: [{ buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'herb_garden', count: 3 }, { buildingTypeId: 'salsicium', count: 2 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['pigs', 'herbs', 'coal'], notes: ''
    },
    {
      id: 'ab_soap', outputGoodId: 'soap', region: 'albion',
      steps: [{ buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'tallow_boiler', count: 2 }, { buildingTypeId: 'lavendula_grower', count: 4 }, { buildingTypeId: 'soapmaker', count: 4 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['pigs', 'lavender', 'coal'], notes: ''
    },
    {
      id: 'ab_fibulae', outputGoodId: 'fibulae', region: 'albion',
      steps: [{ buildingTypeId: 'silver_mine', count: 1 }, { buildingTypeId: 'silversmith', count: 2 }, { buildingTypeId: 'fibulaium', count: 4 }, { buildingTypeId: 'charcoal_burner', count: 2 }],
      inputGoodIds: ['silver_ore', 'coal'], notes: ''
    },
    {
      id: 'ab_amphorae', outputGoodId: 'amphorae', region: 'albion',
      steps: [{ buildingTypeId: 'mud_dryer', count: 2 }, { buildingTypeId: 'resin_tapper', count: 2 }, { buildingTypeId: 'potter', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['mud', 'resin', 'coal'], notes: 'Mud instead of Clay'
    },

    // — Alderman / Noble needs —
    {
      id: 'ab_roast_beef', outputGoodId: 'roast_beef', region: 'albion',
      steps: [{ buildingTypeId: 'saltcabbage_collector', count: 3 }, { buildingTypeId: 'saltcabbage_burner', count: 2 }, { buildingTypeId: 'ox_farm', count: 2 }, { buildingTypeId: 'earth_oven', count: 4 }, { buildingTypeId: 'charcoal_burner', count: 1 }],
      inputGoodIds: ['saltcabbage', 'oxen', 'coal'], notes: ''
    },
    {
      id: 'ab_capes', outputGoodId: 'capes', region: 'albion',
      steps: [{ buildingTypeId: 'copper_mine', count: 1 }, { buildingTypeId: 'greenhand', count: 3 }, { buildingTypeId: 'sheep_farm', count: 1 }, { buildingTypeId: 'birrus_tailor', count: 2 }],
      inputGoodIds: ['copper_ore', 'weld_plants', 'sheep'], notes: ''
    },
    {
      id: 'ab_fur_hats', outputGoodId: 'fur_hats', region: 'albion',
      steps: [{ buildingTypeId: 'saltcabbage_collector', count: 3 }, { buildingTypeId: 'saltcabbage_burner', count: 2 }, { buildingTypeId: 'beaver_trapper', count: 3 }, { buildingTypeId: 'beaver_hatter', count: 4 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['saltcabbage', 'beaver', 'coal'], notes: ''
    },
    {
      id: 'ab_chariots', outputGoodId: 'chariots', region: 'albion',
      steps: [{ buildingTypeId: 'lumberjack', count: 1 }, { buildingTypeId: 'reed_collector', count: 2 }, { buildingTypeId: 'frame_builder', count: 3 }, { buildingTypeId: 'horse_catcher', count: 3 }, { buildingTypeId: 'wagon_maker', count: 4 }],
      inputGoodIds: ['wood', 'reed', 'horses'], notes: ''
    },
    {
      id: 'ab_wigs', outputGoodId: 'wigs', region: 'albion',
      steps: [{ buildingTypeId: 'flax_farm', count: 3 }, { buildingTypeId: 'resin_tapper', count: 2 }, { buildingTypeId: 'hairnet_weaver', count: 4 }, { buildingTypeId: 'horse_breeder', count: 4 }, { buildingTypeId: 'wig_weaver', count: 3 }],
      inputGoodIds: ['flax', 'resin', 'horses'], notes: ''
    },
    {
      id: 'ab_wine', outputGoodId: 'wine', region: 'albion',
      steps: [{ buildingTypeId: 'vineyard', count: 2 }, { buildingTypeId: 'beehive', count: 1 }, { buildingTypeId: 'winemaker', count: 1 }],
      inputGoodIds: ['grapes', 'honeycomb'], notes: 'Grapes imported from Latium or grown at reduced efficiency UNVERIFIED: native Albion fertility'
    },
    {
      id: 'ab_hand_mirrors', outputGoodId: 'hand_mirrors', region: 'albion',
      steps: [{ buildingTypeId: 'silver_mine', count: 2 }, { buildingTypeId: 'silversmith', count: 4 }, { buildingTypeId: 'comb_shell_collector', count: 3 }, { buildingTypeId: 'narcissium', count: 8 }, { buildingTypeId: 'charcoal_burner', count: 3 }],
      inputGoodIds: ['silver_ore', 'scallop_shells', 'coal'], notes: ''
    },
    {
      id: 'ab_fine_glass', outputGoodId: 'fine_glass', region: 'albion',
      steps: [{ buildingTypeId: 'mineral_quarry', count: 3 }, { buildingTypeId: 'mineral_crusher', count: 4 }, { buildingTypeId: 'sand_refinery', count: 3 }, { buildingTypeId: 'glass_melter', count: 6 }, { buildingTypeId: 'glassblower', count: 8 }, { buildingTypeId: 'charcoal_burner', count: 3.5 }],
      inputGoodIds: ['minerals', 'quartz_sand', 'coal'], notes: 'Same chain as Latium; Albion may require imports UNVERIFIED'
    },
    {
      id: 'ab_bird_tongues', outputGoodId: 'bird_tongues', region: 'albion',
      steps: [{ buildingTypeId: 'bird_catcher', count: 3 }, { buildingTypeId: 'tongue_puller', count: 4 }, { buildingTypeId: 'pig_farm', count: 1 }, { buildingTypeId: 'tallow_boiler', count: 2 }, { buildingTypeId: 'delium', count: 3 }, { buildingTypeId: 'charcoal_burner', count: 0.5 }],
      inputGoodIds: ['small_birds', 'pigs', 'coal'], notes: 'UNVERIFIED: whether this runs natively in Albion or requires imports'
    },
  ],

  // ─── FESTIVALS ───────────────────────────────────────────────────────────────
  // Amphitheatre events confirmed (Latium only, requires Patricians).
  // Hippodrome / Circus Maximus events are the Aug 2026 Hippodrome DLC — NOT base game.
  // Other in-game festivals (birthdays, seasonal) are UNVERIFIED — add when confirmed.

  festivals: [
    {
      id: 'local_gladiator_games',
      name: 'Local Gladiator Games',
      region: 'latium',
      triggerCondition: 'Manually started at completed Amphitheatre; requires weapons, food for audience, monetary cost, Patrician workforce',
      effect: 'Bonuses to happiness, productivity, prestige, knowledge. Splendor/glory buffs up to level 3. Buffs slowly expire and are renewed by hosting again.',
      duration: 'Timed; buffs decay after event ends', // UNVERIFIED: exact duration
      notes: 'Smallest of three Amphitheatre event tiers. Requires Patricians unlocked.'
    },
    {
      id: 'grand_gladiator_games',
      name: 'Grand Gladiator Games',
      region: 'latium',
      triggerCondition: 'Manually started at completed Amphitheatre; requires weapons, luxury goods, more resources than Local Games',
      effect: 'Bonuses to happiness, productivity, prestige, knowledge, military units. Splendor/glory buffs up to level 6.',
      duration: 'Timed; buffs decay after event ends', // UNVERIFIED: exact duration
      notes: 'Mid-tier Amphitheatre event. Repeating unlocks higher reward tiers.'
    },
    {
      id: 'great_naumachia',
      name: 'Great Naumachia',
      region: 'latium',
      triggerCondition: 'Manually started; requires weapons, luxury goods, aqueduct cistern nearby, significant monetary cost and Patrician workforce',
      effect: 'Large bonuses to happiness, productivity, prestige, knowledge, military, ships, trade income. Splendor/glory buffs up to level 9. At highest tier: prevents uprisings, increases festival frequency.',
      duration: 'Timed; buffs decay after event ends', // UNVERIFIED: exact duration
      notes: 'Largest Amphitheatre event. 3 Naumachiae required to unlock level 9 rewards. Ship battle spectacle in flooded arena.'
    },
  ],

};
