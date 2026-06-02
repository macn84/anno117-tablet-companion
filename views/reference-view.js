// views/reference-view.js — Read-only in-app wiki tab.
//
// Sub-sections (toggled via segmented control):
//   Specialists | Goods | Production Chains | Buildings | Festivals
//
// All content is pulled from BASE_GAME and active DLC data — nothing is editable here.
// The search bar filters within the active sub-section.
// Production Chains: select an output good to see the full chain with building ratios.
//
// Planned for Phase 3. See plan.md for implementation spec.

export const ReferenceView = {
  render(container, { saveId }) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">📖</div>
        <p>Reference</p>
        <p class="text-sm">Coming in the next update</p>
      </div>
    `;
  },
};
