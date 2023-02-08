import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, jail } from "../../../config/main.js";

Command.register({
    name: "setjail",
    description: "Sets jail on the location your standing on",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    var X = parseInt(player.location.x), Y = parseInt(player.location.y), Z = parseInt(player.location.z);
         jail.write('jail', [X, Y, Z]);
    player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cSuccessfuly set jail on ${X}, ${Y}, ${Z}"}]}`)
});