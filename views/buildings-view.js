/**
 * @module buildings-view
 * @description Buildings tab: per-island building counts and notes.
 * Shows specialist slot info from buildingTypes data for planning purposes.
 */

import { BuildingTracker } from '../modules/building-tracker.js';
import { IslandsService } from '../modules/islands.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { SaveManager } from '../modules/save-manager.js';
import { getMergedData } from '../data/dlc-registry.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const BuildingsView = {
  _saveId: null,
  _container: null,
  _selectedIslandId: null,
  _gameData: null,

  /**
   * Renders the Buildings tab into the given container.
   * @param {HTMLElement} container
   * @param {Object}      options
   * @param {string}      options.saveId
   */
  render(container, { saveId }) {
    this._saveId = saveId;
    this._container = container;

    const islands = IslandsService.list(saveId);
    this._selectedIslandId = islands[0]?.id || null;
    this._draw();
  },

  _draw() {
    const save = SaveManager.get(this._saveId);
    this._gameData = getMergedData(save?.activeDlcIds ?? []);
    const islands = IslandsService.list(this._saveId);

    if (islands.length === 0) {
      this._container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🏗</div>
          <p>No islands yet</p>
          <p class="text-sm">Add islands in Settings before tracking buildings</p>
        </div>
      `;
      return;
    }

    const islandOptions = islands.map(i =>
      `<option value="${escapeHtml(i.id)}" ${i.id === this._selectedIslandId ? 'selected' : ''}>${escapeHtml(i.name)}</option>`
    ).join('');

    const island = islands.find(i => i.id === this._selectedIslandId) || islands[0];
    this._selectedIslandId = island.id;

    const entries = BuildingTracker.listByIsland(this._saveId, island.id);

    const rows = entries.length === 0
      ? `<p class="text-muted text-sm" style="padding:8px 0">No buildings tracked for this island yet.</p>`
      : entries.map(e => {
          const bt = this._gameData.buildingTypes.find(b => b.id === e.buildingTypeId);
          const slots = bt?.specialistSlots ?? 0;
          const slotsLabel = slots > 0 ? `${slots} slot${slots !== 1 ? 's' : ''}` : 'No slots';
          return `
            <div class="building-row" data-entry-id="${escapeHtml(e.id)}">
              <div class="building-row__header">
                <span class="building-row__name">${escapeHtml(bt?.name || e.buildingTypeId)}</span>
                <span class="building-row__slots text-sm ${slots > 0 ? 'text-accent' : 'text-muted'}">${slotsLabel}</span>
                <button class="btn btn-danger btn-sm" data-action="remove" data-id="${escapeHtml(e.id)}" aria-label="Remove">✕</button>
              </div>
              <div class="building-row__controls">
                <label class="text-sm text-muted">Count</label>
                <div class="stepper">
                  <button class="stepper__btn" data-action="decrement" data-id="${escapeHtml(e.id)}">−</button>
                  <span class="stepper__value">${e.count}</span>
                  <button class="stepper__btn" data-action="increment" data-id="${escapeHtml(e.id)}">+</button>
                </div>
              </div>
              <div class="building-row__notes">
                <input type="text" class="building-notes-input" data-id="${escapeHtml(e.id)}"
                  value="${escapeHtml(e.notes)}" placeholder="Notes (e.g. specialist slot occupancy)" autocomplete="off"/>
              </div>
            </div>
          `;
        }).join('');

    this._container.innerHTML = `
      <div class="tab-toolbar">
        <select class="island-select input-select" id="island-select">${islandOptions}</select>
        <button class="btn btn-primary btn-sm" id="btn-add-building">+ Add Building</button>
      </div>
      <div class="building-list">${rows}</div>
    `;

    this._bind();
  },

  _bind() {
    this._container.querySelector('#island-select')?.addEventListener('change', e => {
      this._selectedIslandId = e.target.value;
      this._draw();
    });

    this._container.querySelector('#btn-add-building')?.addEventListener('click', () => {
      this._showAddModal();
    });

    this._container.querySelector('.building-list')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const { action, id } = btn.dataset;

      if (action === 'remove') {
        BuildingTracker.remove(this._saveId, id);
        this._draw();
        return;
      }

      if (action === 'increment' || action === 'decrement') {
        const entry = BuildingTracker.list(this._saveId).find(en => en.id === id);
        if (!entry) return;
        const delta = action === 'increment' ? 1 : -1;
        const newCount = Math.max(0, entry.count + delta);
        BuildingTracker.update(this._saveId, id, { count: newCount });
        const valueEl = btn.closest('.stepper')?.querySelector('.stepper__value');
        if (valueEl) valueEl.textContent = newCount;
      }
    });

    this._container.querySelector('.building-list')?.addEventListener('change', e => {
      const input = e.target.closest('.building-notes-input');
      if (!input) return;
      BuildingTracker.update(this._saveId, input.dataset.id, { notes: input.value });
    });
  },

  _showAddModal() {
    const island = IslandsService.list(this._saveId).find(i => i.id === this._selectedIslandId);
    const existingIds = BuildingTracker.listByIsland(this._saveId, this._selectedIslandId).map(e => e.buildingTypeId);

    const available = this._gameData.buildingTypes
      .filter(bt => !existingIds.includes(bt.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (available.length === 0) {
      Toast.show('All building types are already tracked for this island.');
      return;
    }

    const options = available.map(bt =>
      `<option value="${escapeHtml(bt.id)}">${escapeHtml(bt.name)} (${escapeHtml(bt.category)})</option>`
    ).join('');

    const overlay = Modal.show({
      title: `Add Building — ${escapeHtml(island?.name || '')}`,
      content: `
        <div class="form-group">
          <label class="text-sm text-muted">Search building type</label>
          <input type="text" id="building-search" class="modal-search" placeholder="Type to filter…" autocomplete="off" style="margin-bottom:8px"/>
          <select id="building-type-select" size="6" class="input-select" style="width:100%;height:200px">${options}</select>
        </div>
      `,
      actions: `
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-confirm">Add</button>
      `,
    });

    const search = overlay.querySelector('#building-search');
    const select = overlay.querySelector('#building-type-select');

    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      Array.from(select.options).forEach(opt => {
        opt.hidden = !opt.text.toLowerCase().includes(q);
      });
      const firstVisible = Array.from(select.options).find(o => !o.hidden);
      if (firstVisible) firstVisible.selected = true;
    });

    overlay.querySelector('#modal-cancel').addEventListener('click', () => Modal.hide());
    overlay.querySelector('#modal-confirm').addEventListener('click', () => {
      const buildingTypeId = select.value;
      if (!buildingTypeId) { Toast.error('Please select a building type.'); return; }
      BuildingTracker.add(this._saveId, this._selectedIslandId, buildingTypeId, 0, '');
      Modal.hide();
      this._draw();
    });

    search.focus();
  },
};
