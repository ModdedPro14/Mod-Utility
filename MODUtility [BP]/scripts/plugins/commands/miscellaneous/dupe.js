import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "dupe",
    description: "Duplicates the item your holding",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const inventory = data.player.getComponent('inventory').container;
                      const item = inventory.getItem(data.player.selectedSlot)
                      inventory.addItem(item)
});