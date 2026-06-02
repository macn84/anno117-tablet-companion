// views/dashboard.js — Per-save shell: top bar + bottom-tab router.

import { SaveManager } from '../modules/save-manager.js';
import { BottomNav, TABS } from '../components/bottom-nav.js';

export const DashboardView = {
  _saveId: null,
  _activeTab: 'overview',
  _container: null,
  _onBack: null,
  _nav: null,

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
    if (this._activeTab === 'overview') {
      el.innerHTML = this._overviewHTML();
    } else {
      const label = TABS.find(t => t.id === this._activeTab)?.label ?? this._activeTab;
      el.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🚧</div>
          <p>${label}</p>
          <p class="text-sm">Coming soon</p>
        </div>
      `;
    }
  },

  _overviewHTML() {
    const save = SaveManager.get(this._saveId);
    const dlcCount = save.activeDlcIds?.length ?? 0;
    return `
      <div class="overview-section">
        <h2>Save info</h2>
        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-card__value">${dlcCount}</div>
            <div class="stat-card__label">Active DLCs</div>
          </div>
        </div>
      </div>
      <div class="overview-section">
        <p class="text-muted text-sm">
          Islands, specialists, and goods tracking are coming in the next update.
        </p>
      </div>
    `;
  },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
