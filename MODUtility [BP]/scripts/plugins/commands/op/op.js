import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "op",
    description: "Adds or Removes a op",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0] == 'add') {
        const add = server.commands.addUserOption(player, args[1])
        if (!add) return;
        if (add.hasTag(adminTag)) return player.tell(`§cPlayer ${add.name}§r§c is already opped`);
        player.tell(`§cYou have opped the player ${add.name}`)
        add.tell('§cYou have been opped');
        add.addTag(adminTag);
    } else if (args[0] == 'remove') {
        const remove = server.commands.addUserOption(player, args[1])
        if (!remove) return;
        if (!remove.hasTag(adminTag)) return player.tell(`§cPlayer ${remove.name}§r§c is already not opped`);
        player.tell(`§cYou have unopped the player ${remove.name}`)
        remove.tell('§cYou have been unopped');
        remove.removeTag(adminTag);
        } else {
            player.tell('§cYou must select what you want to do add or remove a op')
        }
});