import { world, system } from "@minecraft/server"
import { adminTag } from "../../config/main.js"
import { trustTag } from "../../config/main.js"

const items = [
    "minecraft:chest",
    "minecraft:trapped_chest",
    "minecraft:shulker_box",
    "minecraft:undyed_shulker_box",
    "minecraft:barrel"
]

function hasLore(item) {
    return Boolean(item?.getLore().length)
}

system.runSchedule(() => {
    for(const player of world.getPlayers()) {
        if (player.hasTag(adminTag) || player.hasTag(trustTag)) return;
        const inv = player.getComponent("inventory").container;
        for(let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i)
            if (items.includes(item?.typeId) && hasLore(item)) {
                player.runCommandAsync(`clear @s ${item?.typeId}`)
                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§7§l[§cMOD ANTICHEAT§7] §r${player.name} §aYou cant have a lored ${item?.typeId.replace('minecraft:').replace(/_/g, ' ').replace('undefined', '')}"}]}`)
                player.runCommandAsync('playsound random.orb @a')
                player.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§7§l[§cMOD ANTICHEAT§7] §r${player.name} §aTried to have a lored ${item?.typeId.replace('minecraft:').replace(/_/g, ' ').replace('undefined', '')}"}]}`)
            }
        }
    }
}, 3) 