import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { spawn } from "../../../config/main.js";

Command.register({
    name: "spawn",
    description: "Teleports you to spawn if is set",
    aliases: [],
}, (data) => {
    const player = data.player
    if (player.hasTag('jailed')) return player.tell('§cYou can\'t use this command while your jailed')
    if (!spawn.has('spawn')) return player.tell('§cThe spawn haven\'t been set yet');
    player.runCommandAsync(`tp @s ${spawn.read('spawn')[0]} ${spawn.read('spawn')[1]} ${spawn.read('spawn')[2]}`);
    player.tell('§cYou have been teleported to the spawn')
});