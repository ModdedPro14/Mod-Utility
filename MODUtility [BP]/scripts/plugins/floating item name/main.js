import { world } from "@minecraft/server";

function getEntitysItemName(entity) {
    const item  = entity.getComponent("item").itemStack
    return item.nameTag ?? item.typeId.replace('minecraft:', '').replace(/_/g, " ");
}

world.events.entitySpawn.subscribe(({ entity }) => {
  if (entity.typeId != "minecraft:item") return;
  const ItemStack = entity.getComponent("item").itemStack;
  entity.nameTag = `§e${ItemStack.amount}x§r ${getEntitysItemName(entity)}`;
});