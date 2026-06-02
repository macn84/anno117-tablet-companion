// data/dlc-registry.js — registry of available DLC data modules.
//
// To add a new DLC: create a file in data/dlc/ using the template in data/dlc/README.md,
// then import it here and add it to the DLC_REGISTRY array. That is the only code change needed.
//
// Example:
//   import { DLC_01 } from './dlc/dlc-01-prophecies-of-ash.js';
//   export const DLC_REGISTRY = [
//     { id: 'dlc-01', name: 'Prophecies of Ash', data: DLC_01 },
//   ];

export const DLC_REGISTRY = [];
