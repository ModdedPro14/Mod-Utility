import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "unmute",
    description: "Unmutes players name that you selected if muted",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const msg = data.message
    if (args[0]) { 
    let foundPlayer
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(8).toLowerCase()) foundPlayer = plr
if (!foundPlayer) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}unmute`, "")}`)
    if (!foundPlayer.hasTag('mute')) return player.tell(`§cPlayer: ${foundPlayer.name}§r§c is not muted`)
    player.tell(`§cYou have unmuted:\n§cPlayer: §r${foundPlayer.name}`);
    foundPlayer.tell(`§cYou have been unmuted:\n§cBy: §r${player.name}`);
    foundPlayer.removeTag('mute')
    } else if (!args[0]) return player.tell('§cYou must type a players name')
});