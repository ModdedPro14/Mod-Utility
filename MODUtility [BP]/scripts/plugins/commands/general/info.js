import server from "../../../management/api/server.js";
import main, { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "info",
    description: "Get information about Mod-Utility",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    data.player.tell(`§l§6-----<[Information]>-----\n§8Version:§a ${main.version}\n§8Discord:§a ${main.discord} - MP09#1650\n§8Youtube: §a${main.youtube} - MP09\n§8Prefix: §a${main.prefix}\n§8Omlet: §a${main.omlet}\n§6-----------------------`)
});