import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "speed",
    description: "Gives you a speed of the amount you put",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    let amount = 0;
                      if (Number.isInteger(Number(args[0]))){
                              amount = Number(args[0])
}
if (!args[0]) return player.tell('§cYou must define an amount')
                      else if (args[0]) {
    if (!Number.isInteger(Number(args[0]))) return player.tell('§cYou must define a number')
    if (amount > 255) return player.tell('§cYou can\'t go above 255')
    if (amount == 0) return player.runCommandAsync('effect @s clear')
    player.runCommandAsync(`effect @s speed 99999999 ${amount}`)
                      }
});