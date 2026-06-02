/**
 * @module modal
 * @description Singleton bottom-sheet modal for forms and confirmations.
 * Only one modal can be open at a time; calling {@link Modal.show} while another
 * is open automatically closes the first.
 */

let _overlay = null;

export const Modal = {
  /**
   * Opens a bottom-sheet modal and auto-focuses the first interactive element.
   * Tapping the backdrop dismisses the modal.
   * @param {Object} [options={}]
   * @param {string} [options.title='']   - Header text rendered above the body.
   * @param {string} [options.content=''] - HTML string for the modal body.
   * @param {string} [options.actions=''] - HTML string for the action button row.
   * @returns {HTMLElement} The overlay element; attach button event listeners to it.
   */
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

  /**
   * Removes the current modal from the DOM. Safe to call when no modal is open.
   */
  hide() {
    if (_overlay) {
      _overlay.remove();
      _overlay = null;
    }
  },
};
