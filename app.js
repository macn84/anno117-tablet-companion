/**
 * @module app
 * @description Application entry point.
 *
 * Responsibilities:
 *  1. Registers the service worker for offline support and PWA install eligibility.
 *  2. Initialises {@link module:save-manager~SaveManager} with the DLC registry so
 *     import/export operations can validate DLC references.
 *  3. Drives the two-screen router: save list → per-save dashboard.
 */

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

/**
 * Clears the app container and renders the named view.
 * @param {'save-manager'|'dashboard'} view
 * @param {Object}  [params={}]
 * @param {string}  [params.saveId] - Required when `view` is `'dashboard'`.
 */
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
