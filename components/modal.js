// Generic bottom-sheet modal — used for create save, confirmations, etc.

let _overlay = null;

export const Modal = {
  show({ title = '', content = '', actions = '' } = {}) {
    this.hide();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-sheet" role="dialog" aria-modal="true">
        <div class="modal-sheet__handle"></div>
        ${title ? `<div class="modal-sheet__title">${title}</div>` : ''}
        <div class="modal-sheet__body">${content}</div>
        ${actions ? `<div class="modal-sheet__actions">${actions}</div>` : ''}
      </div>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hide();
    });

    document.body.appendChild(overlay);
    _overlay = overlay;

    const firstInput = overlay.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();

    return overlay;
  },

  hide() {
    if (_overlay) {
      _overlay.remove();
      _overlay = null;
    }
  },
};
