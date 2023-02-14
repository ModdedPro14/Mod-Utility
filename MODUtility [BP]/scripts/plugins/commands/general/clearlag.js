import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "clearlag",
    description: "clears the lag in the server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data) => {
    const player = data.player
    player.runCommandAsync('kill @e[type=!player, type=!armor_stand]')
    player.runCommandAsync('kill @e[type=item]')
    player.tell('§cLag have been cleared')
});