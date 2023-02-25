import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "freeze",
    description: "Freezes the players name that you selected",
    aliases: [],
    category: 'Freeze',
    syntax: '§2<Player> ',
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const freeze = server.commands.addUserOption(player, args[0])
    if (!freeze) return;
    if (freeze == player) return player.tell('§cYou can\'t freeze yourself')
    if (freeze.hasTag(adminTag)) return player.tell('§cYou can\'t freeze a staff member')
    if (freeze.hasTag('freeze')) return player.tell(`§cPlayer: §r${freeze.name}§r§c is already freezed`) 
    freeze.addTag('freeze')
    freeze.tell(`§cYou have been freezed by:§r ${player.name}`)
    player.tell(`§cPlayer: §r${freeze.name}§r§c has been freezed`)    
});