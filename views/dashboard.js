// views/dashboard.js — per-save shell: top bar + bottom tab router

// Tab order matches the spec: Overview / Specialists / Goods / Buildings / Settings
const TABS = ['overview', 'specialists', 'goods', 'buildings', 'settings'];

const DashboardView = {

  // TODO: implement render(saveId)
  // Sets the dashboard as the active view:
  //   - Top bar: save name + back-to-home icon
  //   - Main content area (swapped by renderTab)
  //   - Bottom tab bar with 5 tabs; min tap target 48px
  //   - Defaults to 'overview' tab on first entry
  render(saveId) {},

  // TODO: implement renderTab(saveId, tab)
  // Delegates to the appropriate view module:
  //   overview     → renderOverview(saveId)  (see below, inline in this file)
  //   specialists  → SpecialistsView.render(saveId)
  //   goods        → GoodsView.render(saveId)
  //   buildings    → BuildingsView.render(saveId)
  //   settings     → SettingsView.render(saveId)
  renderTab(saveId, tab) {},

  // TODO: implement renderOverview(saveId)
  // Summary dashboard:
  //   - Island count
  //   - Specialist count (total / unassigned)
  //   - Goods with Deficit trend (quick warning list)
  //   - Active DLCs
  renderOverview(saveId) {},
};
