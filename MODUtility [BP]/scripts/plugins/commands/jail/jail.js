import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag, jail } from "../../../config/main.js";

Command.register({
    name: "jail",
    description: "Jails the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if (msg.startsWith(`${prefix}jail `)) {
                          let plj
for (let p of world.getPlayers()) if (p.name.toLowerCase() == msg.substring(6).toLowerCase()) plj = p
if (!plj) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}jail`, "")}`)
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
    player.tell(`§cPlayer:${msg.replace(`${prefix}jail`, "")} is already jailed`)
}
} else if (!args[1]) return player.tell('§cYou must type a players name')
});