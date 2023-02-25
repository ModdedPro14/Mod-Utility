import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "ban",
    description: "ban a player from the server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data, args) => {
   const player = data.player
   const user = server.commands.addUserOption(player, args[0])
   if (!user) return;
   const reason = server.commands.addReasonOption(player, args.slice(1).join(` `), true)
   if (!reason) return;
   server.Ban.newBan(player, user, reason)
});