import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "rank",
    description: "Adds or Removes a rank",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0] == 'add') {
        let rank = "";
        if (args[2]) rank = args.slice(2).join(` `)
        const foundPlayer = server.commands.addUserOption(player, args[1])
        if (!foundPlayer) return;
        if (!args[2]) return player.tell('§cYou must provide a rank')
        if (foundPlayer.hasTag(`rank:${rank}`)) return player.tell(`§cPlayer: ${args[1]}§r§c already has that rank`)
        player.tell(`§cYou have added the rank ${rank}§r§c to ${foundPlayer.name}`);
        foundPlayer.tell(`§cPlayer ${player.name}§r§c added to you the rank ${rank}`);
        foundPlayer.addTag(`rank:${rank}`)
    } else if (args[0] == 'remove') {
        let rank = "";
        if (args[2]) rank = args.slice(2).join(` `)
        const foundPlayer = server.commands.addUserOption(player, args[1])
        if (!foundPlayer) return;
        if (!foundPlayer.hasTag(`rank:${rank}`)) return player.tell('§cYou must provide a rank that the player has')
        if (foundPlayer.hasTag(`rank:${rank}`)) {
        player.tell(`§cYou have removed the rank ${rank}§r§c from ${foundPlayer.name}`);
        foundPlayer.tell(`§cPlayer ${player.name}§r§c removed from you the rank ${rank}`);
        foundPlayer.removeTag(`rank:${rank}`)
    }
} else if (args[0] == 'removeAll') {
    const foundPlayer = server.commands.addUserOption(player, args[1])
    if (!foundPlayer) return;
    const rank = foundPlayer.getTags()?.filter(tag => tag.startsWith('rank:'));
    if (!rank) return player.tell(`§cPlayer ${foundPlayer.name}§r§c dosent have any ranks to remove`)
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