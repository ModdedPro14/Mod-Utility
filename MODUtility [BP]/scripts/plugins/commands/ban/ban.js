import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, ban } from "../../../config/main.js";

Command.register({
    name: "ban",
    description: "ban a player from the server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data, args) => {
   const player = data.player
   if (!args[0]) return player.tell('§cYou must type a players name')
   if (!args[1]) return player.tell('§cYou must type a reason for their ban')
   const [foundPlayer] = world.getPlayers({ name: args[0] })
   if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[0]}`);
   if (foundPlayer == player) return player.tell("§cYou can't ban yourself")
   if (foundPlayer.hasTag(adminTag)) return player.tell('§cYou cant ban a staff member')
   const Data = {
    name: foundPlayer.name,
    date: new Date().toLocaleString(),
    reason: args.slice(1).join(` `),
    by: player.name
   }
   ban.write(foundPlayer.name, Data)
   player.tell(`§cYou have banned the player ${foundPlayer.name} §r§cReason: ${args.slice(1).join(` `)}`)
});