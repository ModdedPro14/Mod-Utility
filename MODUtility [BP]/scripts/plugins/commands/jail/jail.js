import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "jail",
    description: "Jails the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const plj = server.commands.addUserOption(player, args[0])
    if (!plj) return;
    if (plj == player) return player.tell('§cYou can\'t jail yourself')
    if (plj.hasTag(adminTag)) return player.tell('§cYou can\'t jail a staff member')
    if (!server.jail.has('jail')) return player.tell('§cThe jail haven\'t been set yet')
    if (plj.hasTag('jailed')) return player.tell(`§cPlayer:${plj.name} is already jailed`)
    plj.runCommandAsync(`tp @s ${server.jail.read('jail')[0]} ${server.jail.read('jail')[1]} ${server.jail.read('jail')[2]}`);
    plj.runCommandAsync(`spawnpoint @s ${server.jail.read('jail')[0]} ${server.jail.read('jail')[1]} ${server.jail.read('jail')[2]}`);
    player.tell(`§cYou have jailed the player ${plj.name}`)
    plj.tell('§cYou have been jailed')
    plj.runCommandAsync('gamemode a @s')
    plj.runCommandAsync('tag @s add jailed')
    plj.runCommandAsync('clear @s ender_pearl')
    plj.runCommandAsync('clear @s chorus_fruit')
});