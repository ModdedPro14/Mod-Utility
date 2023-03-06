import { world, system } from "@minecraft/server";
import { adminTag } from "../../config/main.js"

system.runSchedule(() => {
    world.getAllPlayers().forEach((player) => {
        if (player.hasTag(adminTag)) return;
        const { container } = player.getComponent("inventory");
        if (container.size === container.emptySlotsCount) return;
        for (let i = 0; i < container.size; i++) {
            const item = container.getItem(i);
            if (!item) continue;
            
            const { enchantments } = item.getComponent("enchantments");
            const enchantmentIterator = enchantments[Symbol.iterator]();
            let set = false;
            
            for (let object = enchantmentIterator.next(); !object?.done; object = enchantmentIterator.next()) {
                const { value: enchant } = object;
                const { type: { id, maxLevel }, level } = enchant;
                if (level <= maxLevel) continue;
                enchantments.removeEnchantment(enchant.type);
                item.getComponent("enchantments").enchantments = enchantments;
                set = true;
            }
            if (!set) continue;
            container.setItem(i, item);
        }
    });
}, 3);