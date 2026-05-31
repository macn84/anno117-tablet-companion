# Adding a DLC File

Source of truth: [anno.land](https://anno.land/en/anno-117-datenbanken/)

**Export a backup first** (Settings → Export All Saves) before creating a new DLC file.

## Template

Copy this template to `/data/dlc/dlc-XX-name.js`, replacing `XX` with the next sequential number
and `name` with a short kebab-case name:

```javascript
// DLC data last verified: [date]
// Source: anno.land/en/anno-117-datenbanken/
// Completeness: [note any known gaps]

export const DLC_XX = {
  id: 'dlc-XX',           // must be unique across all DLC files
  name: 'DLC Name Here',
  releaseDate: '',

  regions: [],            // new regions this DLC adds, if any

  goods: [
    // { id, name, category, regions: ['latium', 'albion', ...] }
  ],

  productionChains: [
    // same structure as base-game.js productionChains
  ],

  buildingTypes: [
    // { id, name, category, regions, specialistSlots, canHoldSpecialist }
  ],

  specialists: [
    // { id, name, rarity, category, effect, validSlots, regions }
  ],

  festivals: [
    // { id, name, region, effect, triggerCondition, duration, notes }
  ]
};
```

## Registering the DLC

After creating the file, add one line to `app.js`:

```javascript
import { DLC_XX } from './data/dlc/dlc-XX-name.js';
```

Then add `DLC_XX` to the `ALL_DLCS` array in the same file. That is the only code change needed.

## Rules

- Never edit IDs in existing DLC files — user data references them
- Only add content that is genuinely new in the DLC (no duplicating base game entries)
- Mark uncertain entries `// UNVERIFIED`
