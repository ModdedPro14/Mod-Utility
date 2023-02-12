import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "freeze",
    description: "Freezes the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if (msg.startsWith(`${prefix}freeze `)) {
                          let freeze
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(8).toLowerCase()) freeze = plr
if (!freeze) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}freeze`, "")}`)
if (freeze == player) return player.tell('§cYou can\'t freeze yourself')
if (freeze.hasTag(adminTag)) return player.tell('§cYou can\'t freeze a staff member')
if (!freeze.hasTag('freeze')) {
    freeze.addTag('freeze')
    freeze.tell(`§cYou have been freezed by:§r ${player.name}`)
    player.tell(`§cPlayer: §r${freeze.name}§r§c has been freezed`)
} else {
    player.tell(`§cPlayer: §r${freeze.name}§r§c is already freezed`)
}
} else if (!args[1]) return player.tell('§cYou must type a players name')
});