import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, spawn } from "../../../config/main.js";

Command.register({
    name: "removespawn",
    description: "Removes the current spawn location if is set",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    if (!spawn.has('spawn')) return player.tell('§cThere isnt even a spawn set')
    spawn.delete('spawn');
    for (const player of world.getPlayers({tags:[adminTag]})) {
    player.tell(`§cThe spawn location have been removed by ${data.player.name}`)
    }
});