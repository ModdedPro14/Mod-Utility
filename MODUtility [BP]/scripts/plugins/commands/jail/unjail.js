import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag, spawn } from "../../../config/main.js";

Command.register({
    name: "unjail",
    description: "Unjailes the players name that you selected if jailed",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if (msg.startsWith(`${prefix}unjail `)) {
                          let plj1
for (let p1 of world.getPlayers()) if (p1.name.toLowerCase() == msg.substring(8).toLowerCase()) plj1 = p1
if (!plj1) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}unjail`, "")}`)
if (!spawn.has('spawn')) return player.tell(`§cSet a spawn First to unjail${msg.replace(`${prefix}unjail`, "")}`)

if (plj1.hasTag('jailed')) {
plj1.runCommandAsync(`tp @s ${spawn.read('spawn')[0]} ${spawn.read('spawn')[1]} ${spawn.read('spawn')[2]}`);
plj1.runCommandAsync(`spawnpoint @s ${spawn.read('spawn')[0]} ${spawn.read('spawn')[1]} ${spawn.read('spawn')[2]}`);
plj1.tell('§cYou have been unjailed')
plj1.runCommandAsync('tag @s remove jailed')
} else {
    player.tell(`§cPlayer:${msg.replace(`${prefix}unjail`, "")} isn't jailed`)
} 
} else if (!args[1]) return player.tell('§cYou must type a players name')
});