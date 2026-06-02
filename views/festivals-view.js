// views/festivals-view.js — Festival Tracker tab.
//
// Lists all festivals from BASE_GAME.festivals and active DLC data.
// Users can toggle each festival active/inactive and add personal timing notes.
// Reference info (effect, trigger condition) is displayed read-only from data files.
//
// Planned for Phase 3. See plan.md for implementation spec.

export const FestivalsView = {
  render(container, { saveId }) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🎭</div>
        <p>Festival Tracker</p>
        <p class="text-sm">Coming in the next update</p>
      </div>
    `;
  },
};
