/**
 * @module settings-view
 * @description Settings tab: Island Manager, Export/Import, and Danger Zone.
 * DLC Manager is a placeholder pending Phase 3 implementation.
 */

import { BASE_GAME } from '../data/base-game.js';
import { IslandsService } from '../modules/islands.js';
import { SaveManager } from '../modules/save-manager.js';
import { ImportExport } from '../modules/import-export.js';
import { DLC_REGISTRY } from '../data/dlc-registry.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const SettingsView = {
  _saveId: null,
  _container: null,
  _onBack: null,
  _editingIslandId: null,

  /**
   * Renders the Settings tab into the given container.
   * @param {HTMLElement}          container
   * @param {Object}               options
   * @param {string}               options.saveId
   * @param {function(): void}     options.onBack - Called after the save is deleted.
   */
  render(container, { saveId, onBack }) {
    this._saveId = saveId;
    this._container = container;
    this._onBack = onBack;
    this._editingIslandId = null;
    this._draw();
  },

  _draw() {
    this._container.innerHTML = `
      <div class="settings-sections">
        ${this._islandManagerHTML()}
        ${this._dlcManagerHTML()}
        ${this._exportImportHTML()}
        ${this._dangerZoneHTML()}
      </div>
    `;
    this._bindIslandManager();
    this._bindDlcManager();
    this._bindExportImport();
    this._bindDangerZone();
  },

  // ── Island Manager ────────────────────────────────────────────────────────────

  _islandManagerHTML() {
    const islands = IslandsService.list(this._saveId);
    const regionOptions = BASE_GAME.regions.map(r =>
      `<option value="${escapeHtml(r.id)}">${escapeHtml(r.name)}</option>`
    ).join('');

    const islandRows = islands.map(i => {
      const isEditing = this._editingIslandId === i.id;
      if (isEditing) {
        return `
          <div class="island-item island-item--editing" data-island-id="${escapeHtml(i.id)}">
            <input type="text" class="island-rename-input" value="${escapeHtml(i.name)}" autocomplete="off"/>
            <button class="btn btn-primary btn-sm" data-action="confirm-rename" data-id="${escapeHtml(i.id)}">Save</button>
            <button class="btn btn-secondary btn-sm" data-action="cancel-rename">Cancel</button>
          </div>
        `;
      }
      return `
        <div class="island-item" data-island-id="${escapeHtml(i.id)}">
          <div class="island-item__info">
            <span class="island-item__name">${escapeHtml(i.name)}</span>
            <span class="island-item__region text-sm text-muted">${escapeHtml(i.regionId)}</span>
          </div>
          <div class="island-item__actions">
            <button class="btn btn-secondary btn-sm" data-action="rename" data-id="${escapeHtml(i.id)}">Rename</button>
            <button class="btn btn-danger btn-sm" data-action="delete" data-id="${escapeHtml(i.id)}" data-name="${escapeHtml(i.name)}">Delete</button>
          </div>
        </div>
      `;
    }).join('') || `<p class="text-muted text-sm" style="padding:4px 0">No islands yet.</p>`;

    return `
      <section class="settings-card">
        <h2 class="settings-card__title">Island Manager</h2>
        <div id="island-list">${islandRows}</div>
        <div class="add-island-form">
          <input type="text" id="new-island-name" placeholder="Island name" autocomplete="off" autocapitalize="words"/>
          <select class="input-select" id="new-island-region">${regionOptions}</select>
          <button class="btn btn-primary btn-sm" id="btn-add-island">Add Island</button>
        </div>
      </section>
    `;
  },

  _bindIslandManager() {
    // Add island
    const addBtn = this._container.querySelector('#btn-add-island');
    const doAdd = () => {
      const name = this._container.querySelector('#new-island-name').value.trim();
      const regionId = this._container.querySelector('#new-island-region').value;
      if (!name) { Toast.error('Please enter an island name.'); return; }
      IslandsService.add(this._saveId, name, regionId);
      Toast.success(`"${name}" added`);
      this._draw();
    };
    addBtn?.addEventListener('click', doAdd);
    this._container.querySelector('#new-island-name')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') doAdd();
    });

    // Island action buttons
    this._container.querySelector('#island-list')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const { action, id, name } = btn.dataset;

      if (action === 'rename') {
        this._editingIslandId = id;
        this._draw();
        this._container.querySelector('.island-rename-input')?.focus();
      }

      if (action === 'cancel-rename') {
        this._editingIslandId = null;
        this._draw();
      }

      if (action === 'confirm-rename') {
        const input = this._container.querySelector('.island-rename-input');
        const newName = input?.value.trim();
        if (!newName) { Toast.error('Name cannot be empty.'); return; }
        try {
          IslandsService.rename(this._saveId, id, newName);
          Toast.success('Island renamed');
        } catch (err) {
          Toast.error(err.message);
        }
        this._editingIslandId = null;
        this._draw();
      }

      if (action === 'delete') {
        const overlay = Modal.show({
          title: 'Delete island?',
          content: `<p>Delete <strong>${escapeHtml(name)}</strong>? This will also remove all goods tracking data for this island.</p>`,
          actions: `
            <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
            <button class="btn btn-danger" id="modal-confirm">Delete</button>
          `,
        });
        overlay.querySelector('#modal-cancel').addEventListener('click', () => Modal.hide());
        overlay.querySelector('#modal-confirm').addEventListener('click', () => {
          try {
            IslandsService.delete(this._saveId, id);
            Modal.hide();
            Toast.success(`"${name}" deleted`);
            this._draw();
          } catch (err) {
            Modal.hide();
            Toast.error(err.message);
          }
        });
      }
    });
  },

  // ── DLC Manager ──────────────────────────────────────────────────────────────

  _dlcManagerHTML() {
    if (DLC_REGISTRY.length === 0) {
      return `
        <section class="settings-card settings-card--muted">
          <h2 class="settings-card__title">DLC Manager</h2>
          <p class="text-sm text-muted">No DLC data files are registered.</p>
        </section>
      `;
    }

    const save = SaveManager.get(this._saveId);
    const activeDlcIds = save?.activeDlcIds ?? [];

    const rows = DLC_REGISTRY.map(dlc => `
      <label class="dlc-toggle">
        <input type="checkbox" class="dlc-checkbox" data-dlc-id="${escapeHtml(dlc.id)}" ${activeDlcIds.includes(dlc.id) ? 'checked' : ''}/>
        <span class="dlc-toggle__name">${escapeHtml(dlc.name)}</span>
        ${dlc.releaseDate ? `<span class="text-sm text-muted">${escapeHtml(dlc.releaseDate)}</span>` : ''}
      </label>
    `).join('');

    return `
      <section class="settings-card" id="dlc-manager-section">
        <h2 class="settings-card__title">DLC Manager</h2>
        <p class="text-sm text-muted">Toggle DLC content active or inactive for this save. Turning a DLC off hides its content but never deletes your data for it.</p>
        <div class="dlc-list">${rows}</div>
      </section>
    `;
  },

  _bindDlcManager() {
    this._container.querySelector('#dlc-manager-section')?.addEventListener('change', e => {
      const checkbox = e.target.closest('.dlc-checkbox');
      if (!checkbox) return;
      const { dlcId } = checkbox.dataset;
      const save = SaveManager.get(this._saveId);
      const active = new Set(save?.activeDlcIds ?? []);
      if (checkbox.checked) {
        active.add(dlcId);
      } else {
        active.delete(dlcId);
      }
      SaveManager.update(this._saveId, { activeDlcIds: [...active] });
      const dlc = DLC_REGISTRY.find(d => d.id === dlcId);
      Toast.success(`${dlc?.name ?? dlcId} ${checkbox.checked ? 'enabled' : 'disabled'}`);
    });
  },

  // ── Export / Import ──────────────────────────────────────────────────────────

  _exportImportHTML() {
    return `
      <section class="settings-card">
        <h2 class="settings-card__title">Export / Import</h2>
        <p class="text-sm text-muted">Download this save as a JSON file or restore from a previous export.</p>
        <div class="settings-actions">
          <button class="btn btn-secondary" id="btn-export-save">Export this save</button>
          <button class="btn btn-secondary" id="btn-export-all">Export all saves</button>
          <label class="btn btn-secondary" style="cursor:pointer">
            Import save
            <input type="file" id="import-file" accept=".json" style="display:none"/>
          </label>
        </div>
      </section>
    `;
  },

  _bindExportImport() {
    this._container.querySelector('#btn-export-save')?.addEventListener('click', () => {
      try {
        const save = SaveManager.get(this._saveId);
        const json = SaveManager.exportToJSON(this._saveId);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `anno117-${save.name.replace(/[^a-z0-9]/gi, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Toast.success('Save exported');
      } catch (err) {
        Toast.error('Export failed: ' + err.message);
      }
    });

    this._container.querySelector('#btn-export-all')?.addEventListener('click', () => {
      try {
        ImportExport.downloadAllSaves();
        Toast.success('All saves exported');
      } catch (err) {
        Toast.error('Export failed: ' + err.message);
      }
    });

    this._container.querySelector('#import-file')?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          SaveManager.importFromJSON(evt.target.result);
          Toast.success('Save imported successfully');
        } catch (err) {
          Toast.error('Import failed: ' + err.message);
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });
  },

  // ── Danger Zone ───────────────────────────────────────────────────────────────

  _dangerZoneHTML() {
    return `
      <section class="settings-card settings-card--danger">
        <h2 class="settings-card__title">Danger Zone</h2>
        <p class="text-sm text-muted">Permanently delete this save file and all its data. This cannot be undone.</p>
        <button class="btn btn-danger" id="btn-delete-save">Delete this save</button>
      </section>
    `;
  },

  _bindDangerZone() {
    this._container.querySelector('#btn-delete-save')?.addEventListener('click', () => {
      const save = SaveManager.get(this._saveId);
      const overlay = Modal.show({
        title: 'Delete save?',
        content: `<p>Delete <strong>${escapeHtml(save?.name)}</strong> and all its data? This cannot be undone.</p>`,
        actions: `
          <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
          <button class="btn btn-danger" id="modal-confirm">Delete</button>
        `,
      });
      overlay.querySelector('#modal-cancel').addEventListener('click', () => Modal.hide());
      overlay.querySelector('#modal-confirm').addEventListener('click', () => {
        SaveManager.delete(this._saveId);
        Modal.hide();
        Toast.success('Save deleted');
        if (this._onBack) this._onBack();
      });
    });
  },

};
