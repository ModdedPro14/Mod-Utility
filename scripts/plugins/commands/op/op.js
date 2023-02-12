import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "op",
    description: "Adds or Removes a op",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0] == 'add') {
        if (!args[1]) return player.tell('§cYou must type a players name')
        const [add] = world.getPlayers({ name: args[1] })
        if (!add) return player.tell(`§cCan't find the player: ${args[1]}`)
        if (add.hasTag(adminTag)) return player.tell(`§cPlayer ${add.name}§r§c is already opped`);
        player.tell(`§cYou have opped the player ${add.name}`)
        add.tell('§cYou have been opped');
        add.addTag(adminTag);
    } else if (args[0] == 'remove') {
        if (!args[1]) return player.tell('§cYou must type a players name')
        const [remove] = world.getPlayers({ name: args[1] })
        if (!remove) return player.tell(`§cCan't find the player: ${remove}`)
        if (!remove.hasTag(adminTag)) return player.tell(`§cPlayer ${remove.name}§r§c is already not opped`);
        player.tell(`§cYou have unopped the player ${remove.name}`)
        remove.tell('§cYou have been unopped');
        remove.removeTag(adminTag);
        } else {
            player.tell('§cYou must select what you want to do add or remove a op')
        }
});