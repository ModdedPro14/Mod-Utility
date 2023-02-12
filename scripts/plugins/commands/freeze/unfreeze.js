import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "unfreeze",
    description: "Unfreeze the players name that you selected if is freezed",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if (msg.startsWith(`${prefix}unfreeze `)) {
                          let unfreeze
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(10).toLowerCase()) unfreeze = plr
if (!unfreeze) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}unfreeze`, "")}`)
if (!unfreeze.hasTag('freeze')) {
    player.tell(`§cPlayer: §r${unfreeze.name}§r§c is not freezed`)
} else {
    unfreeze.removeTag('freeze')
    unfreeze.tell(`§cYou have been unfreezed by: §r${player.name}`)
    player.tell(`§cPlayer: §r${unfreeze.name}§r§c has been unfreezed`)
}
} else if (!args[1]) return player.tell('§cYou must type a players name')
});