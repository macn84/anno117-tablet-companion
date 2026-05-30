# Anno 117 Companion

Offline tablet companion app for **Anno 117: Pax Romana**.  
Built as a PWA — install to your Android tablet's home screen, works fully offline.

Fills the gap left by Anno 117's missing specialist overview and storage statistics screens.  
Designed to sit beside a PC monitor; no alt-tabbing required.

## Features

- **Save File Manager** — create and switch between independent save profiles
- **Specialist Tracker** — log specialists with rarity, category, and island assignment
- **Goods Tracker** — track Surplus / Stable / Deficit per good per island
- **Building Tracker** — record which structures each island has and their specialist slots
- **Festival Tracker** — toggle active festivals and add personal timing notes
- **Reference Tab** — searchable read-only wiki: specialists, goods, production chains, buildings, festivals
- **DLC Manager** — toggle DLC content per save; user data is preserved when DLCs are hidden

## Installing on Android tablet

1. Serve the app over HTTPS (or use localhost for development).
2. Open Chrome and navigate to the URL.
3. Tap the browser menu → **Add to Home Screen**.
4. The app launches in standalone mode with no browser chrome.

## Development

No build step required. Serve the directory locally:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Service worker and PWA install require HTTPS or localhost.

## File structure

```
index.html              App shell + script loader
manifest.json           PWA manifest (icons, display mode, orientation)
sw.js                   Service worker — cache-first, full offline support
styles.css              Global styles, dark theme, CSS custom properties
app.js                  Entry point: IndexedDB init, DLC registration, routing

data/
  README.md             How to add a DLC or update base game data
  base-game.js          All base Anno 117 content (goods, chains, buildings, specialists, festivals)
  dlc/
    README.md           DLC file template and registration instructions
    dlc-XX-name.js      One file per DLC (add here when a new DLC releases)

modules/
  save-manager.js       Save file CRUD
  islands.js            Island CRUD per save
  specialist-tracker.js Specialist CRUD and filtering
  goods-tracker.js      Goods trend tracking per island
  building-tracker.js   Building tracker per island
  festival-tracker.js   Festival active/inactive state and notes
  production-ref.js     Read-only production chain reference viewer
  import-export.js      JSON backup and restore

components/
  bottom-nav.js         Bottom tab bar (within a save dashboard)
  modal.js              Generic modal
  toast.js              Toast notifications

views/
  save-manager.js       Home screen: list / create / delete saves
  dashboard.js          Per-save shell + bottom tab router
  specialists-view.js   Specialist Tracker tab
  goods-view.js         Goods / Storage Tracker tab
  buildings-view.js     Building Tracker tab
  festivals-view.js     Festival Tracker tab
  reference-view.js     Read-only reference wiki tab
  settings-view.js      Island Manager, DLC toggles, Export/Import, Delete Save
```

## Adding a new DLC

See [data/dlc/README.md](data/dlc/README.md) for the full template and step-by-step instructions.

Short version:
1. Export a backup (Settings → Export All Saves).
2. Create `data/dlc/dlc-XX-name.js` using the template.
3. Register it in `app.js` — one import and one array entry.

No other code changes needed. Existing save data is never affected.

## Backup & restore

Use **Settings → Export Save** to download a save as JSON, or **Export All Saves** for a full backup.  
Use **Settings → Import Save** to restore on the same device or transfer to another.

Export files contain user data only — not game content. They are safe to share.

## Data storage

All user data is stored in **IndexedDB** under namespaced keys, isolated per save file.  
No data leaks between saves. Updating game content files never touches user data.

## Known gaps

Specialist and goods data in `base-game.js` was seeded from community sources and may have gaps.  
Uncertain entries are marked `// UNVERIFIED` in the data file.  
Use **Add Custom Specialist** in-app for anything missing from the data files.  
Cross-reference: [anno.land](https://anno.land/en/anno-117-datenbanken/)
