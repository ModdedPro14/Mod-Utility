import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "unmute",
    description: "Unmutes players name that you selected if muted",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const foundPlayer = server.commands.addUserOption(player, args[0])
    if (!foundPlayer) return;
    if (!foundPlayer.hasTag('mute')) return player.tell(`§cPlayer: ${foundPlayer.name}§r§c is not muted`)
    player.tell(`§cYou have unmuted:\n§cPlayer: §r${foundPlayer.name}`);
    foundPlayer.tell(`§cYou have been unmuted:\n§cBy: §r${player.name}`);
    foundPlayer.removeTag('mute')
});