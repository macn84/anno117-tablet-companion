/**
 * @module specialists-view
 * @description Specialist Tracker tab: filterable list grouped by island, with
 * add/edit/delete via a bottom-sheet modal. Supports both known specialists
 * (resolved from BASE_GAME data) and user-created custom entries.
 *
 * The island filter uses the sentinel value `'__unassigned'` — a string that
 * can never collide with a real island ID — to represent the "Unassigned" option.
 */

import { BASE_GAME } from '../data/base-game.js';
import { SpecialistTracker } from '../modules/specialist-tracker.js';
import { IslandsService } from '../modules/islands.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

const RARITIES = ['Common', 'Rare', 'Epic', 'Legendary'];

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Returns the display name for a known or custom assignment.
function resolveDisplayName(assignment) {
  if (assignment.isCustom) return assignment.customName || 'Custom Specialist';
  const spec = BASE_GAME.specialists.find(s => s.id === assignment.specialistId);
  return spec?.name || assignment.customName || assignment.specialistId;
}

function resolveRarity(assignment) {
  if (assignment.isCustom) return assignment.rarity || 'Common';
  return BASE_GAME.specialists.find(s => s.id === assignment.specialistId)?.rarity || assignment.rarity || 'Common';
}

function resolveCategory(assignment) {
  if (assignment.isCustom) return assignment.category || '';
  return BASE_GAME.specialists.find(s => s.id === assignment.specialistId)?.category || assignment.category || '';
}

