import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "prefix",
    description: "Change the current prefix",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must provide a prefix');
    if (args[1]) return player.tell('§cYou can\'t have spaces in your prefix');
    if (args[0].startsWith('/')) return player.tell('§cYour prefix can\'t contain a slash');
    for (const plr of world.getPlayers({tags:[adminTag]})) {
    plr.tell(`§cThe current prefix have been changed from "${main.prefix}"§r§c to "${args[0]}"§r§c by ${player.name}`)
    }
    main.prefix = args[0]
});