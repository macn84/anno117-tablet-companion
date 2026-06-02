# Game Content Data Files

Source of truth: [anno.land](https://anno.land/en/anno-117-datenbanken/)

## Files

- `base-game.js` — All base Anno 117 content (goods, production chains, building types, specialists, festivals, regions)
- `dlc/` — One file per DLC, same structure as base-game.js scoped to what that DLC adds

## Adding a new DLC

**Export a backup first** (Settings → Export Save or Export All Saves) before editing any data file.

1. Create `/data/dlc/dlc-XX-name.js` using the template in `/data/dlc/README.md`
2. Register it in `data/dlc-registry.js` (one import + one array entry — see the comments there)
3. The DLC will now appear in every save's DLC toggle list automatically

## Updating base game data

- **Only append** new entries — never edit or remove existing IDs
- Existing user data references content by ID; changing or removing an ID will orphan user records
- Mark uncertain data with `// UNVERIFIED` rather than guessing

## Conventions

- All IDs are kebab-case strings, e.g. `'iron-ore'`, `'trade-union'`
- Uncertain entries are marked `// UNVERIFIED` — cross-check against anno.land before relying on them
- Production chain ratios assume 100% efficiency with no specialist buffs unless noted
