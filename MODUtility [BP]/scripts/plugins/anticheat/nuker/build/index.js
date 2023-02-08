import { BLOCK_CONTAINERS, CHECK_SIZE } from "../config/moderation";
import { BlockInventory } from "../config/BlockInventory";
import { world, system } from "@minecraft/server";
import { locationToBlockLocation, IContainerLocation } from "./build.js"

export let CONTAINER_LOCATIONS = {};

system.runSchedule(() => {
  CONTAINER_LOCATIONS = {};
  for (const player of world.getPlayers()) {
      if (player.dimension.id != "minecraft:overworld") continue;
    const blockLoc = locationToBlockLocation(player.location);
    const pos1 = blockLoc.offset(CHECK_SIZE.x, CHECK_SIZE.y, CHECK_SIZE.z);
    const pos2 = blockLoc.offset(-CHECK_SIZE.x, -CHECK_SIZE.y, -CHECK_SIZE.z);

    for (const location of pos1.blocksBetween(pos2)) {
      if (location.y < -64) continue;
      const block = player.dimension.getBlock(location);
      if (!BLOCK_CONTAINERS.includes(block.typeId)) continue;
      CONTAINER_LOCATIONS[JSON.stringify(location)] = new BlockInventory(
        block.getComponent("inventory").container
      );
    }
  }
}, 100);