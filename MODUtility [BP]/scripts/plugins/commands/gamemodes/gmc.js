import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "gmc",
    description: "Changes your gamemode to creative",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    data.player.runCommandAsync("gamemode c @s")
    data.player.tell('§cYour gamemode have been set to §6Creative')
});