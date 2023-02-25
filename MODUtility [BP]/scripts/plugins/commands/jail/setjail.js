import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "setjail",
    description: "Sets jail on the location your standing on",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    var X = parseInt(player.location.x), Y = parseInt(player.location.y), Z = parseInt(player.location.z);
    server.jail.write('jail', [X, Y, Z]);
    player.tell(`§cSuccessfuly set jail on ${X}, ${Y}, ${Z}`)
});