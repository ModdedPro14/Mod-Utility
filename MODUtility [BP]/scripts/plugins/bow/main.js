import { Player, world } from "@minecraft/server";

world.events.projectileHit.subscribe((arg) => {
  if (arg.entityHit?.entity instanceof Player && arg.source instanceof Player) {
    arg.source.playSound("random.orb", {pitch: 0.5, volume:0.4});
  };
});