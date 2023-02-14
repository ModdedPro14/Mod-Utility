import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "drunk",
    description: "Make a players screen go crazy",
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
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't drunk a staff member`)
    if (!Number.isInteger(Number(args[1]))) return player.tell('§cYou must define a number')
    if (amount > 255) return player.tell('§cYou cant go above 255')
    if (amount == 0){
        player.tell(`§cYou have undrunked ${foundPlayer.name}`)
        foundPlayer.runCommandAsync(`effect @s clear`)
        foundPlayer.tell(`${player.name}§r§c have undrunked you`)
    } else {
        player.tell(`§cYou have drunked ${foundPlayer.name}`)
        foundPlayer.runCommandAsync(`effect @s nausea 9999999 ${amount}`)
        foundPlayer.tell(`${player.name}§r§c have drunked you`)
    }
                          } else if (!args[0]) return player.tell('§cYou must type a players name')
});