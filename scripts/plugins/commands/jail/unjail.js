import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, spawn } from "../../../config/main.js";

Command.register({
    name: "unjail",
    description: "Unjailes the players name that you selected if jailed",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type a players name')
    const [plj1] = world.getPlayers({ name: args[0] })
if (!plj1) return player.tell(`§cCan't find the player:${args[0]}`)
if (!spawn.has('spawn')) return player.tell(`§cSet a spawn First to unjail${plj1.name}`)

if (plj1.hasTag('jailed')) {
plj1.runCommandAsync(`tp @s ${spawn.read('spawn')[0]} ${spawn.read('spawn')[1]} ${spawn.read('spawn')[2]}`);
plj1.runCommandAsync(`spawnpoint @s ${spawn.read('spawn')[0]} ${spawn.read('spawn')[1]} ${spawn.read('spawn')[2]}`);
plj1.tell('§cYou have been unjailed')
plj1.runCommandAsync('tag @s remove jailed')
} else {
    player.tell(`§cPlayer:${plj1.name} isn't jailed`)
} 
});