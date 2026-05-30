// js/goods.js — goods/storage tracker per save
//
// Storage key: 'goods:{saveId}'  →  GoodEntry[]
//
// GoodEntry shape:
// {
//   goodId:   string,   // references goods in base-game or active DLC
//   islandId: string,
//   trend:    'Surplus' | 'Stable' | 'Deficit',
//   note:     string,   // optional free-text (e.g. rough stock count)
// }
//
// The full goods list for a save = BASE_GAME.goods + goods from active DLCs.
// GoodEntries are created on first update; absent = not yet tracked.

const TRENDS = ['Surplus', 'Stable', 'Deficit'];

const GoodsService = {

  // TODO: implement list(saveId) → GoodEntry[]
  list(saveId) {},

  // TODO: implement setTrend(saveId, goodId, islandId, trend, note)
  // Upserts: create entry if none exists for (goodId, islandId) pair.
  setTrend(saveId, goodId, islandId, trend, note) {},

  // TODO: implement getIslandSummary(saveId, islandId) → GoodEntry[]
  // Returns all tracked goods for a specific island.
  getIslandSummary(saveId, islandId) {},

  // TODO: implement getAllIslandsSummary(saveId) → { [islandId]: GoodEntry[] }
  // Aggregated view for the summary table.
  getAllIslandsSummary(saveId) {},
};