export const SpecialistsView = {
  _saveId: null,
  _container: null,
  _filterRarity: '',
  _filterIslandId: '',
  _filterSearch: '',

  /**
   * Renders the Specialists tab into the given container.
   * Resets all active filters on each call.
   * @param {HTMLElement} container
   * @param {Object}      options
   * @param {string}      options.saveId
   */
  render(container, { saveId }) {
    this._saveId = saveId;
    this._container = container;
    this._filterRarity = '';
    this._filterIslandId = '';
    this._filterSearch = '';
    this._draw();
  },

  _draw() {
    const islands = IslandsService.list(this._saveId);
    const allAssignments = SpecialistTracker.list(this._saveId);

    const isSearching = this._filterSearch.length > 0;

    // Apply filters
    let filtered = allAssignments;
    if (this._filterRarity) filtered = filtered.filter(a => resolveRarity(a) === this._filterRarity);
    if (this._filterIslandId === '__unassigned') {
      filtered = filtered.filter(a => !a.islandId);
    } else if (this._filterIslandId) {
      filtered = filtered.filter(a => a.islandId === this._filterIslandId);
    }
    if (isSearching) {
      const q = this._filterSearch.toLowerCase();
      filtered = filtered.filter(a => resolveDisplayName(a).toLowerCase().includes(q));
    }

    // Group: by island name, then unassigned — skip when searching (flat list)
    const byIsland = {};
    const unassigned = [];
    for (const a of filtered) {
      if (!a.islandId) {
        unassigned.push(a);
      } else {
        if (!byIsland[a.islandId]) byIsland[a.islandId] = [];
        byIsland[a.islandId].push(a);
      }
    }

    const islandOptions = islands.map(i =>
      `<option value="${escapeHtml(i.id)}"${this._filterIslandId === i.id ? ' selected' : ''}>${escapeHtml(i.name)}</option>`
    ).join('');

    const rarityChips = RARITIES.map(r => `
      <button class="chip${this._filterRarity === r ? ' chip--active' : ''}" data-rarity="${r}">${r}</button>
    `).join('');

    let listHtml = '';

    if (filtered.length === 0) {
      const emptyMsg = isSearching
        ? `<p>No specialists match "<strong>${escapeHtml(this._filterSearch)}</strong>"</p>`
        : `<p>No specialists yet</p><p class="text-sm">Tap + to add your first specialist</p>`;
      listHtml = `<div class="empty-state"><div class="empty-state__icon">👤</div>${emptyMsg}</div>`;
    } else if (isSearching) {
      // Flat list with island name inline so results span all islands clearly
      const islandMap = Object.fromEntries(islands.map(i => [i.id, i.name]));
      listHtml = `<div class="specialist-group">
        <h3 class="specialist-group__label">${filtered.length} result${filtered.length !== 1 ? 's' : ''}</h3>
        ${filtered.map(a => this._cardHtml(a, islandMap[a.islandId] || null)).join('')}
      </div>`;
    } else {
      // Render island groups
      for (const island of islands) {
        const group = byIsland[island.id];
        if (!group || group.length === 0) continue;
        listHtml += `<div class="specialist-group">
          <h3 class="specialist-group__label">${escapeHtml(island.name)}</h3>
          ${group.map(a => this._cardHtml(a)).join('')}
        </div>`;
      }
      // Render unassigned
      if (unassigned.length > 0) {
        listHtml += `<div class="specialist-group">
          <h3 class="specialist-group__label">Unassigned</h3>
          ${unassigned.map(a => this._cardHtml(a)).join('')}
        </div>`;
      }
    }

    this._container.innerHTML = `
      <div class="tab-toolbar">
        <input type="search" class="input-search" id="filter-search"
          placeholder="Search specialists…" value="${escapeHtml(this._filterSearch)}" autocomplete="off"/>
        <div class="chip-row">
          <button class="chip${!this._filterRarity ? ' chip--active' : ''}" data-rarity="">All</button>
          ${rarityChips}
        </div>
        <select class="input-select" id="filter-island">
          <option value=""${!this._filterIslandId ? ' selected' : ''}>All islands</option>
          <option value="__unassigned"${this._filterIslandId === '__unassigned' ? ' selected' : ''}>Unassigned</option>
          ${islandOptions}
        </select>
      </div>
      <div class="specialist-list">${listHtml}</div>
      <button class="fab" id="fab-add-specialist" aria-label="Add specialist">+</button>
    `;

    // Search input — debounce not needed on mobile at this data size
    this._container.querySelector('#filter-search').addEventListener('input', e => {
      this._filterSearch = e.target.value;
      this._draw();
    });

    // Filter chip events
    this._container.querySelectorAll('.chip[data-rarity]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._filterRarity = btn.dataset.rarity;
        this._draw();
      });
    });

    // Island filter
    this._container.querySelector('#filter-island').addEventListener('change', e => {
      this._filterIslandId = e.target.value;
      this._draw();
    });

    // Card tap → edit
    this._container.addEventListener('click', e => {
      const card = e.target.closest('[data-assignment-id]');
      if (card && !e.target.closest('.fab')) {
        const assignment = SpecialistTracker.list(this._saveId).find(a => a.id === card.dataset.assignmentId);
        if (assignment) this._showModal(assignment);
      }
    });

    // FAB → add
    this._container.querySelector('#fab-add-specialist')
      .addEventListener('click', () => this._showModal(null));
  },

  _cardHtml(a, islandNameOverride = null) {
    const name = escapeHtml(resolveDisplayName(a));
    const rarity = resolveRarity(a).toLowerCase();
    const category = resolveCategory(a);
    const catName = BASE_GAME.specialistCategories.find(c => c.id === category)?.name || category;
    const slot = a.structure ? escapeHtml(a.structure) : '—';
    const notes = a.notes ? `<div class="card__notes text-sm text-muted">${escapeHtml(a.notes)}</div>` : '';
    const locationLine = islandNameOverride !== null
      ? `<div class="specialist-card__location text-sm">${escapeHtml(islandNameOverride)} · ${slot}</div>`
      : '';
    const metaParts = islandNameOverride !== null ? escapeHtml(catName) : `${escapeHtml(catName)} · ${slot}`;
    return `
      <div class="specialist-card" data-assignment-id="${escapeHtml(a.id)}" role="button" tabindex="0">
        <div class="specialist-card__header">
          <span class="rarity-badge rarity-${rarity}">${RARITIES.find(r => r.toLowerCase() === rarity) || rarity}</span>
          <span class="specialist-card__name">${name}</span>
        </div>
        <div class="specialist-card__meta text-sm text-muted">${metaParts}</div>
        ${locationLine}
        ${notes}
      </div>
    `;
  },

  _showModal(existing) {
    const islands = IslandsService.list(this._saveId);
    const isEdit = !!existing;

    const islandOptions = [
      `<option value="">Unassigned</option>`,
      ...islands.map(i => `<option value="${escapeHtml(i.id)}"${existing?.islandId === i.id ? ' selected' : ''}>${escapeHtml(i.name)}</option>`)
    ].join('');

    const rarityOptions = RARITIES.map(r =>
      `<option value="${r}"${(existing ? resolveRarity(existing) : 'Common') === r ? ' selected' : ''}>${r}</option>`
    ).join('');

    const categoryOptions = BASE_GAME.specialistCategories.map(c =>
      `<option value="${escapeHtml(c.id)}"${(existing ? resolveCategory(existing) : '') === c.id ? ' selected' : ''}>${escapeHtml(c.name)}</option>`
    ).join('');

    const isCustom = existing?.isCustom ?? false;
    const currentName = isEdit ? resolveDisplayName(existing) : '';

    const overlay = Modal.show({
      title: isEdit ? 'Edit Specialist' : 'Add Specialist',
      content: `
        <div id="search-section"${isEdit && !isCustom ? ' style="display:none"' : ''}>
          <input type="text" id="spec-search" placeholder="Search known specialists…" autocomplete="off" value="${isEdit && !isCustom ? '' : escapeHtml(currentName)}"/>
          <div id="spec-search-results" class="search-results"></div>
          <button class="btn btn-secondary btn-sm" id="toggle-custom" style="margin-top:8px">
            ${isCustom ? 'Search known specialists' : 'Add unlisted / custom specialist'}
          </button>
        </div>
        <div id="custom-name-row"${isCustom || (isEdit && !isCustom) ? '' : ' style="display:none"'}>
          <label class="form-label" for="spec-name">Name</label>
          <input type="text" id="spec-name" placeholder="Specialist name" value="${escapeHtml(currentName)}" autocomplete="off"/>
        </div>
        <input type="hidden" id="spec-id" value="${isEdit && !isCustom ? escapeHtml(existing.specialistId || '') : ''}"/>
        <input type="hidden" id="spec-is-custom" value="${isCustom ? 'true' : 'false'}"/>
        <label class="form-label" for="spec-rarity">Rarity</label>
        <select class="input-select" id="spec-rarity">${rarityOptions}</select>
        <label class="form-label" for="spec-category">Category</label>
        <select class="input-select" id="spec-category">
          <option value="">— select —</option>
          ${categoryOptions}
        </select>
        <label class="form-label" for="spec-island">Island</label>
        <select class="input-select" id="spec-island">${islandOptions}</select>
        <label class="form-label" for="spec-structure">Location</label>
        <select class="input-select" id="spec-structure">
          <option value="">— select —</option>
          <option value="Villa"${existing?.structure === 'Villa' ? ' selected' : ''}>Villa</option>
          <option value="Officium"${existing?.structure === 'Officium' ? ' selected' : ''}>Officium</option>
          <option value="Storage"${existing?.structure === 'Storage' ? ' selected' : ''}>Storage</option>
          <option value="Ship"${existing?.structure === 'Ship' ? ' selected' : ''}>Ship</option>
        </select>
        <label class="form-label" for="spec-notes">Notes</label>
        <textarea id="spec-notes" rows="2" placeholder="Optional notes…">${escapeHtml(existing?.notes || '')}</textarea>
      `,
      actions: `
        ${isEdit ? `<button class="btn btn-danger" id="modal-delete">Delete</button>` : ''}
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-save">${isEdit ? 'Save' : 'Add'}</button>
      `,
    });

    // Typeahead
    const searchInput = overlay.querySelector('#spec-search');
    const resultsEl = overlay.querySelector('#spec-search-results');

    const updateSearch = () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { resultsEl.innerHTML = ''; return; }
      const matches = BASE_GAME.specialists
        .filter(s => s.name.toLowerCase().includes(q))
        .slice(0, 8);
      resultsEl.innerHTML = matches.map(s => `
        <div class="search-result-item" data-spec-id="${escapeHtml(s.id)}" data-spec-name="${escapeHtml(s.name)}" data-spec-rarity="${s.rarity}" data-spec-category="${s.category}">
          <span class="rarity-badge rarity-${s.rarity.toLowerCase()}">${s.rarity}</span>
          ${escapeHtml(s.name)}
        </div>
      `).join('') || '<div class="text-sm text-muted" style="padding:8px">No matches — add as custom</div>';
    };

    searchInput?.addEventListener('input', updateSearch);

    resultsEl?.addEventListener('click', e => {
      const item = e.target.closest('[data-spec-id]');
      if (!item) return;
      overlay.querySelector('#spec-id').value = item.dataset.specId;
      overlay.querySelector('#spec-is-custom').value = 'false';
      overlay.querySelector('#spec-rarity').value = item.dataset.specRarity;
      overlay.querySelector('#spec-category').value = item.dataset.specCategory;
      overlay.querySelector('#spec-name').value = item.dataset.specName;
      overlay.querySelector('#custom-name-row').style.display = 'none';
      searchInput.value = item.dataset.specName;
      resultsEl.innerHTML = '';
    });

    // Toggle custom
    overlay.querySelector('#toggle-custom')?.addEventListener('click', () => {
      const isNowCustom = overlay.querySelector('#spec-is-custom').value !== 'true';
      overlay.querySelector('#spec-is-custom').value = isNowCustom ? 'true' : 'false';
      overlay.querySelector('#custom-name-row').style.display = isNowCustom ? '' : 'none';
      overlay.querySelector('#search-section').style.display = isNowCustom ? 'none' : '';
      overlay.querySelector('#toggle-custom').textContent = isNowCustom
        ? 'Search known specialists' : 'Add unlisted / custom specialist';
    });

    // Cancel
    overlay.querySelector('#modal-cancel').addEventListener('click', () => Modal.hide());

    // Delete
    overlay.querySelector('#modal-delete')?.addEventListener('click', () => {
      SpecialistTracker.remove(this._saveId, existing.id);
      Modal.hide();
      Toast.success('Specialist removed');
      this._draw();
    });

    // Save
    overlay.querySelector('#modal-save').addEventListener('click', () => {
      const specIsCustom = overlay.querySelector('#spec-is-custom').value === 'true';
      const specId = overlay.querySelector('#spec-id').value;
      const specName = overlay.querySelector('#spec-name').value.trim();
      const islandId = overlay.querySelector('#spec-island').value || null;
      const structure = overlay.querySelector('#spec-structure').value.trim();
      const notes = overlay.querySelector('#spec-notes').value.trim();
      const rarity = overlay.querySelector('#spec-rarity').value;
      const category = overlay.querySelector('#spec-category').value;

      if (specIsCustom && !specName) {
        Toast.error('Please enter a specialist name.');
        return;
      }
      if (!specIsCustom && !specId) {
        Toast.error('Please search and select a specialist, or switch to custom.');
        return;
      }

      const fields = {
        specialistId: specIsCustom ? null : specId,
        customName: specIsCustom ? specName : '',
        isCustom: specIsCustom,
        rarity: specIsCustom ? rarity : undefined,
        category: specIsCustom ? category : undefined,
        islandId,
        structure,
        notes,
      };

      if (isEdit) {
        SpecialistTracker.update(this._saveId, existing.id, fields);
        Toast.success('Specialist updated');
      } else {
        SpecialistTracker.add(this._saveId, fields);
        Toast.success('Specialist added');
      }

      Modal.hide();
      this._draw();
    });
  },
};
