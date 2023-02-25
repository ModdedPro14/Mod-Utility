import { world } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "removespawn",
    description: "Removes the current spawn location if is set",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    if (!server.spawn.has('spawn')) return player.tell('§cThere isnt even a spawn set')
    server.spawn.delete('spawn');
    for (const player of world.getPlayers({tags:[adminTag]})) {
    player.tell(`§cThe spawn location have been removed by ${data.player.name}`)
    }
});