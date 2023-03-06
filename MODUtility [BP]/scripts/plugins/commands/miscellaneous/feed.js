import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "feed",
    description: "Regain your hunger or the players name hunger",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0]) {
    const feed = server.commands.addUserOption(player, args[0])
    if (!feed) return;
    feed.runCommandAsync('effect @s saturation 2 255 true')
    feed.tell(`§cYou have been feeded by §r${player.name}`)
} else {
    player.runCommandAsync('effect @s saturation 2 255 true')
    player.tell('§cYou have been feeded')
}
});