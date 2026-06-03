/**
 * @module import-export
 * @description Download helpers for single-save and all-saves JSON export.
 * Delegates serialisation to SaveManager; this module handles file I/O only.
 */

import { SaveManager } from './save-manager.js';

export const ImportExport = {

  /**
   * Triggers a JSON file download for all saves as a single backup bundle.
   * Filename includes today's date for easy identification.
   * @returns {void}
   */
  downloadAllSaves() {
    const json = SaveManager.exportAllToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anno117-all-saves-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Imports all saves from a JSON string produced by downloadAllSaves.
   * @param {string} jsonString
   * @returns {Array} Imported save profiles.
   * @throws {Error} If the JSON is invalid or missing the saves array.
   */
  importAllSaves(jsonString) {
    return SaveManager.importAllFromJSON(jsonString);
  },
};
