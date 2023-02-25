import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "smite",
    description: "Summons a lightning bolt on the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const smite = server.commands.addUserOption(player, args[0])
    if (!smite) return;
    if (smite == player) return player.tell('§cYou can\'t smite your self')
    player.tell(`§cYou have smited the player: ${smite.name}`)
    smite.tell(`§cYou have been smited by: ${player.name}`)
    smite.runCommandAsync(`summon lightning_bolt`)
});