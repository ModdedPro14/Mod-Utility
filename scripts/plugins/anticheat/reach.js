import {
    world,
  } from "@minecraft/server";
  import { adminTag } from "../../config/main.js";
  
  const MAX_REACH_LIMIT = 7;
  
  function isReach(p1, p2) {
    return (
      Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2) >
      MAX_REACH_LIMIT
    );
  }
  
  world.events.beforeItemUseOn.subscribe((data) => {
    if (data.source.hasTag(adminTag)) return;
    if (!isReach(data.source, data.blockLocation)) return;
    world.say(`§7§l[§cMOD ANTICHEAT§7] §r${data.source.name} §aWas using reach hacks`)
    data.cancel = true;
  });
  
  world.events.blockBreak.subscribe((data) => {
    if (data.player.hasTag(adminTag)) return;
    if (!isReach(data.player.location, data.block.location)) return;
    world.say(`§7§l[§cMOD ANTICHEAT§7] §r${data.player.name} §aWas using reach hacks`)
    data.dimension
      .getBlock(data.block.location)
      .setPermutation(data.brokenBlockPermutation);
  });
  
  world.events.blockPlace.subscribe((data) => {
    if (data.player.hasTag(adminTag)) return;
    if (!isReach(data.player.location, data.block.location)) return;
    world.say(`§7§l[§cMOD ANTICHEAT§7] §r${data.player.name} §aWas using reach hacks`)
    data.player.runCommandAsync(`setblock ${data.block.location.x} ${data.block.location.y} ${data.block.location.z} air`)
  });
  
  world.events.entityHit.subscribe((data) => {
    if (data.entity.hasTag(adminTag)) return;
    if (data.hitEntity) {
      if (!isReach(data.entity.location, data.hitEntity.location)) return;
    } else if (data.hitBlock) {
      if (!isReach(data.entity.location, data.hitBlock.location)) return;
    } else {
      return;
    } 
      const player = data.entity
          player.runCommandAsync(`damage @s 5 fall`);
          world.say(`§7§l[§cMOD ANTICHEAT§7] §r${player.name} §aWas using reach hacks`)
  });
  