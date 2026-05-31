// views/settings-view.js — Settings tab (per save)
//
// Sections:
//   1. Island Manager
//   2. DLC Manager
//   3. Export / Import
//   4. Danger Zone (delete save)

const SettingsView = {

  // TODO: implement render(saveId)
  // Renders all four settings sections as an accordion or stacked card layout.
  render(saveId) {},

  // --- Island Manager ---

  // TODO: implement renderIslandManager(saveId)
  // List of islands with rename (inline edit) and delete (with confirm) per row.
  // "Add Island" row at the bottom: text input + region selector + confirm.
  renderIslandManager(saveId) {},

  // --- DLC Manager ---

  // TODO: implement renderDlcManager(saveId)
  // Toggle list sourced from DLC_REGISTRY.
  // Each row: DLC name | toggle switch
  // Activating adds DLC content to save; deactivating hides it but does NOT delete data.
  // Show a short count of what each DLC adds (goods, buildings) beneath its name.
  renderDlcManager(saveId) {},

  // TODO: implement handleDlcToggle(saveId, dlcId, enabled)
  // Updates save profile activeDlcIds via SavesService.update().
  handleDlcToggle(saveId, dlcId, enabled) {},

  // --- Export / Import ---

  // TODO: implement renderExportImport(saveId)
  // Export: button → triggers JSON download (SavesService.exportToJSON)
  // Import: file input → reads JSON, calls SavesService.importFromJSON,
  //         asks user whether to replace current save or create a new one.
  renderExportImport(saveId) {},

  // --- Danger Zone ---

  // TODO: implement renderDangerZone(saveId)
  // Single "Delete this save" button, red styling.
  // On tap → confirmation dialog → SavesService.delete → navigate to Save Manager.
  renderDangerZone(saveId) {},
};
