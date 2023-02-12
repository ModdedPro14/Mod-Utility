import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "mute",
    description: "Mutes the players name that you selected",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    let reason = "";
                      if (!args[1]) {
                          reason = "§cNo reason provided"
                      }
                      if (args[0]) {
                          if (args[1]) {
                              reason = args.slice(1).join(` `)
                          }
                          const [foundPlayer] = world.getPlayers({ name: args[0] });
    if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[0]}`);
    if (foundPlayer == player) return player.tell("§cYou can't mute yourself")
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't mute a staff member`)
    if (foundPlayer.hasTag('mute')) return player.tell(`§cPlayer: ${args[0]}§r§c is already muted`)
    player.tell(`§cYou have muted:\n§cPlayer: §r${foundPlayer.name}\n§r§cReason: ${reason}`);
    foundPlayer.tell(`§cYou have been muted:\n§cBy: §r${player.name}\n§r§cReason: ${reason}`);
    foundPlayer.addTag('mute')
} else if (!args[0]) return player.tell('§cYou must type a players name')
});