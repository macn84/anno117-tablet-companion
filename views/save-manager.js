// views/save-manager.js — Home screen: list / create / delete save profiles

const SaveManagerView = {

  // TODO: implement render()
  // Outputs HTML into #app:
  //   - Header: "Anno 117 Companion"
  //   - List of save cards (SavesService.listAll()), each showing:
  //       * Profile name
  //       * Last modified date (human-readable, e.g. "2 days ago")
  //       * Active DLC count
  //       * Tap → navigate to DASHBOARD for that save
  //       * Long-press or swipe → reveal delete button
  //   - FAB (floating action button) bottom-right → open create modal
  render() {},

  // TODO: implement renderCreateModal()
  // Inline form:
  //   - Text input: profile name (required)
  //   - DLC toggle list (from DLC_REGISTRY) — all off by default
  //   - Create / Cancel buttons
  renderCreateModal() {},

  // TODO: implement handleCreate(name, activeDlcIds)
  // Calls SavesService.create(), then re-renders the save list.
  handleCreate(name, activeDlcIds) {},

  // TODO: implement handleDelete(saveId)
  // Shows a confirmation dialog ("Delete 'Campaign - Latium'? This cannot be undone.")
  // On confirm: SavesService.delete(saveId), re-render list.
  handleDelete(saveId) {},
};
