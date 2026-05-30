# Anno 117 Companion App — Claude Code Project Brief

## Background & Context

This app is a companion tool for **Anno 117: Pax Romana**, designed to sit on a
Samsung Android tablet beside a PC gaming monitor. The player has one monitor and
cannot alt-tab during play, so this app replaces the specialist overview and
storage statistics screens that existed in Anno 1800 but are absent in Anno 117.

No equivalent mod currently exists for Anno 117. This app fills that gap as an
external reference and tracking tool.

---

## Overview

Build a companion app for Anno 117: Pax Romana to run on a Samsung Android tablet.
The user plays on a separate PC with one monitor, so this app sits beside them as a
live reference tool during gameplay.

Deliver as a **PWA (Progressive Web App)** that can be installed from Chrome on
Android via "Add to Home Screen". Must work fully offline after first load. Should
feel like a native app — no browser chrome visible when launched from home screen.

---

## Core Design Philosophy

- Data accuracy matters more than data completeness at launch
- The app must never lose user data when content is updated
- All game content (specialists, goods, buildings, festivals, production chains) lives
  in swappable data files — app logic never hardcodes game content
- [anno.land](https://anno.land/en/anno-117-datenbanken/) is the source of truth for
  game data and should be referenced in all developer documentation

---

## Data Architecture

### Two Distinct Data Layers — Keep These Completely Separate

#### Layer 1: Game Content (Reference Data)

Defined in data files. Never modified by user interaction. Contains everything known
about the game itself:

- All specialists (name, rarity, category, effect description, valid slot types)
- All goods (name, category, region availability)
- All production chains (inputs, outputs, building requirements, ratios)
- All building types (name, category, specialist slots, region)
- All festivals (name, effect, trigger conditions)
- All regions (Latium, Albion — and DLC regions when added)

#### Layer 2: User Data (Save File Data)

Stored in IndexedDB. Everything the user tracks about their actual game:

- Save file profiles
- Their islands and what they've named them
- Which specialists they own and where they've assigned them
- Their storage notes per island per good
- Which DLCs they have active per save

These two layers must never be coupled. Updating game content files must never
touch, overwrite, or invalidate user data.

---

## File Structure

```
/
├── index.html
├── manifest.json              ← PWA manifest
├── sw.js                      ← Service worker for offline support
├── app.js                     ← App shell, routing, IndexedDB init
├── styles.css
│
├── data/
│   ├── README.md              ← How to update data when DLC releases
│   ├── base-game.js           ← All base Anno 117 content (see spec below)
│   └── dlc/
│       └── README.md          ← Template and instructions for adding a DLC file
│
├── modules/
│   ├── save-manager.js        ← Save file CRUD
│   ├── specialist-tracker.js
│   ├── goods-tracker.js
│   ├── building-tracker.js
│   ├── festival-tracker.js
│   ├── production-ref.js      ← Read-only production chain reference viewer
│   └── import-export.js       ← JSON backup/restore
│
└── components/
    ├── bottom-nav.js
    ├── modal.js
    └── toast.js
```

---

## base-game.js Specification

Populate this file as completely and accurately as possible using known Anno 117
base game data. Where data is uncertain or incomplete, add a comment flagging it
rather than guessing. Structure as follows:

```javascript
export const BASE_GAME = {

  regions: [
    { id: 'latium', name: 'Latium' },
    { id: 'albion', name: 'Albion' }
  ],

  goods: [
    // Each good:
    // { id, name, category, regions: ['latium', 'albion'] }
    // Categories: Food, Construction, Luxury, Military, Raw Material, Trade Good
  ],

  productionChains: [
    // Each chain:
    // {
    //   id, outputGoodId, region,
    //   steps: [
    //     { buildingTypeId, count, inputGoodIds: [] }
    //   ],
    //   notes: ''   // e.g. "ratios at 100% efficiency, no specialist buffs"
    // }
  ],

  buildingTypes: [
    // Each building:
    // { id, name, category, regions, specialistSlots: 0, canHoldSpecialist: true/false }
    // Categories: Production, Military, Civic, Religious, Storage, Trade, Ornamental
  ],

  specialists: [
    // Each specialist:
    // { id, name, rarity, category, effect, validSlots: [], regions: [] }
    // Rarity: Common, Rare, Epic, Legendary
    // Category: Economy, Military, Culture, Religion, Research, Seafaring, Nature, Finance
    // validSlots: building type IDs where this specialist can be placed
  ],

  festivals: [
    // Each festival:
    // { id, name, region, effect, triggerCondition, duration, notes }
  ]

};
```

Add this comment block at the top of the file after generating it:

```javascript
// Base game data last verified: [date]
// Source: anno.land/en/anno-117-datenbanken/
// Completeness: [note any known gaps]
```

> **Note:** There are 382+ specialists in the base game. Populate as many as
> possible with confidence. Flag uncertain entries with a `// UNVERIFIED` comment
> rather than omitting or guessing. Users can add custom specialists in-app for
> anything missing.

---

## DLC System

Each DLC is a separate file in `/data/dlc/` with an identical structure to
`base-game.js` but scoped to only what that DLC adds.

Example: `/data/dlc/dlc-01-name.js`

```javascript
export const DLC_01 = {
  id: 'dlc-01',
  name: 'DLC Name Here',
  releaseDate: '',
  regions: [],           // New regions this DLC adds, if any
  goods: [],             // New goods only
  productionChains: [],
  buildingTypes: [],
  specialists: [],
  festivals: []
};
```

The app merges active DLC data with base game data at runtime per save file.
Deactivating a DLC hides its content from the UI but **never deletes** user entries
that reference it — those entries are preserved and flagged as `(DLC inactive)`.

### `/data/README.md` Must Include

- Step-by-step instructions for adding a new DLC file
- Link to anno.land as the reference database
- Warning never to edit existing base-game.js entries (only append)
- Instructions for JSON export backup before making any data changes

---

## Save File System

Each save file is fully isolated. No data leaks between saves. Structure stored in
IndexedDB:

```javascript
{
  id: uuid,
  name: 'Campaign - Latium',
  createdAt: timestamp,
  updatedAt: timestamp,
  activeDlcIds: ['dlc-01'],

  islands: [
    { id: uuid, name: 'Main Island', region: 'latium', notes: '' }
  ],

  specialistAssignments: [
    {
      id: uuid,
      specialistId: 'from-base-game-or-dlc',  // references game content id
      customName: '',       // if user renames or adds an unlisted one
      isCustom: false,      // true if user added a specialist not in data files
      rarity: '',           // only needed if isCustom: true
      category: '',         // only needed if isCustom: true
      islandId: uuid,
      structure: '',        // e.g. "Trade Union", "North Harbour", "Ship - Aquila"
      notes: ''
    }
  ],

  goodsTracking: [
    {
      islandId: uuid,
      goodId: 'from-base-game-or-dlc',
      trend: 'surplus' | 'stable' | 'deficit' | 'not-produced',
      stockNote: '',        // free text, e.g. "~200t" or "critically low"
      updatedAt: timestamp
    }
  ],

  buildingNotes: [
    {
      islandId: uuid,
      buildingTypeId: 'from-base-game-or-dlc',
      count: 0,
      notes: ''
    }
  ]
}
```

---

## App Screens & Navigation

### Home Screen — Save File Manager

- List of all saves, sorted by last modified
- Each card shows: name, regions active, DLCs active, last modified
- Per card buttons: Open, Export JSON, Delete (with confirmation)
- FAB (floating action button): Create New Save

### Create Save Flow

1. Name the save
2. Select active DLCs (checkboxes)
3. Add initial islands (skippable — can add later in Settings)
4. Creates save and enters dashboard

### Save Dashboard — Bottom Tab Navigation

Tabs: **Overview | Specialists | Goods | Buildings | Festivals | Reference | Settings**

---

#### Overview Tab

- Island list with at-a-glance status
- Count of unassigned specialists
- Any goods currently in deficit (pulled from goods tracking)
- Quick-add buttons for common actions

---

#### Specialists Tab

- Full list of assigned specialists, grouped by island
- Filter bar: rarity / category / island / unassigned
- Tap specialist → edit assignment, location, notes
- Add button → search/select from known specialists list OR add custom entry
- Visual rarity colour coding:
  - Common = grey
  - Rare = blue
  - Epic = purple
  - Legendary = gold

---

#### Goods Tab

- Two views toggled by a button:
  - **By Island** (default) — one island at a time, full goods list
  - **Summary Table** — all islands × all goods, cells show trend + note
- Tap any cell → quick-update popover (trend selector + stock note field)
- Filter: show only deficit / surplus / a specific category
- Trend indicators: ▲ Surplus | ▬ Stable | ▼ Deficit | — Not Produced

---

#### Buildings Tab

- Per island: list of building types present, count, specialist slot notes
- Useful for knowing which islands have Trade Unions, Officiums, Harbours, etc.
- Tap row to edit count or add notes

---

#### Festivals Tab

- List of all festivals from base game + active DLCs
- Per festival: toggle "active on this save" and add personal timing notes
- Reference info (effect, trigger condition) pulled from data files and displayed
  as read-only context

---

#### Reference Tab (read-only)

A searchable in-app wiki for all game content relevant to active DLCs.

Sub-sections:
- **Specialists** — full list with rarity, category, effect, valid slots
- **Goods** — list with category and region availability
- **Production Chains** — select a good, see the full chain with building ratios
- **Buildings** — list with specialist slot count and region
- **Festivals** — full list with effects and trigger conditions

No editing in this tab. This is a lookup tool only, replacing the need to
alt-tab to a browser during gameplay.

---

#### Settings Tab

- **Island Manager** — add, rename, delete islands (delete warns if specialists
  or goods are assigned to it)
- **DLC Manager** — toggle active DLCs for this save
- **Export Save** — downloads this save as a JSON file
- **Import Save** — restore from a previously exported JSON file
- **Export All Saves** — full backup of every save as one JSON file
- **Danger Zone** — Delete This Save (double confirmation required)

---

## UX & Tablet Requirements

- Minimum tap target: 48px
- Dark theme throughout (easier in a dim gaming room)
- Bottom tab bar always visible within a save
- Modals for: create save, add specialist, quick-update goods cell, confirmations
- Toast notifications for: saved, deleted, exported, import success, errors
- No hover-dependent interactions anywhere
- Font size minimum 14px body, 18px+ headers
- Search and text inputs sized for on-screen keyboard use
- Portrait orientation primary (how the tablet will sit beside the monitor)

---

## Import / Export

- Export single save as JSON (user data only — not game content)
- Export all saves as single JSON (full backup)
- Import: validates JSON structure before applying, never silently overwrites
- Import warns if the JSON references DLC IDs not present in current data files
- Import handles version mismatches gracefully with a clear warning message

---

## PWA Requirements

`manifest.json` must include:
- `name`: "Anno 117 Companion"
- `short_name`: "Anno 117"
- `display`: "standalone"
- `orientation`: "portrait"
- `theme_color`: dark colour matching app theme
- `background_color`: matching splash screen
- Icons at 192×192 and 512×512 (generate simple placeholder icons if needed)

`sw.js` service worker:
- Cache-first strategy for all app shell files and data files
- App must be fully functional with zero network connection after first load
- Cache versioning so updates invalidate old cache cleanly

---

## README.md (Project Root)

Must include:

1. **Installation** — How to install on Android tablet via Chrome → Add to Home Screen
2. **Adding a DLC** — Step-by-step: create `/data/dlc/dlc-XX-name.js`, follow the
   template, register it in `app.js`, export a backup first
3. **Updating base game data** — How to safely append new entries to `base-game.js`
   without touching existing IDs
4. **Backup & Restore** — How to use Export/Import to move saves between devices
5. **Data source** — anno.land (https://anno.land/en/anno-117-datenbanken/) is the
   reference database for all game content
6. **Known gaps** — Note that specialist and goods data was seeded from community
   sources and may have gaps. Users can add custom specialists in-app for anything
   missing from the data files.

---

## Additional Notes for Claude Code

- Use IndexedDB (not localStorage) — the volume of specialist and goods data across
  multiple saves will exceed localStorage limits
- The production chain reference viewer is read-only and does not need to be
  editable by the user
- When seeding `base-game.js`, prioritise accuracy over completeness — a shorter
  verified list is better than a longer list with errors
- Cross-reference production chain ratios against:
  https://anno.land/en/anno-117-tools/produktionsketten/
- Cross-reference specialist data against:
  https://anno.land/en/anno-117-datenbanken/spezialisten-items/
- Mark any data point you are not fully confident in with `// UNVERIFIED` so the
  user knows to double-check it against anno.land before relying on it