import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "gms",
    description: "Changes your gamemode to survival",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    data.player.runCommandAsync("gamemode s @s")
    data.player.tell('§cYour gamemode have been set to §6Survival')
});