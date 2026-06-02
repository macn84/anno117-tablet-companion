/**
 * @module dashboard
 * @description Per-save shell: top bar, bottom-tab router, and Overview tab content.
 * Owns the active tab state and delegates rendering to the appropriate view module
 * for each tab.
 */

import { SaveManager } from '../modules/save-manager.js';
import { IslandsService } from '../modules/islands.js';
import { SpecialistTracker } from '../modules/specialist-tracker.js';
import { GoodsTracker } from '../modules/goods-tracker.js';
import { BASE_GAME } from '../data/base-game.js';
import { BottomNav, TABS } from '../components/bottom-nav.js';
import { SpecialistsView } from './specialists-view.js';
import { GoodsView } from './goods-view.js';
import { SettingsView } from './settings-view.js';
import { BuildingsView } from './buildings-view.js';
import { FestivalsView } from './festivals-view.js';
import { ReferenceView } from './reference-view.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const DashboardView = {
  _saveId: null,
  _activeTab: 'overview',
  _container: null,
  _onBack: null,
  _nav: null,

  /**
   * Renders the save dashboard (header + bottom tabs) into the given container.
   * Starts on the Overview tab. Navigates back to the save list if the save no
   * longer exists in storage at render time.
   * @param {HTMLElement}          container
   * @param {Object}               options
   * @param {string}               options.saveId  - ID of the save to display.
   * @param {function(): void}     options.onBack  - Called when the user navigates back.
   */
  render(container, { saveId, onBack }) {
    this._saveId = saveId;
    this._activeTab = 'overview';
    this._container = container;
    this._onBack = onBack;
    this._draw();
  },

  _draw() {
    const save = SaveManager.get(this._saveId);
    if (!save) { this._onBack(); return; }

    this._container.innerHTML = `
      <header class="view-header">
        <button class="btn-icon" id="btn-back" aria-label="Back to saves">←</button>
        <h1>${escapeHtml(save.name)}</h1>
      </header>
      <div class="view" id="tab-content"></div>
    `;

    this._container.querySelector('#btn-back')
      .addEventListener('click', () => this._onBack());

    this._nav = BottomNav.render(this._activeTab, (tab) => this._switchTab(tab));
    this._container.appendChild(this._nav);

    this._renderTabContent();
  },

  _switchTab(tab) {
    this._activeTab = tab;
    this._nav.querySelectorAll('.bottom-nav__tab').forEach(btn => {
      const active = btn.dataset.tab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-current', active ? 'page' : 'false');
    });
    this._renderTabContent();
  },

  _renderTabContent() {
    const el = this._container.querySelector('#tab-content');
    if (!el) return;

    switch (this._activeTab) {
      case 'overview':
        el.innerHTML = this._overviewHTML();
        this._bindOverviewActions(el);
        break;
      case 'specialists':
        SpecialistsView.render(el, { saveId: this._saveId });
        break;
      case 'goods':
        GoodsView.render(el, { saveId: this._saveId });
        break;
      case 'buildings':
        BuildingsView.render(el, { saveId: this._saveId });
        break;
      case 'festivals':
        FestivalsView.render(el, { saveId: this._saveId });
        break;
      case 'reference':
        ReferenceView.render(el, { saveId: this._saveId });
        break;
      case 'settings':
        SettingsView.render(el, {
          saveId: this._saveId,
          onBack: () => this._onBack(),
        });
        break;
      default: {
        const label = TABS.find(t => t.id === this._activeTab)?.label ?? this._activeTab;
        el.innerHTML = `
          <div class="empty-state">
            <div class="empty-state__icon">🚧</div>
            <p>${label}</p>
            <p class="text-sm">Coming in the next update</p>
          </div>
        `;
      }
    }
  },

  _overviewHTML() {
    const islands = IslandsService.list(this._saveId);
    const deficits = GoodsTracker.getDeficitGoods(this._saveId);
    const unassigned = SpecialistTracker.getUnassignedCount(this._saveId);

    const islandRows = islands.length === 0
      ? `<p class="text-muted text-sm">No islands yet — add them in Settings.</p>`
      : islands.map(i => `
          <div class="island-row">
            <span class="island-row__name">${escapeHtml(i.name)}</span>
            <span class="island-row__region text-sm text-muted">${escapeHtml(i.regionId)}</span>
          </div>
        `).join('');

    const deficitRows = deficits.length === 0
      ? `<p class="text-muted text-sm">No deficits recorded.</p>`
      : deficits.map(d => {
          const good = BASE_GAME.goods.find(g => g.id === d.goodId);
          const islandName = islands.find(i => i.id === d.islandId)?.name || d.islandId;
          return `<div class="deficit-row">
            <span class="trend-badge trend-deficit">▼ ${escapeHtml(good?.name || d.goodId)}</span>
            <span class="text-sm text-muted">${escapeHtml(islandName)}</span>
          </div>`;
        }).join('');

    return `
      <div class="overview-section">
        <h2>Islands <span class="badge">${islands.length}</span></h2>
        ${islandRows}
        <button class="btn btn-secondary btn-sm" id="ov-go-settings" style="margin-top:8px">Manage islands</button>
      </div>
      <div class="overview-section">
        <h2>Deficits <span class="badge badge--alert">${deficits.length}</span></h2>
        ${deficitRows}
      </div>
      <div class="overview-section">
        <h2>Unassigned specialists <span class="badge">${unassigned}</span></h2>
        ${unassigned > 0
          ? `<button class="btn btn-secondary btn-sm" id="ov-go-specialists">View specialists</button>`
          : `<p class="text-muted text-sm">All specialists are assigned.</p>`
        }
      </div>
    `;
  },

  _bindOverviewActions(el) {
    el.querySelector('#ov-go-settings')?.addEventListener('click', () => this._switchTab('settings'));
    el.querySelector('#ov-go-specialists')?.addEventListener('click', () => this._switchTab('specialists'));
  },
};
