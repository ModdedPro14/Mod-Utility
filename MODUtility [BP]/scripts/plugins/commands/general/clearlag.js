import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "clearlag",
    description: "clears the lag in the server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data) => {
    const player = data.player
    player.runCommandAsync('kill @e[type=item]')
    player.tell('§cLag have been cleared')
});