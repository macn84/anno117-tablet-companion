/**
 * @module goods-view
 * @description Goods Tracker tab: per-island trend picker and cross-island summary table.
 *
 * Two views are toggled via chips:
 *   - "By Island" (default) — one island at a time, full goods list, inline trend picker.
 *   - "Summary Table" — all islands × tracked goods as a compact read-only grid.
 *
 * Trends are updated via an inline picker that expands on row tap; only one row
 * can be expanded at a time (`_expandedGoodId` tracks it).
 */

import { BASE_GAME } from '../data/base-game.js';
import { GoodsTracker, TRENDS } from '../modules/goods-tracker.js';
import { IslandsService } from '../modules/islands.js';
import { Toast } from '../components/toast.js';

const TREND_LABELS = {
  'Surplus':      '▲ Surplus',
  'Stable':       '▬ Stable',
  'Deficit':      '▼ Deficit',
  'not-produced': '— Not Produced',
};

const TREND_CLASS = {
  'Surplus':      'trend-surplus',
  'Stable':       'trend-stable',
  'Deficit':      'trend-deficit',
  'not-produced': 'trend-not-produced',
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const GoodsView = {
  _saveId: null,
  _container: null,
  _activeView: 'by-island',   // 'by-island' | 'summary'
  _selectedIslandId: null,
  _expandedGoodId: null,      // which good row has the inline trend picker open

  /**
   * Renders the Goods tab into the given container.
   * Defaults to the "By Island" view with the first island pre-selected.
   * @param {HTMLElement} container
   * @param {Object}      options
   * @param {string}      options.saveId
   */
  render(container, { saveId }) {
    this._saveId = saveId;
    this._container = container;
    this._activeView = 'by-island';
    this._expandedGoodId = null;

    const islands = IslandsService.list(saveId);
    this._selectedIslandId = islands[0]?.id || null;
    this._draw();
  },

  _draw() {
    const islands = IslandsService.list(this._saveId);

    if (islands.length === 0) {
      this._container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">📦</div>
          <p>No islands yet</p>
          <p class="text-sm">Add islands in Settings before tracking goods</p>
        </div>
      `;
      return;
    }

    const viewToggle = `
      <div class="tab-toolbar">
        <div class="chip-row">
          <button class="chip${this._activeView === 'by-island' ? ' chip--active' : ''}" id="view-by-island">By Island</button>
          <button class="chip${this._activeView === 'summary' ? ' chip--active' : ''}" id="view-summary">Summary Table</button>
        </div>
      </div>
    `;

    this._container.innerHTML = viewToggle + '<div id="goods-content"></div>';

    this._container.querySelector('#view-by-island').addEventListener('click', () => {
      this._activeView = 'by-island';
      this._expandedGoodId = null;
      this._drawContent(islands);
    });
    this._container.querySelector('#view-summary').addEventListener('click', () => {
      this._activeView = 'summary';
      this._expandedGoodId = null;
      this._drawContent(islands);
    });

    this._drawContent(islands);
  },

  _drawContent(islands) {
    const contentEl = this._container.querySelector('#goods-content');
    if (this._activeView === 'by-island') {
      this._drawByIsland(contentEl, islands);
    } else {
      this._drawSummary(contentEl, islands);
    }
  },

  _drawByIsland(el, islands) {
    if (!this._selectedIslandId || !islands.find(i => i.id === this._selectedIslandId)) {
      this._selectedIslandId = islands[0].id;
    }
    const island = islands.find(i => i.id === this._selectedIslandId);
    const islandOptions = islands.map(i =>
      `<option value="${escapeHtml(i.id)}"${i.id === this._selectedIslandId ? ' selected' : ''}>${escapeHtml(i.name)}</option>`
    ).join('');

    const summary = GoodsTracker.getIslandSummary(this._saveId, this._selectedIslandId);
    const entryMap = Object.fromEntries(summary.map(e => [e.goodId, e]));

    // Filter goods to those relevant to this island's region
    const region = island?.regionId;
    const goods = BASE_GAME.goods.filter(g => !region || g.regions.includes(region));

    const goodsRows = goods.map(g => {
      const entry = entryMap[g.id];
      const trend = entry?.trend || null;
      const trendBadge = trend
        ? `<span class="trend-badge ${TREND_CLASS[trend]}">${TREND_LABELS[trend]}</span>`
        : `<span class="trend-badge trend-unset">— Untracked</span>`;
      const note = entry?.stockNote ? `<span class="goods-note text-sm text-muted">${escapeHtml(entry.stockNote)}</span>` : '';
      const isExpanded = this._expandedGoodId === g.id;

      const picker = isExpanded ? `
        <div class="trend-picker">
          ${TRENDS.map(t => `
            <button class="btn btn-sm${trend === t ? ' btn-primary' : ' btn-secondary'} trend-pick-btn" data-good="${escapeHtml(g.id)}" data-trend="${t}">
              ${TREND_LABELS[t]}
            </button>
          `).join('')}
          <div style="display:flex;gap:8px;margin-top:6px">
            <input type="text" class="stock-note-input" data-good="${escapeHtml(g.id)}" placeholder="Stock note (optional)" value="${escapeHtml(entry?.stockNote || '')}" style="flex:1"/>
            <button class="btn btn-sm btn-secondary save-note-btn" data-good="${escapeHtml(g.id)}">Save</button>
          </div>
        </div>
      ` : '';

      return `
        <div class="goods-row${isExpanded ? ' goods-row--expanded' : ''}" data-good-id="${escapeHtml(g.id)}">
          <div class="goods-row__main">
            <span class="goods-row__name">${escapeHtml(g.name)}</span>
            <span class="goods-row__status">${trendBadge}${note}</span>
          </div>
          ${picker}
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="goods-island-selector">
        <select class="input-select" id="island-selector">${islandOptions}</select>
      </div>
      <div class="goods-list">${goodsRows || '<p class="text-muted text-sm" style="padding:16px">No goods data for this region.</p>'}</div>
    `;

    el.querySelector('#island-selector').addEventListener('change', e => {
      this._selectedIslandId = e.target.value;
      this._expandedGoodId = null;
      this._drawByIsland(el, islands);
    });

    // Tap good row header → toggle picker
    el.querySelectorAll('.goods-row__main').forEach(row => {
      row.addEventListener('click', () => {
        const goodId = row.closest('[data-good-id]').dataset.goodId;
        this._expandedGoodId = this._expandedGoodId === goodId ? null : goodId;
        this._drawByIsland(el, islands);
      });
    });

    // Trend pick buttons
    el.querySelectorAll('.trend-pick-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const goodId = btn.dataset.good;
        const trend = btn.dataset.trend;
        const noteInput = el.querySelector(`.stock-note-input[data-good="${goodId}"]`);
        const note = noteInput?.value.trim() || '';
        GoodsTracker.setGoodStatus(this._saveId, goodId, this._selectedIslandId, trend, note);
        this._expandedGoodId = null;
        Toast.success('Updated');
        this._drawByIsland(el, islands);
      });
    });

    // Save note button (without changing trend)
    el.querySelectorAll('.save-note-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const goodId = btn.dataset.good;
        const noteInput = el.querySelector(`.stock-note-input[data-good="${goodId}"]`);
        const note = noteInput?.value.trim() || '';
        const existing = GoodsTracker.getIslandSummary(this._saveId, this._selectedIslandId)
          .find(en => en.goodId === goodId);
        GoodsTracker.setGoodStatus(this._saveId, goodId, this._selectedIslandId, existing?.trend || 'Stable', note);
        this._expandedGoodId = null;
        Toast.success('Note saved');
        this._drawByIsland(el, islands);
      });
    });
  },

  _drawSummary(el, islands) {
    const allSummary = GoodsTracker.getAllSummary(this._saveId);
    // Only show goods that are tracked in at least one island
    const trackedGoodIds = new Set(
      Object.values(allSummary).flat().map(e => e.goodId)
    );
    const goods = BASE_GAME.goods.filter(g => trackedGoodIds.has(g.id));

    if (goods.length === 0) {
      el.innerHTML = `<div class="empty-state"><p class="text-muted text-sm" style="padding:16px">No goods tracked yet. Switch to "By Island" to start tracking.</p></div>`;
      return;
    }

    const headerCells = islands.map(i => `<th>${escapeHtml(i.name)}</th>`).join('');
    const rows = goods.map(g => {
      const cells = islands.map(i => {
        const entry = allSummary[i.id]?.find(e => e.goodId === g.id);
        if (!entry) return `<td class="summary-cell">—</td>`;
        return `<td class="summary-cell"><span class="trend-badge ${TREND_CLASS[entry.trend]}">${TREND_LABELS[entry.trend]}</span></td>`;
      }).join('');
      return `<tr><td class="goods-name-cell">${escapeHtml(g.name)}</td>${cells}</tr>`;
    }).join('');

    el.innerHTML = `
      <div class="summary-table-wrap">
        <table class="summary-table">
          <thead><tr><th>Good</th>${headerCells}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  },
};
