// views/buildings-view.js — Building Tracker tab.
//
// Displays per-island building counts and notes. Each building type row shows
// its specialist slot count (from buildingTypes data) to help with specialist planning.
//
// Planned for Phase 3. See plan.md for implementation spec.

export const BuildingsView = {
  render(container, { saveId }) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🏗</div>
        <p>Building Tracker</p>
        <p class="text-sm">Coming in the next update</p>
      </div>
    `;
  },
};
