import { BlockLocation } from "@minecraft/server"
import { BlockInventory } from "../config/BlockInventory.js"

export function locationToBlockLocation(loc) {
  return new BlockLocation(
    Math.floor(loc.x),
    Math.floor(loc.y),
    Math.floor(loc.z)
  );
}
export let IContainerLocation = BlockInventory
