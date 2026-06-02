// Bottom tab navigation — always visible within the save dashboard.

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
