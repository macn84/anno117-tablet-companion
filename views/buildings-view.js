// views/buildings-view.js — Building Tracker tab

const BuildingsView = {

  // TODO: implement render(saveId)
  // Island accordion list.
  // Each island section shows its buildings as rows:
  //   building type name | user label (if set) | specialist slots used/total | edit icon
  // FAB per island section (or global) → add building modal
  render(saveId) {},

  // TODO: implement renderAddEditModal(saveId, islandId, building?)
  // Fields:
  //   - Building type (dropdown from merged base + DLC buildingTypes)
  //   - Label (optional text, e.g. "North Harbour")
  renderAddEditModal(saveId, islandId, building) {},

  // TODO: implement handleSave(saveId, islandId, fields, existingId?)
  handleSave(saveId, islandId, fields, existingId) {},

  // TODO: implement handleDelete(saveId, buildingId)
  // Warn user if specialists are assigned to this building before deleting.
  handleDelete(saveId, buildingId) {},
};
