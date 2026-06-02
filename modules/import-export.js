/**
 * @module import-export
 * @description JSON backup and restore for individual and bulk save files.
 *
 * Exports serialise user data only — no game content is included, making them
 * safe to share between devices regardless of which DLC files are installed.
 * Imports validate structure before applying and warn on DLC ID mismatches.
 *
 * Single-save and all-saves export/import are currently handled directly by
 * {@link module:save-manager~SaveManager}. This module will provide a richer
 * import UX (preview, conflict resolution, version migration) in Phase 3.
 *
 * @todo Phase 3 implementation pending.
 */

export const ImportExport = {};
