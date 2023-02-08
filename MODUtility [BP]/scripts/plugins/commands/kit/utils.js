import { ItemStack, MinecraftEnchantmentTypes, Items, Enchantment, world } from "@minecraft/server";

export function getScore(player, objective) {
  try {
    return world.scoreboard.getObjective(objective).getScore(player.scoreboard);
  } 
  catch (error) {
    return 0;
  }
}
export const getItemData = (item) => {
    var _a;
    const itemData = {
        id: item.typeId,
        data: item.data,
        amount: item.amount,
        nameTag: item.nameTag,
        lore: item.getLore(),
        enchantments: [],
    };
    if (!item.hasComponent("enchantments"))
        return itemData;
    const enchants = (_a = item.getComponent('enchantments')) === null || _a === void 0 ? void 0 : _a.enchantments;
    if (enchants) {
        for (let k in MinecraftEnchantmentTypes) {
            const type = MinecraftEnchantmentTypes[k];
            if (!enchants.hasEnchantment(type))
                continue;
            const enchant = enchants.getEnchantment(type);
            itemData.enchantments.push({
                id: enchant.type.id,
                level: enchant.level,
            });
        }
    }
    return itemData;
};

export const newItem = (itemData) => {
    const item = new ItemStack(Items.get(itemData.id), itemData.amount, itemData.data);
    item.nameTag = itemData.nameTag;
    item.setLore(itemData.lore);
    const enchComp = item.getComponent("enchantments");
    const enchants = enchComp === null || enchComp === void 0 ? void 0 : enchComp.enchantments;
    if (enchants) {
        for (let enchant of itemData.enchantments) {
            const key = enchant.id
                .replace("minecraft:", "")
                .replace(/_(.)/g, (match) => match[1].toUpperCase());
            const type = MinecraftEnchantmentTypes[key];
            if (!type)
                continue;
            enchants.addEnchantment(new Enchantment(type, enchant.level));
        }
        enchComp.enchantments = enchants;
    }
    return item;
};