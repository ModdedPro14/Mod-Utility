import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "heal",
    description: "Regain your health or the players name health",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0]) {
        const [heal] = world.getPlayers({ name: args[0] })
if (!heal) return player.tell(`§cCan't find the player:${args[0]}`)
heal.runCommandAsync('effect @s instant_health 2 255 true')
heal.tell(`§cYou have been healed by §r${player.name}`)
} else {
    player.runCommandAsync('effect @s instant_health 2 255 true')
    player.tell('§cYou have been healed')
}
});