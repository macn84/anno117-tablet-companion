// app.js — entry point: SW registration, data init, top-level router.

import { DLC_REGISTRY } from './data/dlc-registry.js';
import { SaveManager } from './modules/save-manager.js';
import { SaveManagerView } from './views/save-manager.js';
import { DashboardView } from './views/dashboard.js';

// Register service worker.
// Uses relative path so it works both at domain root and in a subdirectory (e.g. GitHub Pages).
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('SW registered, scope:', reg.scope))
    .catch(err => console.warn('SW registration failed:', err));
}

// Initialise SaveManager with the DLC registry so import/export warnings work.
SaveManager.init(DLC_REGISTRY);

const app = document.getElementById('app');

function navigate(view, params = {}) {
  app.innerHTML = '';
  if (view === 'save-manager') {
    SaveManagerView.render(app, {
      onOpen: (saveId) => navigate('dashboard', { saveId }),
    });
  } else if (view === 'dashboard') {
    DashboardView.render(app, {
      saveId: params.saveId,
      onBack: () => navigate('save-manager'),
    });
  }
}

navigate('save-manager');
