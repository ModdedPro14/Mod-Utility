import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "heal",
    description: "Regain your health or the players name health",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0]) {
    const heal = server.commands.addUserOption(player, args[0])
    if (!heal) return;
    heal.runCommandAsync('effect @s instant_health 2 255 true')
    heal.tell(`§cYou have been healed by §r${player.name}`)
} else {
    player.runCommandAsync('effect @s instant_health 2 255 true')
    player.tell('§cYou have been healed')
}
});