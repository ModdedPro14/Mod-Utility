import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, ban } from "../../../config/main.js";

Command.register({
    name: "unban",
    description: "unban a player from the server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data, args) => {
   const player = data.player
   const getPlayer = ban.has(args[0])
   if (!args[0]) return player.tell('§cYou must type a players name to unban')
   if (!getPlayer) return player.tell(`§cThe player ${args[0]} §r§cisnt banned`);
   player.tell(`§cYou have unbanned the player ${args[0]}`)
   ban.delete(args[0])
});