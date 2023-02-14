import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "smite",
    description: "Summons a lightning bolt on the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type a players name')
    const [smite] = world.getPlayers({ name: args[0] })
if (!smite) return player.tell(`§cCan't find the player: ${args[0]}`)
if (smite == player) return player.tell('§cYou can\'t smite your self')
player.tell(`§cYou have smited the player: ${smite.name}`)
smite.tell(`§cYou have been smited by: ${player.name}`)
smite.runCommandAsync(`summon lightning_bolt`)
});