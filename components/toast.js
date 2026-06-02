// Toast notification system — stacks at top of screen, auto-dismisses.

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
  show(message, type = '', duration = 2500) {
    const container = ensureContainer();
    const el = document.createElement('div');
    el.className = 'toast' + (type ? ` toast--${type}` : '');
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg)   { this.show(msg, 'error', 4000); },
};
