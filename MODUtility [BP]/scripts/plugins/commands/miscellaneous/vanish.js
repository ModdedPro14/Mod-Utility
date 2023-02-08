import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "vanish",
    description: "Makes you invisible to others",
    aliases: ['v'],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    if (!player.hasTag("vanish")) {
                      player.runCommandAsync(`effect @s invisibility 9999999 255 true`)
                      player.runCommandAsync('tellraw @s {"rawtext":[{"text":"§aYou are now in vanish mode"}]}')
                      player.runCommandAsync('tag @s add vanish')
             
             } else if (player.hasTag("vanish")) {
                 player.runCommandAsync('effect @s clear')
                 player.runCommandAsync('tellraw @s {"rawtext":[{"text":"§aYou are no longer in vanish mode"}]}')
                 player.runCommandAsync('tag @s remove vanish')
             }
});