import { world } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "admins",
    description: "Provides you a list of admins",
    aliases: [],
}, (data) => {
    let theText = "§cAdmins:\n";
    for(const player of world.getPlayers({tags:[adminTag]})){
        theText += `${player.name}\n`;
}
data.player.tell(theText);
});