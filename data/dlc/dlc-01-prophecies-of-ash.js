// DLC data last verified: 2026-05-30
// Source: anno.land/en/anno-117-datenbanken/
// Secondary sources: anno-union.com devblogs, news.ubisoft.com, Xbox Wire
// Completeness: production chain building names unverified (in-game UI names not confirmed in public sources);
//               specialist pool from Caecilia is 40+ fertility items — only the three named ones are listed;
//               no Albion content in this DLC

export const DLC_01 = {
  id: 'dlc-01',
  name: 'Prophecies of Ash',
  releaseDate: '2026-04-30',

  regions: [
    // Expands Latium northward — no new named region, but adds new islands to Latium
    // { id: 'cinis', name: 'Cinis', baseRegion: 'latium' }  // UNVERIFIED: treated as island, not separate region
  ],

  goods: [
    {
      id: 'good-obsidian',
      name: 'Obsidian',
      category: 'raw-material',
      regions: ['latium'],
      notes: 'By-product of quarries/pits after volcanic eruption; also collected from fallen rocks during Eruption phase. Finite per cycle — replenishes each eruption. Used as trade currency with Caecilia and as input for Statuettes and Latrunculi Sets.',
    },
    {
      id: 'good-coal', // UNVERIFIED: confirm exact in-game good name
      name: 'Coal',
      category: 'raw-material',
      regions: ['latium'],
      notes: 'Produced by Coal Mines (mountain slot building unlocked via Vulcan deity at Veneration level). No fertility requirement — can be built on any mountain slot province-wide. // UNVERIFIED: confirm whether coal is a standalone good or an intermediate',
    },
    {
      id: 'good-statuettes',
      name: 'Statuettes',
      category: 'consumer-good',
      regions: ['latium'],
      notes: 'Optional Household need for Equites (Tier 3) and Patricians. Inputs: Obsidian + Limestone.',
    },
    {
      id: 'good-latrunculi-sets',
      name: 'Latrunculi Sets',
      category: 'consumer-good',
      regions: ['latium'],
      notes: 'Culture need for Patricians (Tier 4). Roman board game. Inputs: Gold + Sandarac Wood + Obsidian.',
    },
  ],

  productionChains: [
    {
      id: 'chain-statuettes',
      name: 'Statuettes',
      output: 'good-statuettes',
      steps: [
        { good: 'good-obsidian', source: 'volcanic by-product (quarries/pits)' },
        { good: 'limestone', source: 'base-game quarry' }, // limestone is a base-game good
        { building: 'Statuette Workshop', inputs: ['good-obsidian', 'limestone'], output: 'good-statuettes' }, // UNVERIFIED: building name
      ],
    },
    {
      id: 'chain-latrunculi-sets',
      name: 'Latrunculi Sets',
      output: 'good-latrunculi-sets',
      steps: [
        { good: 'gold', source: 'base-game gold smelter chain' },
        { good: 'sandarac-wood', source: 'base-game production' }, // UNVERIFIED: confirm Sandarac Wood is base-game
        { good: 'good-obsidian', source: 'volcanic by-product' },
        { building: 'Latrunculi Workshop', inputs: ['gold', 'sandarac-wood', 'good-obsidian'], output: 'good-latrunculi-sets' }, // UNVERIFIED: building name
      ],
    },
  ],

  buildingTypes: [
    {
      id: 'building-coal-mine',
      name: 'Coal Mine',
      category: 'production',
      regions: ['latium'], // can be placed on any mountain slot province-wide
      specialistSlots: null, // UNVERIFIED
      canHoldSpecialist: false, // UNVERIFIED
      notes: 'Requires Vulcan deity at Veneration level to unlock. Placed in mountain slots; no fertility requirement.',
    },
    {
      id: 'building-shrine-of-vulcan',
      name: 'Shrine of Vulcan', // UNVERIFIED: exact in-game name (also referred to as "Temple of Vulcan" in press)
      category: 'religion',
      regions: ['latium'],
      specialistSlots: null, // UNVERIFIED
      canHoldSpecialist: false, // UNVERIFIED
      notes: 'New deity building. Unlocked via research tree. Provides tiered worship buffs: Invocation = fire safety; Veneration = unlocks Coal Mines; Exalted Patron = strong area buffs for smelters. Also boosts mountain slot productivity and workforce generation from residences.',
    },
    {
      id: 'building-statuette-workshop',
      name: 'Statuette Workshop', // UNVERIFIED: exact in-game building name
      category: 'production',
      regions: ['latium'],
      specialistSlots: null, // UNVERIFIED
      canHoldSpecialist: null, // UNVERIFIED
      notes: 'Produces Statuettes from Obsidian + Limestone. Household good for Equites/Patricians (Tier 3).',
    },
    {
      id: 'building-latrunculi-workshop',
      name: 'Latrunculi Workshop', // UNVERIFIED: exact in-game building name
      category: 'production',
      regions: ['latium'],
      specialistSlots: null, // UNVERIFIED
      canHoldSpecialist: null, // UNVERIFIED
      notes: 'Produces Latrunculi Sets from Gold + Sandarac Wood + Obsidian. Culture good for Patricians (Tier 4).',
    },
  ],

  specialists: [
    {
      id: 'spec-gisella-wine-whisperer',
      name: 'Gisella, Wine Whisperer',
      rarity: null, // UNVERIFIED
      category: 'fertility',
      effect: 'Boosts grape fertility on the island.',
      validSlots: ['farm'], // UNVERIFIED: exact slot type
      regions: ['latium'],
      source: 'Trader Caecilia (Cinis harbour) — costs Obsidian',
    },
    {
      id: 'spec-seasoned-snatcher',
      name: 'Seasoned Snatcher',
      rarity: null, // UNVERIFIED
      category: 'fertility',
      effect: '+75% Sturgeon fertility to river slots in range.',
      validSlots: ['river-slot'],
      regions: ['latium'],
      source: 'Trader Caecilia (Cinis harbour) — costs Obsidian',
    },
    {
      id: 'spec-caderina',
      name: 'Caderina, of Extraordinary Prospects',
      rarity: null, // UNVERIFIED
      category: 'fertility',
      effect: 'Adds a full silver deposit to the mountain range in range; +25% productivity for mountain slot buildings in range.',
      validSlots: ['mountain-slot'],
      regions: ['latium'],
      source: 'Trader Caecilia (Cinis harbour) — costs Obsidian',
    },
    // NOTE: Caecilia offers 40+ fertility specialists total; only the three named in official sources are listed above.
    // Additional specialists should be added when anno.land database is updated with full DLC specialist list.
  ],

  festivals: [],

  // Additional DLC mechanics (not fitting standard schema fields)
  volcanoMechanics: {
    island: 'Cinis',
    phases: [
      {
        id: 'phase-calm',
        name: 'Calm',
        effect: 'Volcano dormant. No buffs or debuffs.',
      },
      {
        id: 'phase-prelude',
        name: 'Prelude (Tremors)',
        effect: 'Light tremors; possible light building damage near volcano.',
      },
      {
        id: 'phase-eruption',
        name: 'Eruption',
        effect: 'All mountain slot production halted province-wide. Falling rocks damage buildings, land units, and ships across the whole island.',
      },
      {
        id: 'phase-volcanic-winter',
        name: 'Volcanic Winter',
        effect: 'Farm and fishery productivity -75%. Happiness, health, and fire safety -3 on all buildings. Obsidian deposits in quarries/pits replenish.',
      },
      {
        id: 'phase-bloom',
        name: 'Bloom',
        effect: 'All farm buildings gain productivity buff based on current Soil Level. Happiness +2 province-wide.',
      },
    ],
    soilLevel: {
      default_max: 3,
      research_max: 5,
      buff_per_level: '10% farm productivity',
      notes: 'Soil Level increases by 1 after every eruption, province-wide across all of Latium. Can be toggled off; soil level decays when volcano is inactive.',
    },
    cycleDuration: {
      min_between_eruptions_hours: 8,
      max_between_eruptions_hours: 15,
      max_eruption_plus_winter_minutes: 140,
    },
    toggle: 'Volcano eruption cycle can be disabled at any time. Disabling stops destruction phases but also prevents Bloom buffs and Obsidian replenishment once existing deposits are depleted.',
  },
};
