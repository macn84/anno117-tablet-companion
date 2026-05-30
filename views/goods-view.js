// views/goods-view.js — Goods / Storage Tracker tab

const GoodsView = {

  // TODO: implement render(saveId)
  // Two sub-views toggled by a segmented control:
  //   "By Island"  → island accordion list (renderIslandView)
  //   "All Goods"  → scrollable summary table (renderSummaryTable)
  render(saveId) {},

  // TODO: implement renderIslandView(saveId)
  // Accordion: each island expands to show its goods list.
  // Each row: good name | trend badge (Surplus/Stable/Deficit) | note | edit icon
  // Tap row → inline trend picker (3-button row, 2-tap max per spec)
  renderIslandView(saveId) {},

  // TODO: implement renderSummaryTable(saveId)
  // Columns: Good Name | Island 1 | Island 2 | … (one column per island)
  // Cell content: trend badge or "—" if not tracked
  // Horizontally scrollable for saves with many islands
  renderSummaryTable(saveId) {},

  // TODO: implement handleTrendUpdate(saveId, goodId, islandId, trend, note)
  // Calls GoodsService.setTrend(), then re-renders the active sub-view
  handleTrendUpdate(saveId, goodId, islandId, trend, note) {},
};
