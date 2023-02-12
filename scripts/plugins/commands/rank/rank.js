import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "rank",
    description: "Adds or Removes a rank",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    const remove = "remove"
    if (msg.startsWith(`${prefix}rank add`)) {
                      let rank = "";
                      if (args[2]) {
                          rank = args.slice(2).join(` `)
                      }
                      if (args[1]) {
                          const [foundPlayer] = world.getPlayers({ name: args[1] });
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    if (!args[2]) return player.tell('§cYou must provide a rank')
    if (foundPlayer.hasTag(`rank:${rank}`)) return player.tell(`§cPlayer: ${args[1]}§r§c already has that rank`)
    player.tell(`§cYou have added the rank ${rank}§r§c to ${foundPlayer.name}`);
    foundPlayer.tell(`§cPlayer ${player.name}§r§c added to you the rank ${rank}`);
    foundPlayer.addTag(`rank:${rank}`)
} else if (!args[1]) return player.tell('§cYou must provide a players name')
} else if (args[0] == remove) {
                      let rank = "";
                      if (args[2]) {
                          rank = args.slice(2).join(` `)
                      }
                      if (args[1]) {
                          const [foundPlayer] = world.getPlayers({ name: args[1] });
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    if (!foundPlayer.hasTag(`rank:${rank}`)) return player.tell('§cYou must provide a rank that the player has')
    if (foundPlayer.hasTag(`rank:${rank}`)) {
    player.tell(`§cYou have removed the rank ${rank}§r§c from ${foundPlayer.name}`);
    foundPlayer.tell(`§cPlayer ${player.name}§r§c removed from you the rank ${rank}`);
    foundPlayer.removeTag(`rank:${rank}`)
    }
} else if (!args[1]) return player.tell('§cYou must provide a players name')
} else if (msg.startsWith(`${prefix}rank removeAll`)) {
    if (!args[1]) return player.tell('§cYou must provide a players name')
    const [foundPlayer] = world.getPlayers({ name: args[1] });
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    const rank = foundPlayer.getTags()?.filter(tag => tag.startsWith('rank:'));
    if (rank.length == 0) return player.tell(`§cPlayer ${foundPlayer.name}§r§c dosent have any ranks to remove`)
    for (const ranks of rank) {
        if (!ranks) continue;
        foundPlayer.removeTag(ranks)
    }
    player.tell(`§cRemoved all the ranks from the player ${foundPlayer.name}`)
    foundPlayer.tell(`§c${player.name} §r§cremoved from you all of the ranks`)
    } else {
                 player.tell('§cYou must select what you want to do add or remove a rank')
}
});