import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "setspawn",
    description: "Sets spawn on the location your standing on",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    var X1 = parseInt(player.location.x), Y1 = parseInt(player.location.y), Z1 = parseInt(player.location.z);
    server.spawn.write('spawn', [X1, Y1, Z1]);
    player.tell(`§cSuccessfully set spawn on ${X1}, ${Y1}, ${Z1}`)
});