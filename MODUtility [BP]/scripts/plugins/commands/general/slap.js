import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "slap",
    description: "Damages the player that you selected with the amount",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    let amount = 0;
                      if (Number.isInteger(Number(args[1]))){
                              amount = Number(args[1])
}
                      if (args[0]) {
                          const [foundPlayer] = world.getPlayers({ name: args[0] });
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[0]}`);
    if (foundPlayer == player) return player.tell("§cYou can't slap yourself")
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't slap a staff member`)
    if (!Number.isInteger(Number(args[1]))) return player.tell('§cYou must define a number')
    player.tell(`§cYou have slaped player: §r${foundPlayer.name}`);
    foundPlayer.tell(`§cYou have been slaped by: §r${player.name}`);
    foundPlayer.runCommandAsync(`damage @s ${amount}`)
                          } else if (!args[0]) return player.tell('§cYou must type a players name')
});