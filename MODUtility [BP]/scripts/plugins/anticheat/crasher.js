import { world } from "@minecraft/server";
import { adminTag } from "../../config/main.js";

world.events.tick.subscribe(() => {
  for (const player of world.getPlayers()) {
    if (player.hasTag(adminTag)) return;
    if (
      Math.abs(player.location.x) > 30000000 ||
      Math.abs(player.location.y) > 30000000 ||
      Math.abs(player.location.z) > 30000000
    ) {
      player.runCommandAsync(
        `kick "${player.name}" §aYou have been kicked for trying to "§eCrash the game§a", please turn off your hacks!`
      );
      world.say(`7§l[§cMOD ANTICHEAT§7] §r${player.name} §aWas trying to crash the game`)
    }
  }
});