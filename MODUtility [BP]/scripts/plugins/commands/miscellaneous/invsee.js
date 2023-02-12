import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "invsee",
    description: "See a players inventory",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if(args.length === 0) return player.tell('§cYou need to type a players name');
    const [member] = world.getPlayers({ name: args[0] })
    if(member) return player.tell(`§cCant find the player: ${args[0]}`);
    const container = member.getComponent('inventory').container;
    player.tell(`${member.name}'s§r§c inventory:`);
    for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if(typeof item === "undefined") continue;

        player.tell(`§6Slot ${i}: §2${item.typeId}:§a${item.data} §ex${item.amount}`);
    }
});