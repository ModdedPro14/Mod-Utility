import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "smite",
    description: "Summons a lightning bolt on the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if (msg.startsWith(`${prefix}smite `)) {
                          let smite
for (let plr of world.getPlayers()) if (plr.name.toLowerCase() == msg.substring(7).toLowerCase()) smite = plr
if (!smite) return player.tell(`§cCan't find the player:${msg.replace(`${prefix}smite`, "")}`)
if (smite == player) return player.tell('§cYou can\'t smite your self')
player.tell(`§cYou have smited the player: ${smite.name}`)
smite.tell(`§cYou have been smited by: ${player.name}`)
smite.runCommandAsync(`summon lightning_bolt`)
} else if (!args[1]) return player.tell('§cYou must type a players name')
});