import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "mute",
    description: "Mutes the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const foundPlayer = server.commands.addUserOption(player, args[0])
    if (!foundPlayer) return;
    const reason = server.commands.addReasonOption(player, args.slice(1).join(` `))
    if (!reason) return;
    if (foundPlayer == player) return player.tell("§cYou can't mute yourself")
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't mute a staff member`)
    if (foundPlayer.hasTag('mute')) return player.tell(`§cPlayer: ${args[0]}§r§c is already muted`)
    player.tell(`§cYou have muted:\n§cPlayer: §r${foundPlayer.name}\n§r§cReason: ${reason}`);
    foundPlayer.tell(`§cYou have been muted:\n§cBy: §r${player.name}\n§r§cReason: ${reason}`);
    foundPlayer.addTag('mute')
});