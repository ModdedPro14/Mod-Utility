import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "broadcast",
    description: "broadcast a message to the whole server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const message = args.join(' ')
    if (!message) return data.player.tell('§cYou must type a message to broadcast')
    server.utils.broadcast(message)
});