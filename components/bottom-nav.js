/**
 * @module bottom-nav
 * @description Persistent bottom tab bar rendered within the save dashboard.
 * {@link BottomNav.render} returns a detached `<nav>` element; the caller is
 * responsible for appending it to the DOM.
 */

/**
 * @typedef {Object} Tab
 * @property {string} id    - Unique route identifier (e.g. `'overview'`, `'goods'`).
 * @property {string} label - Human-readable tab label shown below the icon.
 * @property {string} icon  - Emoji icon rendered above the label.
 */

/**
 * Tab definitions in display order.
 * @type {Tab[]}
 */
export const TABS = [
  { id: 'overview',    label: 'Overview',    icon: '🏛' },
  { id: 'specialists', label: 'Specialists', icon: '👤' },
  { id: 'goods',       label: 'Goods',       icon: '📦' },
  { id: 'buildings',   label: 'Buildings',   icon: '🏗' },
  { id: 'festivals',   label: 'Festivals',   icon: '🎭' },
  { id: 'reference',   label: 'Reference',   icon: '📖' },
  { id: 'settings',    label: 'Settings',    icon: '⚙' },
];

export const BottomNav = {
  /**
   * Renders the nav bar as a detached DOM element ready to be appended.
   * Tab-change events are delegated to the `<nav>` root; clicking the already
   * active tab is silently ignored.
   * @param {string}                   activeTab  - ID of the initially selected tab.
   * @param {function(string): void}   onTabChange - Called with the newly selected tab ID.
   * @returns {HTMLElement} A `<nav>` element.
   */
  render(activeTab, onTabChange) {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = TABS.map(t => `
      <button
        class="bottom-nav__tab${t.id === activeTab ? ' active' : ''}"
        data-tab="${t.id}"
        aria-label="${t.label}"
        aria-current="${t.id === activeTab ? 'page' : 'false'}"
      >
        <span class="tab-icon" aria-hidden="true">${t.icon}</span>
        <span>${t.label}</span>
      </button>
    `).join('');

    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tab]');
      if (btn && btn.dataset.tab !== activeTab) onTabChange(btn.dataset.tab);
    });

    return nav;
  },
};
