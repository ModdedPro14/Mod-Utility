import { world } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "unjail",
    description: "Unjailes the players name that you selected if jailed",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const plj = server.commands.addUserOption(player, args[0])
    if (!plj) return;
    if (!server.spawn.has('spawn')) return player.tell(`§cSet a spawn First to unjail${plj.name}`)
    if (!plj.hasTag('jailed')) return player.tell(`§cPlayer:${plj1.name} isn't jailed`)
    plj.runCommandAsync(`tp @s ${server.spawn.read('spawn')[0]} ${server.spawn.read('spawn')[1]} ${server.spawn.read('spawn')[2]}`);
    plj.runCommandAsync(`spawnpoint @s ${server.spawn.read('spawn')[0]} ${server.spawn.read('spawn')[1]} ${server.spawn.read('spawn')[2]}`);
    plj.tell('§cYou have been unjailed')
    plj.runCommandAsync('tag @s remove jailed')
});