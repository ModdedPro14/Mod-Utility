import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "warn",
    description: "Warns the players name that you selected",
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
    if (foundPlayer == player) return player.tell("§cYou can't warn yourself")
    if (foundPlayer.hasTag(adminTag)) return player.tell(`§cYou can't warn a staff member`)
    player.tell(`§cYou have warned:\n§cPlayer: §r${foundPlayer.name}\n§r§cReason: ${reason}`);
    foundPlayer.tell(`§cYou have been warned:\n§cBy: §r${player.name}\n§r§cReason: ${reason}`);
} else if (!args[0]) return player.tell('§cYou must type a players name')
});