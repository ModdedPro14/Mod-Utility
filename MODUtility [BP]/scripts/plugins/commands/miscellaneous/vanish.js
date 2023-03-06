import server from "../../../management/api/server";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "vanish",
    description: "Makes you invisible to others",
    aliases: ['v'],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    if (!player.hasTag("vanish")) {
        player.runCommandAsync(`effect @s invisibility 9999999 255 true`)
        player.tell('§aYou are now in vanish mode')
        player.addTag('vanish')
    } else if (player.hasTag("vanish")) {
        player.runCommandAsync('effect @s clear')
        player.tell('§aYou are no longer in vanish mode')
        player.removeTag('vanish')
    }
});