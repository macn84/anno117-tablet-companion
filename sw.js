// Service Worker — enables offline use and home screen installation

const CACHE_NAME = 'anno117-companion-v1';

// TODO: keep this list in sync with all script/style/asset files in index.html
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/app.js',
  '/data/base-game.js',
  '/data/dlc-registry.js',
  '/js/storage.js',
  '/js/saves.js',
  '/js/islands.js',
  '/js/specialists.js',
  '/js/goods.js',
  '/js/buildings.js',
  '/views/save-manager.js',
  '/views/dashboard.js',
  '/views/specialists-view.js',
  '/views/goods-view.js',
  '/views/buildings-view.js',
  '/views/settings-view.js',
  // TODO: add icon paths once icons are created
];

// install: pre-cache all static assets
self.addEventListener('install', (event) => {
  // TODO: implement cache population
});

// activate: clean up old cache versions
self.addEventListener('activate', (event) => {
  // TODO: delete caches where key !== CACHE_NAME
});

// fetch: cache-first strategy — serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  // TODO: implement cache-first fetch handler
  // No network requests are expected at runtime (all data is local),
  // so a pure cache-first strategy should be safe here.
});
