import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "slap",
    description: "Damages the player that you selected with the amount",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    let amount = 0;
    if (Number.isInteger(Number(args[1]))) amount = Number(args[1])
    const foundPlayer = server.commands.addUserOption(player, args[0])
    if (!foundPlayer) return;
    if (foundPlayer == player) return player.tell("§cYou can't slap yourself")
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't slap a staff member`)
    if (!Number.isInteger(Number(args[1]))) return player.tell('§cYou must define a number')
    player.tell(`§cYou have slaped player: §r${foundPlayer.name}`);
    foundPlayer.tell(`§cYou have been slaped by: §r${player.name}`);
    foundPlayer.applyDamage(amount)
});