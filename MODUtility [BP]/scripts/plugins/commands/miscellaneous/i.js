import { ItemTypes } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "i",
    description: "Works just like the give command",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    let amount = 1
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type an item name')
    if (typeof ItemTypes.get(args[0]) == "undefined") return player.tell(`§c${args[0]}§r§c is not a valid minecraft item`)
    if (args[1] && !Number.isInteger(Number(args[1]))) return player.tell('§cYou must define a number')
    if (args[1] > 32767) return player.tell('§cYou can\'t go over the number 32767')
    if (Number.isInteger(Number(args[1]))) amount = Number(args[1])
    if (args[2]) {
        const foundPlayer = server.commands.addUserOption(player, args[2])
        if (!foundPlayer) return;
        player.tell(`§cYou have given §r${foundPlayer.name}§r§c ${args[0]}§r§e x§r§c${amount}`)
        foundPlayer.runCommandAsync(`give @s ${args[0]} ${amount}`)
        foundPlayer.tell(`§cYou have been given ${args[0]}§r §ex§c${amount}`)
    } else if (!args[2]) {
        player.runCommandAsync(`give @s ${args[0]} ${amount}`)
        player.tell(`§cYou have been given ${args[0]}§r §ex§c${amount}`)
    }
});