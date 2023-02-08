import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, ban } from "../../../config/main.js";

Command.register({
    name: "banlist",
    description: "Provides you a list of banned players",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data) => {
   const player = data.player
   player.tell(`§c----------------\nBanned Players:${ban.allKeys()}\n§c----------------`)
});