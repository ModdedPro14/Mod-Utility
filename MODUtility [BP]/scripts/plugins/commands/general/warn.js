import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "warn",
    description: "Warns the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const foundPlayer = server.commands.addUserOption(player, args[0])
    if (!foundPlayer) return;
    const reason = server.commands.addReasonOption(player, args.slice(1).join(` `))
    if (!reason) return;
    if (foundPlayer == player) return player.tell("§cYou can't warn yourself")
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't warn a staff member`)
    player.tell(`§cYou have warned:\n§cPlayer: §r${foundPlayer.name}\n§r§cReason: ${reason}`);
    foundPlayer.tell(`§cYou have been warned:\n§cBy: §r${player.name}\n§r§cReason: ${reason}`);
});