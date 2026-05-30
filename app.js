// app.js — entry point: service worker registration, app boot, top-level routing

// TODO: register service worker
// if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')

// TODO: define route constants
// ROUTES = { SAVE_MANAGER, DASHBOARD, ... }

// TODO: implement router
// - reads a route from a module-level variable (no hash/URL routing needed;
//   all navigation is in-memory since this is a single-page offline app)
// - calls renderView(route, params) which replaces #app innerHTML

// TODO: implement renderView(route, params)
// - SAVE_MANAGER  → SaveManagerView.render()
// - DASHBOARD     → DashboardView.render(saveId)
// (individual tab views are rendered by DashboardView, not by the top-level router)

// TODO: boot sequence
// 1. StorageService.init() — detect localStorage vs IndexedDB capacity
// 2. navigate to SAVE_MANAGER
