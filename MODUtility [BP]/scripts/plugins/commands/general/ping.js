import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";

Command.register({
    name: "ping",
    description: "Returns the current TPS of the world",
    aliases: ['TPS'],
}, (data) => {
    let pingTick = world.events.tick.subscribe(({ deltaTime }) => {
    data.player.tell(`§cPong! Current TPS: ${1 / deltaTime}`);
    world.events.tick.unsubscribe(pingTick);
                     });
});