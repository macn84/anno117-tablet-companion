# Anno 117 Companion

An offline tablet companion for **Anno 117: Pax Romana**.

If you play Anno 117 on one monitor and can't alt-tab during a session, this app sits on a
tablet or second device beside your screen as a live reference tool — tracking your specialists,
goods, and buildings without interrupting gameplay.

Built as a PWA (Progressive Web App). Install it to your Android tablet's home screen from Chrome
and it works fully offline, no internet connection needed after the first load.

> Data is sourced from [anno.land](https://anno.land/en/anno-117-datenbanken/), the community's
> go-to reference database. If you spot an error, please open an issue or a pull request — see
> [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Features

- **Save File Manager** — create and switch between independent profiles, one per playthrough
- **Specialist Tracker** — log your specialists with rarity, category, island, and slot assignment
- **Goods Tracker** — mark each good per island as Surplus / Stable / Deficit / Not Produced
- **Building Tracker** — record which structures each island has and their specialist slots
- **Festival Tracker** — toggle active festivals and add personal timing notes
- **Reference Tab** — searchable read-only wiki: specialists, goods, production chains, buildings, festivals
- **DLC Manager** — toggle DLC content per save; your data is preserved even when a DLC is hidden

---

## Installing on an Android tablet

1. Open Chrome and navigate to the app URL.
2. Tap the browser menu → **Add to Home Screen**.
3. The app launches in standalone mode — no browser address bar or tabs.

Works on any modern browser that supports PWA installation. iOS Safari is supported but install
behaviour differs (use "Add to Bookmark" from the share sheet).

---

## Running locally (development)

No build step required. Serve the project directory over HTTP:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` in Chrome. Service worker and PWA install require HTTPS or
localhost — both of the above satisfy this.

---

## Hosting on GitHub Pages

GitHub Pages serves over HTTPS by default, so service workers and the PWA install prompt work
out of the box.

1. Go to your repository **Settings → Pages**.
2. Under **Source**, select the branch to publish (e.g. `main`) and root folder (`/`), then save.
3. The site will be available at `https://<your-username>.github.io/<repo>/`.

A GitHub Actions workflow at [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
auto-deploys the `main` branch on every push.

---

## File structure

```
index.html              App shell
manifest.json           PWA manifest (icons, display mode, orientation)
sw.js                   Service worker — cache-first, full offline support
styles.css              Global styles, dark theme, CSS custom properties
app.js                  Entry point: service worker registration, routing

data/
  README.md             How to add a DLC or update base game data
  base-game.js          All base Anno 117 content (goods, chains, buildings, specialists, festivals)
  dlc-registry.js       Registry of active DLC modules
  dlc/
    README.md           DLC file template and step-by-step instructions
    dlc-XX-name.js      One file per DLC

modules/
  save-manager.js       Save file CRUD
  islands.js            Island CRUD per save
  specialist-tracker.js Specialist assignments
  goods-tracker.js      Goods trend tracking per island
  building-tracker.js   Building counts and notes per island
  festival-tracker.js   Festival active/inactive state and notes
  production-ref.js     Read-only production chain reference viewer
  import-export.js      JSON backup and restore

components/
  bottom-nav.js         Bottom tab bar
  modal.js              Generic bottom-sheet modal
  toast.js              Toast notifications

views/
  save-manager.js       Home screen: list / create / delete saves
  dashboard.js          Per-save shell + bottom tab router
  specialists-view.js   Specialist Tracker tab
  goods-view.js         Goods Tracker tab
  buildings-view.js     Building Tracker tab
  festivals-view.js     Festival Tracker tab
  reference-view.js     Read-only reference wiki tab
  settings-view.js      Island Manager, DLC toggles, Export/Import, Delete Save
```

---

## Adding a new DLC

See [data/dlc/README.md](data/dlc/README.md) for the full template and step-by-step instructions.

Short version:
1. Export a backup first — **Settings → Export All Saves**.
2. Create `data/dlc/dlc-XX-name.js` using the template.
3. Import it in `data/dlc-registry.js` and add it to the `DLC_REGISTRY` array.

No other code changes needed. Existing save data is never affected.

---

## Backup & restore

- **Settings → Export Save** — download one save as JSON.
- **Settings → Export All Saves** — full backup of every save in one file.
- **Settings → Import Save** — restore on the same device or transfer to another.

Export files contain user data only (no game content). Safe to share between devices.

---

## Data storage

All user data is stored in **localStorage** under namespaced keys, isolated per save file.
No data leaks between saves. Updating game content files never touches user data.

---

## Known gaps

Specialist and goods data in `base-game.js` was assembled from community sources and may have gaps
or inaccuracies. Uncertain entries are marked `// UNVERIFIED` in the data file.

- Use **Add Custom Specialist** in-app for anything missing from the data files.
- Cross-reference against [anno.land](https://anno.land/en/anno-117-datenbanken/).
- If you spot an error or have better data, please contribute — see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Contributing

Contributions are very welcome — game data corrections, DLC files, bug fixes, and new features.
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT — see [LICENSE](LICENSE).  
Game content (Anno 117: Pax Romana) is the property of Ubisoft. This project is an unofficial
fan tool and is not affiliated with or endorsed by Ubisoft.
