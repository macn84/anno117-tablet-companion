// views/specialists-view.js — Specialist Tracker tab

const SpecialistsView = {

  // TODO: implement render(saveId)
  // Layout:
  //   - Filter chips row: All | by rarity | by category | by island | Unassigned
  //   - Specialist card list (SpecialistsService.list filtered by active chips)
  //     Each card shows: name, rarity badge (colour-coded), category, assignment
  //   - FAB → open add-specialist modal
  render(saveId) {},

  // TODO: implement renderCard(specialist)
  // Inline card; tap → open edit modal
  // Rarity badge uses --color-rarity-{rarity} CSS variable
  renderCard(specialist) {},

  // TODO: implement renderAddEditModal(saveId, specialist?)
  // specialist = null → add mode; specialist provided → edit mode
  // Fields:
  //   - Name (text)
  //   - Rarity (segmented control: Common / Rare / Epic / Legendary)
  //   - Category (dropdown from merged base + DLC specialistCategories)
  //   - Island (dropdown from IslandsService.list(saveId) + "Unassigned")
  //   - Assignment type (dropdown from assignmentTypes, enabled only if island set)
  renderAddEditModal(saveId, specialist) {},

  // TODO: implement handleSave(saveId, fields, existingId?)
  // add or update via SpecialistsService, then re-render list
  handleSave(saveId, fields, existingId) {},

  // TODO: implement handleDelete(saveId, specialistId)
  handleDelete(saveId, specialistId) {},
};
