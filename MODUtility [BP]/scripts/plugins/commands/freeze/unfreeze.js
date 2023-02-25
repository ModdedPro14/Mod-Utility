import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "unfreeze",
    description: "Unfreeze the players name that you selected if is freezed",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const unfreeze = server.commands.addUserOption(player, args[0])
    if (!unfreeze) return;
    if (!unfreeze.hasTag('freeze')) return player.tell(`§cPlayer: §r${unfreeze.name}§r§c is not freezed`)
    unfreeze.removeTag('freeze')
    unfreeze.tell(`§cYou have been unfreezed by: §r${player.name}`)
    player.tell(`§cPlayer: §r${unfreeze.name}§r§c has been unfreezed`)
});