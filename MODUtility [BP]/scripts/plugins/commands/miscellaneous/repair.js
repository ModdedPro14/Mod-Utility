import { Items, ItemStack } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "repair",
    description: "Repairs the item your holding",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const newItem = (item) => {
                          const newItem = new ItemStack(Items.get(item.typeId), item.amount, item.data);
    newItem.nameTag = item.nameTag;
    newItem.getComponents = item.getComponents;
    newItem.setLore(item.getLore());
    newItem.getComponent('enchantments').enchantments = item.getComponent('enchantments').enchantments;
    return newItem;
};
const inventory = data.player.getComponent('inventory').container;
        const item = inventory.getItem(data.player.selectedSlot), itemName = item.typeId.match(/:([\s\S]*)$/)[1].replace(/[\W]/g, ' ').replaceAll('_', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (!item) return
        inventory.setItem(data.player.selectedSlot, newItem(item));
});