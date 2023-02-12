import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "jaillist",
    description: "Gives you a list of jailed players",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    let theText = "§cJailed Players:\n";
                      for(const player of world.getPlayers({tags:["jailed"]})){
                              theText += `${player.name}\n`;
}

data.player.tell(theText);
});