import server from "../../../management/api/server.js";
import { adminTag, setLore } from "../../../config/main.js";

server.commands.register({
    name: "lore",
    description: "Sets the description of the item your holding",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type a description to put on the item');
    setLore(player, [args.slice(0).join(` `).replaceAll('\\n','\n')]);
});