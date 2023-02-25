import { Items, ItemStack } from "@minecraft/server";
import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
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
    const item = inventory.getItem(data.player.selectedSlot)
    if (!item) return
    inventory.setItem(data.player.selectedSlot, newItem(item));
});