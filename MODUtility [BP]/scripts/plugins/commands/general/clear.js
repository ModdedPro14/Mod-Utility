import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "clear",
    description: "Clears the chat",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
        const plr = data.player
        for (const player of world.getPlayers()) {
            let space = '  ';
            for (let i = 0; i < 110; i++)
            player.tell(space.repeat(110))
            player.tell(`§cChat has been cleared by ${plr.name}`)
        }
});