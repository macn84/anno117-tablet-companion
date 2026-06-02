# Contributing to Anno 117 Companion

Thank you for helping make this tool better for the Anno community.

There are three ways to contribute:

1. **Game data corrections** — fix errors or fill gaps in `base-game.js` or a DLC file
2. **DLC files** — add a new DLC data file when a DLC releases
3. **Code** — bug fixes, new features, UI improvements

---

## Game data corrections

The source of truth for all game data is [anno.land](https://anno.land/en/anno-117-datenbanken/).
Always cross-reference against anno.land before making a correction.

**Rules:**
- Never change or remove an existing `id` field — user save data references these IDs. Changing one
  orphans everyone's saved entries for that item.
- Only append new entries; never edit the structure of an existing object.
- Mark anything you are not certain about with `// UNVERIFIED` rather than guessing.
- If you are correcting a previously `// UNVERIFIED` entry, remove the comment when you have
  confirmed it against anno.land.

**To submit a correction:**
1. Fork the repository and create a branch: `fix/data-<what-you-fixed>`.
2. Edit `data/base-game.js` or the relevant DLC file.
3. In your pull request, note the anno.land URL or other source that confirms the correction.

---

## Adding a DLC file

When a new Anno 117 DLC releases, anyone can add its content to the app.

1. Export a full backup first — **Settings → Export All Saves** — so you have a fallback.
2. Read [data/dlc/README.md](data/dlc/README.md) for the file template and structure.
3. Create `data/dlc/dlc-XX-name.js` where `XX` is the next sequential number.
4. Register it in `data/dlc-registry.js` (one import + one array entry — see the comments there).
5. Open a pull request with your new file. Add a note about your sources and any fields marked
   `// UNVERIFIED` that you'd like help confirming.

**Tips:**
- Focus on accuracy over completeness — a shorter list of verified entries is more valuable than a
  long list with errors.
- It is fine to open a PR with some fields as `// UNVERIFIED` and let the community help fill them in.
- Production chain ratios should assume 100% efficiency with no specialist buffs unless noted.

---

## Code contributions

The app is vanilla ES modules — no build step, no bundler, no framework. If you can serve a
directory over HTTP you can develop it.

**Running locally:**

```bash
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080` in Chrome. Service worker and PWA install require HTTPS or localhost.

**Guidelines:**
- Keep it vanilla — no bundlers, no npm dependencies in production code.
- Test on a real touch device (or Chrome DevTools mobile emulation) before opening a PR.
- Minimum tap target: 48px. Dark theme throughout.
- All game content lives in data files — app logic must never hardcode game content.

**To submit a code change:**
1. Fork the repository and create a branch: `feature/<name>` or `fix/<name>`.
2. Make your changes and test them locally.
3. Open a pull request with a description of what changed and why.

---

## Reporting bugs or missing data

Open an issue on GitHub. For data issues, include the anno.land URL that shows the correct value.
For bugs, include steps to reproduce and the device/browser you are using.

---

## Data sources

- [anno.land](https://anno.land/en/anno-117-datenbanken/) — primary source of truth for all game content
- [anno.land production chains](https://anno.land/en/anno-117-tools/produktionsketten/)
- [anno.land specialists](https://anno.land/en/anno-117-datenbanken/spezialisten-items/)
