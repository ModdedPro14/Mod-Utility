import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "feed",
    description: "Regain your hunger or the players name hunger",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const msg = data.message
    const player = data.player
    if (args[0]) {
        const [feed] = world.getPlayers({ name: args[0] })
if (!feed) return player.tell(`§cCan't find the player: ${args[0]}`)
feed.runCommandAsync('effect @s saturation 2 255 true')
feed.tell(`§cYou have been feeded by §r${player.name}`)
} else {
    player.runCommandAsync('effect @s saturation 2 255 true')
    player.tell('§cYou have been feeded')
}
});