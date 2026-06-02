/**
 * @module toast
 * @description Stacked toast notification system. Toasts auto-dismiss after a
 * configurable delay and are appended to a shared container at the top of
 * `document.body` (created lazily on first use).
 */

let _container = null;

function ensureContainer() {
  if (!_container) {
    _container = document.createElement('div');
    _container.className = 'toast-container';
    document.body.appendChild(_container);
  }
  return _container;
}

export const Toast = {
  /**
   * Shows a toast notification.
   * @param {string} message
   * @param {string} [type='']       - CSS BEM modifier suffix (e.g. `'success'`, `'error'`).
   * @param {number} [duration=2500] - Auto-dismiss delay in milliseconds.
   */
  show(message, type = '', duration = 2500) {
    const container = ensureContainer();
    const el = document.createElement('div');
    el.className = 'toast' + (type ? ` toast--${type}` : '');
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), duration);
  },

  /** @param {string} msg - Auto-dismisses after 2.5 s. */
  success(msg) { this.show(msg, 'success'); },
  /** @param {string} msg - Auto-dismisses after 4 s (errors warrant longer visibility). */
  error(msg)   { this.show(msg, 'error', 4000); },
};
