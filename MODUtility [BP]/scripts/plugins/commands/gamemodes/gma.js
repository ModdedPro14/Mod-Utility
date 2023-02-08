import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "gma",
    description: "Changes your gamemode to adventure",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    data.player.runCommandAsync("gamemode a @s")
    data.player.tell('§cYour gamemode have been set to §6Adventure')
});