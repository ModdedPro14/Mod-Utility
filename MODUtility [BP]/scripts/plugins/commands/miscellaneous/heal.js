import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "heal",
    description: "Regain your health or the players name health",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const msg = data.message
    const player = data.player
    if (args[0]) {
                          let heal
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(6).toLowerCase()) heal = plr
if (!heal) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}heal`, "")}`)
heal.runCommandAsync('effect @s instant_health 2 255 true')
heal.tell(`§cYou have been healed by §r${player.name}`)
} else {
    player.runCommandAsync('effect @s instant_health 2 255 true')
    player.tell('§cYou have been healed')
}
});