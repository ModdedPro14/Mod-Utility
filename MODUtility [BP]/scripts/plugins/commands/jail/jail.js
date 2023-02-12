import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag, jail } from "../../../config/main.js";

Command.register({
    name: "jail",
    description: "Jails the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type a players name')
    const [plj] = world.getPlayers({ name: args[0] })
if (!plj) return player.tell(`§cCan't find the player:${args[0]}`)
if (plj == player) return player.tell('§cYou can\'t jail yourself')
if (plj.hasTag(adminTag)) return player.tell('§cYou can\'t jail a staff member')
if (!jail.has('jail')) return player.tell('§cThe jail haven\'t been set yet')
if (!plj.hasTag('jailed')) {
plj.runCommandAsync(`tp @s ${jail.read('jail')[0]} ${jail.read('jail')[1]} ${jail.read('jail')[2]}`);
plj.runCommandAsync(`spawnpoint @s ${jail.read('jail')[0]} ${jail.read('jail')[1]} ${jail.read('jail')[2]}`);
player.tell(`§cYou have jailed the player ${plj.name}`)
plj.tell('§cYou have been jailed')
plj.runCommandAsync('gamemode a @s')
plj.runCommandAsync('tag @s add jailed')
plj.runCommandAsync('clear @s ender_pearl')
plj.runCommandAsync('clear @s chorus_fruit')
} else {
    player.tell(`§cPlayer:${plj.name} is already jailed`)
}
});