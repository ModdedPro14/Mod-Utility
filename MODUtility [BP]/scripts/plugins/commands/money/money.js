import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "money",
    description: "set/add/remove/reset a players money",
    aliases: [],
    permission: (player) => player.hasTag(adminTag),
}, (data, args) => {
   const player = data.player
   if (args[0] == 'set') {
    let amount;
    const foundPlayer = server.commands.addUserOption(player, args[1])
    if (!foundPlayer) return;
    if (!args[2]) return player.tell('§cYou must type the amount of money to set to the player')
    if (!Number.isInteger(Number(args[2]))) return player.tell('§cThe amount of money must be a number')
    amount = args[2]
    if (amount > 2111111111) return player.tell('§cYou cant go over the number 2111111111')
    server.scoreboard.set(foundPlayer, 'money', amount)
    player.tell(`§cYou have set the player ${foundPlayer.name}'s money to ${amount}`)
    foundPlayer.tell(`§cYour money have been set to ${amount} by ${player.name}`)
   } else if (args[0] == 'add') {
    let amount;
    const foundPlayer = server.commands.addUserOption(player, args[1])
    if (!foundPlayer) return;
    if (!args[2]) return player.tell('§cYou must type the amount of money to add to the player')
    if (!Number.isInteger(Number(args[2]))) return player.tell('§cThe amount of money must be a number')
    amount = args[2]
    if (amount > 2111111111) return player.tell('§cYou cant go over the number 2111111111')
    server.scoreboard.add(foundPlayer, 'money', amount)
    player.tell(`§cYou have added ${amount} to the player ${foundPlayer.name}'s money`)
    foundPlayer.tell(`§c${player.name} §r§chas added to your money ${amount}`)
   } else if (args[0] == 'remove') {
    let amount;
    const foundPlayer = server.commands.addUserOption(player, args[1])
    if (!foundPlayer) return;
    if (!args[2]) return player.tell('§cYou must type the amount of money to remove from the player')
    if (!Number.isInteger(Number(args[2]))) return player.tell('§cThe amount of money must be a number')
    amount = args[2]
    if (amount > 2111111111) return player.tell('§cYou cant go over the number 2111111111')
    foundPlayer.runCommandAsync(`scoreboard players remove @s money ${amount}`)
    player.tell(`§cYou have removed ${amount} money from the player ${foundPlayer.name}'s money`)
    foundPlayer.tell(`§c${player.name} §r§chas removed ${amount} from your money`)
   } else if (args[0] == 'reset') {
    const foundPlayer = server.commands.addUserOption(player, args[1])
    if (!foundPlayer) return;
    serve.scoreboard.reset(foundPlayer, 'money')
    player.tell(`§cYou have reset ${foundPlayer.name}'s money`)
    foundPlayer.tell(`§c${player.name} §r§chas reset your money`)
   } else {
    player.tell('§cYou must choose between set/add/reset/remove')
   }
});