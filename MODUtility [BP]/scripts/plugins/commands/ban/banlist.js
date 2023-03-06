import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "banlist",
    description: "Provides you a list of banned players",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data) => {
   const player = data.player
   server.ban.banlist(player)
});