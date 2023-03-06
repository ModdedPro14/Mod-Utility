import { world } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "freezelist",
    description: "Gives you a list of freezed players",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    let theText = "§cFreezed Players:\n";
    for(const player of world.getPlayers({tags:["freeze"]})){
        theText += `${player.name}\n`;
}
data.player.tell(theText);
});