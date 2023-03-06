import { world } from "@minecraft/server";
import server from "../../../management/api/server";

server.commands.register({
    name: "list",
    description: "Lists players on the server",
    aliases: [],
}, (data) => {
    let theText = "\n";
    for(const plr of world.getPlayers()) {
        theText += `${plr.name}\n`;
}
const amount = [...world.getPlayers()].length
data.player.tell(`§cThere are ${amount} players online:${theText}`);
});