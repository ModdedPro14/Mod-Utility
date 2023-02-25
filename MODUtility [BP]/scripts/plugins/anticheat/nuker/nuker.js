import { world, Location, system } from "@minecraft/server";
import { BLOCK_CONTAINERS } from "./config/moderation";
import { CONTAINER_LOCATIONS } from "./build/index.js";
import { PlayerLog } from "./config/PlayerLog.js";
import { adminTag } from "../../../config/main.js"

const log = new PlayerLog();
const IMPOSSIBLE_BREAK_TIME = 70;

const VAILD_BLOCK_TAGS = [
  "snow",
  "lush_plants_replaceable",
  "azalea_log_replaceable",
  "minecraft:crop",
  "fertilize_area",
];

const IMPOSSIBLE_BREAKS = [
  "minecraft:water",
  "minecraft:flowing_water",
  "minecraft:lava",
  "minecraft:flowing_lava",
  "minecraft:bedrock",
];

world.events.blockBreak.subscribe(
  ({ block, brokenBlockPermutation, dimension, player }) => {
    if (!player.hasTag(adminTag)) {
    if (block.getTags().some((tag) => VAILD_BLOCK_TAGS.includes(tag))) return;
    const old = log.get(player);
    log.set(player, Date.now());
    if (!old) return;

    if (IMPOSSIBLE_BREAKS.includes(block.id)) return;
    if (old < Date.now() - IMPOSSIBLE_BREAK_TIME) return;
 
    dimension
      .getBlock(block.location)
      .setPermutation(brokenBlockPermutation.clone());
    if (BLOCK_CONTAINERS.includes(brokenBlockPermutation.type.id)) {
      const OLD_INVENTORY = CONTAINER_LOCATIONS[JSON.stringify(block.location)];
      if (OLD_INVENTORY) {
        OLD_INVENTORY.load(block.getComponent("inventory").container);
      }
      }
      system.run(() => {
      [
        ...dimension.getEntities({
          maxDistance: 2,
          type: "minecraft:item",
          location: new Location(
            block.location.x,
            block.location.y,
            block.location.z
          ),
        }),
      ].forEach((e) => e.kill());
    });
    }
  }
);