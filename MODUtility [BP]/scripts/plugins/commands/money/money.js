import { world } from "@minecraft/server"
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "money",
    description: "set/add/remove/reset a players monet",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data, args) => {
   const player = data.player
   if (args[0] == 'set') {
    let amount;
    if (!args[1]) return player.tell('§cYou must type a players name')
    const [foundPlayer] = world.getPlayers({ name: args[1]})
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    if (!args[2]) return player.tell('§cYou must type the amount of money to set to the player')
    if (!Number.isInteger(Number(args[2]))) return player.tell('§cThe amount of money must be a number')
    amount = args[2]
    if (amount > 2111111111) return player.tell('§cYou cant go over the number 2111111111')
    foundPlayer.runCommandAsync(`scoreboard players set @s money ${amount}`)
    player.tell(`§cYou have set the player ${foundPlayer.name}'s money to ${amount}`)
    foundPlayer.tell(`§cYour money have been set to ${amount} by ${player.name}`)
   } else if (args[0] == 'add') {
    let amount;
    if (!args[1]) return player.tell('§cYou must type a players name')
    const [foundPlayer] = world.getPlayers({ name: args[1]})
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    if (!args[2]) return player.tell('§cYou must type the amount of money to add to the player')
    if (!Number.isInteger(Number(args[2]))) return player.tell('§cThe amount of money must be a number')
    amount = args[2]
    if (amount > 2111111111) return player.tell('§cYou cant go over the number 2111111111')
    foundPlayer.runCommandAsync(`scoreboard players add @s money ${amount}`)
    player.tell(`§cYou have added ${amount} to the player ${foundPlayer.name}'s money`)
    foundPlayer.tell(`§c${player.name} §r§chas added to your money ${amount}`)
   } else if (args[0] == 'remove') {
    let amount;
    if (!args[1]) return player.tell('§cYou must type a players name')
    const [foundPlayer] = world.getPlayers({ name: args[1]})
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    if (!args[2]) return player.tell('§cYou must type the amount of money to remove from the player')
    if (!Number.isInteger(Number(args[2]))) return player.tell('§cThe amount of money must be a number')
    amount = args[2]
    if (amount > 2111111111) return player.tell('§cYou cant go over the number 2111111111')
    foundPlayer.runCommandAsync(`scoreboard players remove @s money ${amount}`)
    player.tell(`§cYou have removed ${amount} money from the player ${foundPlayer.name}'s money`)
    foundPlayer.tell(`§c${player.name} §r§chas removed ${amount} from your money`)
   } else if (args[0] == 'reset') {
    if (!args[1]) return player.tell('§cYou must type a players name')
    const [foundPlayer] = world.getPlayers({ name: args[1]})
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
    foundPlayer.runCommandAsync(`scoreboard players reset @s money`)
    player.tell(`§cYou have reset ${foundPlayer.name}'s money`)
    foundPlayer.tell(`§c${player.name} §r§chas reset your money`)
   } else {
    player.tell('§cYou must choose between set/add/reset/remove')
   }
});