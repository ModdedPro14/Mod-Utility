import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, ban } from "../../../config/main.js";

Command.register({
    name: "banview",
    description: "Provides you with info about a banned player",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data, args) => {
   const player = data.player
   if (!args[0]) return player.tell('§cYou must type a banned players name to view')
   if (!ban.has(args[0])) return player.tell('§cYou must type a players name that is banned')
   const Data = ban.read(args[0])
   let text = '\n'
   text += `§cName: ${Data.name} \n§r§cBanned by: ${Data.by} \n§r§cBanned at: ${Data.date} \n§r§cReason: ${Data.reason}`
   player.tell(`§cViewing the banned player ${args[0]}:${text}`)
});