/**
 * @module festivals-view
 * @description Festivals tab: toggle active/inactive, add timing notes.
 * Reference info (effect, trigger, duration) shown read-only from data files.
 * DLC festivals merged in based on save's activeDlcIds.
 */

import { SaveManager } from '../modules/save-manager.js';
import { FestivalTracker } from '../modules/festival-tracker.js';
import { getMergedData } from '../data/dlc-registry.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const FestivalsView = {
  _saveId: null,
  _container: null,

  /**
   * Renders the Festivals tab into the given container.
   * @param {HTMLElement} container
   * @param {Object}      options
   * @param {string}      options.saveId
   */
  render(container, { saveId }) {
    this._saveId = saveId;
    this._container = container;
    this._draw();
  },

  _draw() {
    const save = SaveManager.get(this._saveId);
    const data = getMergedData(save?.activeDlcIds ?? []);
    const festivals = data.festivals;

    if (festivals.length === 0) {
      this._container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🎭</div>
          <p>No festivals in game data</p>
          <p class="text-sm">Festival data will appear here when added to base-game.js</p>
        </div>
      `;
      return;
    }

    const states = FestivalTracker.list(this._saveId);
    const stateMap = Object.fromEntries(states.map(s => [s.festivalId, s]));

    const cards = festivals.map(f => {
      const state = stateMap[f.id] || { active: false, note: '' };
      const activeClass = state.active ? 'festival-card--active' : '';
      return `
        <div class="festival-card ${activeClass}" data-festival-id="${escapeHtml(f.id)}">
          <div class="festival-card__header">
            <div class="festival-card__title-row">
              <span class="festival-card__name">${escapeHtml(f.name)}</span>
              <span class="region-badge region-badge--${escapeHtml(f.region)}">${escapeHtml(f.region)}</span>
            </div>
            <label class="toggle-label">
              <input type="checkbox" class="festival-toggle" data-festival-id="${escapeHtml(f.id)}" ${state.active ? 'checked' : ''}/>
              <span class="toggle-text">${state.active ? 'Active' : 'Inactive'}</span>
            </label>
          </div>
          <div class="festival-card__ref">
            <p class="text-sm"><strong>Effect:</strong> ${escapeHtml(f.effect)}</p>
            <p class="text-sm"><strong>Trigger:</strong> ${escapeHtml(f.triggerCondition)}</p>
            ${f.duration ? `<p class="text-sm"><strong>Duration:</strong> ${escapeHtml(f.duration)}</p>` : ''}
            ${f.notes ? `<p class="text-sm text-muted">${escapeHtml(f.notes)}</p>` : ''}
          </div>
          <div class="festival-card__notes">
            <input type="text" class="festival-note-input" data-festival-id="${escapeHtml(f.id)}"
              value="${escapeHtml(state.note)}" placeholder="Timing notes (e.g. 'run every 20 min')" autocomplete="off"/>
          </div>
        </div>
      `;
    }).join('');

    this._container.innerHTML = `
      <div class="festival-list">${cards}</div>
    `;

    this._bind();
  },

  _bind() {
    this._container.addEventListener('change', e => {
      const toggle = e.target.closest('.festival-toggle');
      if (toggle) {
        const { festivalId } = toggle.dataset;
        const active = toggle.checked;
        FestivalTracker.toggle(this._saveId, festivalId, active);
        const card = this._container.querySelector(`[data-festival-id="${festivalId}"].festival-card`);
        card?.classList.toggle('festival-card--active', active);
        const label = card?.querySelector('.toggle-text');
        if (label) label.textContent = active ? 'Active' : 'Inactive';
        return;
      }

      const noteInput = e.target.closest('.festival-note-input');
      if (noteInput) {
        FestivalTracker.setNote(this._saveId, noteInput.dataset.festivalId, noteInput.value);
      }
    });
  },
};
