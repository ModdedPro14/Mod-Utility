import { world } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "removejail",
    description: "Removes the current jail location if is set",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    if (!server.jail.has('jail')) return player.tell('§cThere isnt even a jail set');
    server.jail.delete('jail');
    for (const player of world.getPlayers({tags:[adminTag]})) {
    player.tell(`§cThe jail location have been removed by ${data.player.name}`)
    }
});