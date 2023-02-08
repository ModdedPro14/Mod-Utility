import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "op",
    description: "Adds or Removes a op",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if (msg.startsWith(`${prefix}op add`)) {
                        if (args[1]) {
                        let add
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(8).toLowerCase()) add = plr
if (!add) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}op add`, "")}`)
if (add.hasTag(adminTag)) return player.tell(`§cPlayer ${add.name}§r§c is already opped`);
player.tell(`§cYou have opped the player ${add.name}`)
add.tell('§cYou have been opped');
add.addTag(adminTag);
                    } else if (!args[1]) return player.tell('§cYou must type a players name')
                } else if (msg.startsWith(`${prefix}op remove`)) {
                        if (args[1]) {
                        let remove
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(11).toLowerCase()) remove = plr
if (!remove) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}op remove`, "")}`)
if (!remove.hasTag(adminTag)) return player.tell(`§cPlayer ${remove.name}§r§c is already not opped`);
player.tell(`§cYou have unopped the player ${remove.name}`)
remove.tell('§cYou have been unopped');
remove.removeTag(adminTag);
                    } else if (!args[1]) return player.tell('§cYou must type a players name')
                } else {
                 player.tell('§cYou must select what you want to do add or remove a op')
}
});