// Service Worker — enables offline use and home screen installation.
// Cache-first strategy: all app assets are local so network is never needed at runtime.
// Bump CACHE_NAME version string whenever assets change to invalidate the old cache.

const CACHE_NAME = 'anno117-companion-v4';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './404.html',
  './manifest.json',
  './styles.css',
  './app.js',
  './data/base-game.js',
  './data/dlc-registry.js',
  './data/dlc/dlc-01-prophecies-of-ash.js',
  './modules/save-manager.js',
  './modules/islands.js',
  './modules/specialist-tracker.js',
  './modules/goods-tracker.js',
  './modules/building-tracker.js',
  './modules/festival-tracker.js',
  './modules/production-ref.js',
  './modules/import-export.js',
  './components/modal.js',
  './components/toast.js',
  './components/bottom-nav.js',
  './views/save-manager.js',
  './views/dashboard.js',
  './views/specialists-view.js',
  './views/goods-view.js',
  './views/buildings-view.js',
  './views/festivals-view.js',
  './views/reference-view.js',
  './views/settings-view.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
