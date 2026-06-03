/**
 * @module reference-view
 * @description Read-only in-app wiki. Sub-sections: Specialists | Goods | Production Chains | Buildings | Festivals.
 * Merges base game + active DLC data for the current save.
 */

import { SaveManager } from '../modules/save-manager.js';
import { ProductionRef } from '../modules/production-ref.js';
import { getMergedData } from '../data/dlc-registry.js';

const SECTIONS = ['specialists', 'goods', 'chains', 'buildings', 'festivals'];
const SECTION_LABELS = {
  specialists: 'Specialists',
  goods:       'Goods',
  chains:      'Chains',
  buildings:   'Buildings',
  festivals:   'Festivals',
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const ReferenceView = {
  _saveId: null,
  _container: null,
  _activeSection: 'specialists',
  _searchQuery: '',
  _selectedGoodId: null,

  /**
   * Renders the Reference tab into the given container.
   * Starts on the Specialists sub-section.
   * @param {HTMLElement} container
   * @param {Object}      options
   * @param {string}      options.saveId
   */
  render(container, { saveId }) {
    this._saveId = saveId;
    this._container = container;
    this._activeSection = 'specialists';
    this._searchQuery = '';
    this._selectedGoodId = null;
    this._draw();
  },

  _draw() {
    const save = SaveManager.get(this._saveId);
    const data = getMergedData(save?.activeDlcIds ?? []);

    const segmented = SECTIONS.map(s => `
      <button class="chip${this._activeSection === s ? ' chip--active' : ''}" data-section="${s}">
        ${SECTION_LABELS[s]}
      </button>
    `).join('');

    const searchPlaceholder = this._activeSection === 'chains'
      ? 'Filter output goods…'
      : `Search ${SECTION_LABELS[this._activeSection].toLowerCase()}…`;

    this._container.innerHTML = `
      <div class="tab-toolbar ref-toolbar">
        <div class="chip-row ref-chips">${segmented}</div>
        <input type="search" id="ref-search" class="ref-search" placeholder="${searchPlaceholder}"
          value="${escapeHtml(this._searchQuery)}" autocomplete="off"/>
      </div>
      <div id="ref-content" class="ref-content"></div>
    `;

    this._renderSection(data);
    this._bind(data);
  },

  _renderSection(data) {
    const content = this._container.querySelector('#ref-content');
    if (!content) return;
    const q = this._searchQuery.toLowerCase();

    switch (this._activeSection) {
      case 'specialists': content.innerHTML = this._specialistsHTML(data, q); break;
      case 'goods':       content.innerHTML = this._goodsHTML(data, q); break;
      case 'chains':      content.innerHTML = this._chainsHTML(data, q); break;
      case 'buildings':   content.innerHTML = this._buildingsHTML(data, q); break;
      case 'festivals':   content.innerHTML = this._festivalsHTML(data, q); break;
    }
  },

  _specialistsHTML(data, q) {
    let list = data.specialists;
    if (q) list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.category || '').toLowerCase().includes(q) ||
      (s.effect || '').toLowerCase().includes(q)
    );
    if (list.length === 0) return `<p class="text-muted text-sm ref-empty">No specialists match "${escapeHtml(q)}".</p>`;

    return list.map(s => {
      const rarity = (s.rarity || 'Common').toLowerCase();
      const slots = s.validSlots?.length ? s.validSlots.join(', ') : 'None';
      return `
        <div class="ref-card ref-specialist">
          <div class="ref-card__header">
            <span class="ref-card__name">${escapeHtml(s.name)}</span>
            <span class="rarity-badge rarity-${escapeHtml(rarity)}">${escapeHtml(s.rarity || 'Common')}</span>
            <span class="ref-badge">${escapeHtml(s.category || '')}</span>
          </div>
          <p class="text-sm">${escapeHtml(s.effect || '')}</p>
          <p class="text-sm text-muted">Slots: ${escapeHtml(slots)}</p>
        </div>
      `;
    }).join('');
  },

  _goodsHTML(data, q) {
    let list = data.goods;
    if (q) list = list.filter(g =>
      g.name.toLowerCase().includes(q) ||
      (g.category || '').toLowerCase().includes(q)
    );
    if (list.length === 0) return `<p class="text-muted text-sm ref-empty">No goods match "${escapeHtml(q)}".</p>`;

    return list.map(g => {
      const regions = (g.regions || []).join(', ');
      return `
        <div class="ref-card ref-good">
          <div class="ref-card__header">
            <span class="ref-card__name">${escapeHtml(g.name)}</span>
            <span class="ref-badge">${escapeHtml(g.category || '')}</span>
          </div>
          <p class="text-sm text-muted">${escapeHtml(regions)}</p>
        </div>
      `;
    }).join('');
  },

  _chainsHTML(data, q) {
    const producibleIds = ProductionRef.getProducibleGoodIds(data);
    let goods = data.goods.filter(g => producibleIds.includes(g.id));
    if (q) goods = goods.filter(g => g.name.toLowerCase().includes(q));

    const goodOptions = goods
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(g => `<option value="${escapeHtml(g.id)}" ${g.id === this._selectedGoodId ? 'selected' : ''}>${escapeHtml(g.name)}</option>`)
      .join('');

    let chainHTML = '';
    if (this._selectedGoodId) {
      const chains = ProductionRef.getChainsForGood(this._selectedGoodId, data);
      if (chains.length === 0) {
        chainHTML = `<p class="text-muted text-sm">No chains found for this good.</p>`;
      } else {
        chainHTML = chains.map(c => {
          const steps = (c.steps || []).map(step => {
            const bt = data.buildingTypes.find(b => b.id === step.buildingTypeId);
            const countStr = step.count % 1 === 0 ? step.count : step.count.toFixed(2);
            return `<li class="text-sm">× ${countStr} <strong>${escapeHtml(bt?.name || step.buildingTypeId)}</strong></li>`;
          }).join('');
          const inputs = (c.inputGoodIds || []).map(id => {
            const g = data.goods.find(x => x.id === id);
            return `<span class="ref-badge">${escapeHtml(g?.name || id)}</span>`;
          }).join('');
          return `
            <div class="ref-chain">
              <div class="ref-chain__region ref-badge">${escapeHtml(c.region || '')}</div>
              <ul class="ref-chain__steps">${steps}</ul>
              ${inputs ? `<div class="ref-chain__inputs"><span class="text-sm text-muted">Inputs: </span>${inputs}</div>` : ''}
              ${c.notes ? `<p class="text-sm text-muted">${escapeHtml(c.notes)}</p>` : ''}
            </div>
          `;
        }).join('');
      }
    } else {
      chainHTML = `<p class="text-muted text-sm">Select an output good above to see its production chain.</p>`;
    }

    return `
      <div class="ref-chain-selector">
        <label class="text-sm text-muted">Output good</label>
        <select id="chain-good-select" class="input-select" style="width:100%;margin-top:4px">
          <option value="">— select a good —</option>
          ${goodOptions}
        </select>
      </div>
      <div id="chain-detail">${chainHTML}</div>
    `;
  },

  _buildingsHTML(data, q) {
    let list = data.buildingTypes;
    if (q) list = list.filter(b =>
      b.name.toLowerCase().includes(q) ||
      (b.category || '').toLowerCase().includes(q)
    );
    if (list.length === 0) return `<p class="text-muted text-sm ref-empty">No buildings match "${escapeHtml(q)}".</p>`;

    return list.map(b => {
      const regions = (b.regions || []).join(', ');
      const slotsLabel = (b.specialistSlots || 0) > 0
        ? `${b.specialistSlots} specialist slot${b.specialistSlots !== 1 ? 's' : ''}`
        : 'No specialist slots';
      return `
        <div class="ref-card ref-building">
          <div class="ref-card__header">
            <span class="ref-card__name">${escapeHtml(b.name)}</span>
            <span class="ref-badge">${escapeHtml(b.category || '')}</span>
          </div>
          <p class="text-sm text-muted">${escapeHtml(regions)} · ${slotsLabel}</p>
          ${b.notes ? `<p class="text-sm text-muted">${escapeHtml(b.notes)}</p>` : ''}
        </div>
      `;
    }).join('');
  },

  _festivalsHTML(data, q) {
    let list = data.festivals;
    if (q) list = list.filter(f =>
      f.name.toLowerCase().includes(q) ||
      (f.effect || '').toLowerCase().includes(q) ||
      (f.region || '').toLowerCase().includes(q)
    );
    if (list.length === 0) return `<p class="text-muted text-sm ref-empty">No festivals match "${escapeHtml(q)}".</p>`;

    return list.map(f => `
      <div class="ref-card ref-festival">
        <div class="ref-card__header">
          <span class="ref-card__name">${escapeHtml(f.name)}</span>
          <span class="region-badge region-badge--${escapeHtml(f.region)}">${escapeHtml(f.region)}</span>
        </div>
        <p class="text-sm"><strong>Effect:</strong> ${escapeHtml(f.effect)}</p>
        <p class="text-sm"><strong>Trigger:</strong> ${escapeHtml(f.triggerCondition)}</p>
        ${f.duration ? `<p class="text-sm text-muted">Duration: ${escapeHtml(f.duration)}</p>` : ''}
        ${f.notes ? `<p class="text-sm text-muted">${escapeHtml(f.notes)}</p>` : ''}
      </div>
    `).join('');
  },

  _bind(data) {
    this._container.querySelector('.ref-chips')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-section]');
      if (!btn) return;
      this._activeSection = btn.dataset.section;
      this._searchQuery = '';
      this._selectedGoodId = null;
      this._draw();
    });

    const searchEl = this._container.querySelector('#ref-search');
    searchEl?.addEventListener('input', () => {
      this._searchQuery = searchEl.value;
      this._renderSection(data);
    });

    this._container.addEventListener('change', e => {
      const sel = e.target.closest('#chain-good-select');
      if (sel) {
        this._selectedGoodId = sel.value || null;
        const detail = this._container.querySelector('#chain-detail');
        if (detail) {
          const chains = this._selectedGoodId
            ? ProductionRef.getChainsForGood(this._selectedGoodId, data)
            : [];
          if (!this._selectedGoodId) {
            detail.innerHTML = `<p class="text-muted text-sm">Select an output good above to see its production chain.</p>`;
          } else if (chains.length === 0) {
            detail.innerHTML = `<p class="text-muted text-sm">No chains found for this good.</p>`;
          } else {
            detail.innerHTML = chains.map(c => {
              const steps = (c.steps || []).map(step => {
                const bt = data.buildingTypes.find(b => b.id === step.buildingTypeId);
                const countStr = step.count % 1 === 0 ? step.count : step.count.toFixed(2);
                return `<li class="text-sm">× ${countStr} <strong>${escapeHtml(bt?.name || step.buildingTypeId)}</strong></li>`;
              }).join('');
              const inputs = (c.inputGoodIds || []).map(id => {
                const g = data.goods.find(x => x.id === id);
                return `<span class="ref-badge">${escapeHtml(g?.name || id)}</span>`;
              }).join('');
              return `
                <div class="ref-chain">
                  <div class="ref-chain__region ref-badge">${escapeHtml(c.region || '')}</div>
                  <ul class="ref-chain__steps">${steps}</ul>
                  ${inputs ? `<div class="ref-chain__inputs"><span class="text-sm text-muted">Inputs: </span>${inputs}</div>` : ''}
                  ${c.notes ? `<p class="text-sm text-muted">${escapeHtml(c.notes)}</p>` : ''}
                </div>
              `;
            }).join('');
          }
        }
      }
    });
  },
};
