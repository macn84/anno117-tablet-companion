// views/save-manager.js — Home screen: list, create, export, and delete saves.

import { SaveManager } from '../modules/save-manager.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const SaveManagerView = {
  _container: null,
  _onOpen: null,

  render(container, { onOpen }) {
    this._container = container;
    this._onOpen = onOpen;
    this._draw();
  },

  _draw() {
    const saves = SaveManager.listAll();
    const listHtml = saves.length === 0
      ? `<div class="empty-state">
           <div class="empty-state__icon">🏛</div>
           <p>No saves yet</p>
           <p class="text-sm">Tap + to create your first save file</p>
         </div>`
      : saves.map(s => `
          <div class="save-card">
            <div class="save-card__name">${escapeHtml(s.name)}</div>
            <div class="save-card__meta">Modified ${timeAgo(s.updatedAt)}</div>
            <div class="save-card__actions">
              <button class="btn btn-primary btn-sm" data-action="open" data-id="${s.id}">Open</button>
              <button class="btn btn-secondary btn-sm" data-action="export" data-id="${s.id}">Export</button>
              <button class="btn btn-danger btn-sm" data-action="delete" data-id="${s.id}" data-name="${escapeHtml(s.name)}">Delete</button>
            </div>
          </div>
        `).join('');

    this._container.innerHTML = `
      <div class="save-manager-header">
        <h1>Anno 117 Companion</h1>
        <p class="text-muted text-sm">Pax Romana save files</p>
      </div>
      <div class="save-list">${listHtml}</div>
      <button class="fab" id="fab-create" aria-label="Create new save">+</button>
    `;

    this._container.querySelector('#fab-create')
      .addEventListener('click', () => this._showCreateModal());

    this._container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const { action, id, name } = btn.dataset;
      if (action === 'open')   this._onOpen(id);
      if (action === 'export') this._handleExport(id);
      if (action === 'delete') this._handleDelete(id, name);
    });
  },

  _showCreateModal() {
    const overlay = Modal.show({
      title: 'New Save File',
      content: `
        <label class="visually-hidden" for="new-save-name">Save file name</label>
        <input
          type="text"
          id="new-save-name"
          placeholder="e.g. Campaign — Latium"
          maxlength="60"
          autocomplete="off"
          autocapitalize="words"
        />
      `,
      actions: `
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-create">Create</button>
      `,
    });

    const doCreate = () => {
      const name = overlay.querySelector('#new-save-name').value.trim();
      if (!name) { Toast.error('Please enter a name for the save.'); return; }
      SaveManager.create(name);
      Modal.hide();
      Toast.success(`"${name}" created`);
      this._draw();
    };

    overlay.querySelector('#modal-cancel').addEventListener('click', () => Modal.hide());
    overlay.querySelector('#modal-create').addEventListener('click', doCreate);
    overlay.querySelector('#new-save-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doCreate();
    });
  },

  _handleExport(saveId) {
    try {
      const save = SaveManager.get(saveId);
      const json = SaveManager.exportToJSON(saveId);
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
  },

  _handleDelete(saveId, name) {
    const overlay = Modal.show({
      title: 'Delete save?',
      content: `<p>Delete <strong>${escapeHtml(name)}</strong>? This cannot be undone.</p>`,
      actions: `
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-danger" id="modal-confirm">Delete</button>
      `,
    });
    overlay.querySelector('#modal-cancel').addEventListener('click', () => Modal.hide());
    overlay.querySelector('#modal-confirm').addEventListener('click', () => {
      SaveManager.delete(saveId);
      Modal.hide();
      Toast.success(`"${name}" deleted`);
      this._draw();
    });
  },
};
