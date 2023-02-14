import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, spawn } from "../../../config/main.js";

Command.register({
    name: "setspawn",
    description: "Sets spawn on the location your standing on",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    var X1 = parseInt(player.location.x), Y1 = parseInt(player.location.y), Z1 = parseInt(player.location.z);
    spawn.write('spawn', [X1, Y1, Z1]);
    player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cSuccessfuly set spawn on ${X1}, ${Y1}, ${Z1}"}]}`)
});