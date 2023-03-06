import { world } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "mutelist",
    description: "Provides you a list of muted players",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    let theText = "§cMuted Players:\n";
    for(const player of world.getPlayers({tags:["mute"]})){
        theText += `${player.name}\n`;
}

data.player.tell(theText);
});