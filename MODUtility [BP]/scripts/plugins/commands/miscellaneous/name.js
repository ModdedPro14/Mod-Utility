import server from "../../../management/api/server.js";
import { adminTag, setNameTag } from "../../../config/main.js";

server.commands.register({
    name: "name",
    description: "Sets the name of the item your holding",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type a name to put on the item');
    setNameTag(player, args.slice(0).join(` `).replaceAll('\\n','\n'));
});