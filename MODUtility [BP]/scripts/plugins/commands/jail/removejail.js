import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, jail } from "../../../config/main.js";

Command.register({
    name: "removejail",
    description: "Removes the current jail location if is set",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    if (!jail.has('jail')) return player.tell('§cThere isnt even a jail set');
    jail.delete('jail');
    for (const player of world.getPlayers({tags:[adminTag]})) {
    player.tell(`§cThe jail location have been removed by ${data.player.name}`)
    }
});