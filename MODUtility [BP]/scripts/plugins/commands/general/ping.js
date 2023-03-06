import { world } from "@minecraft/server";
import server from "../../../management/api/server";

server.commands.register({
    name: "ping",
    description: "Returns the current TPS of the world",
    aliases: ['TPS'],
}, (data) => {
    let pingTick = world.events.tick.subscribe(({ deltaTime }) => {
    data.player.tell(`§cPong! Current TPS: ${1 / deltaTime}`);
    world.events.tick.unsubscribe(pingTick);
});
});