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
                          let feed
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(6).toLowerCase()) feed = plr
if (!feed) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}feed`, "")}`)
feed.runCommandAsync('effect @s saturation 2 255 true')
feed.tell(`§cYou have been feeded by §r${player.name}`)
} else {
    player.runCommandAsync('effect @s saturation 2 255 true')
    player.tell('§cYou have been feeded')
}
});