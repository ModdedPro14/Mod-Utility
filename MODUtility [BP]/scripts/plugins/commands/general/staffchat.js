import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "staffchat",
    description: "Enter the staff chat",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const player = data.player
    if (player.hasTag('staffChat')) {
        player.removeTag('staffChat')
        player.tell('§cYou have left the staff chat')
    } else {
        player.addTag('staffChat')
        player.tell('§cYou have joined the staff chat')
    }
});