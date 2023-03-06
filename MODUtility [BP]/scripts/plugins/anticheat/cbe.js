import {
    world,
} from "@minecraft/server";
import { adminTag } from "../../config/main.js"
import { trustTag } from "../../config/main.js"

const all = [
    "minecraft:beehive",
    "minecraft:bee_nest",
    "minecraft:moving_block",
    "minecraft:movingBlock",
    "minecraft:movingblock",
    "minecraft:tallgrass",
    "minecraft:beenest",
    "minecraft:tnt",
    "minecraft:end_crystal",
    "minecraft:respawn_anchor",
    "minecraft:lava",
    "minecraft:flowing_lava",
    "minecraft:command_block",
    "minecraft:barrier",
    "minecraft:allow",
    "minecraft:structure_block",
    "minecraft:structure_void",
    "minecraft:deny",
    "minecraft:repeating_command_block",
    "minecraft:chain_command_block",
    "minecraft:command_block_minecart",
    "minecraft:border",
    "minecraft:border_block",
    "minecraft:lava_bucket",
    "minecraft:tnt_minecart",
    "minecraft:fire_charge"
]
const trusted = [
    "minecraft:shulker_box",
    "minecraft:undyed_shulker_box",
    "minecraft:dispenser",
    "minecraft:flint_and_steel",
    "minecraft:bedrock",
]

world.events.beforeItemUseOn.subscribe(data => {
    if (!data.source.hasTag(adminTag)) {
        if (all.includes(data.item.typeId)) {
            data.cancel = true
            data.source.runCommandAsync(`clear @s ${data.item.typeId}`)
            data.source.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§7§l[§cMOD ANTICHEAT§7] §r${data.source.name} §aYou cant place that block"}]}`)
            data.source.runCommandAsync('playsound random.orb @a')
            data.source.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§7§l[§cMOD ANTICHEAT§7] §r${data.source.name} §aTried to place a ${data.item.typeId.replace('minecraft:').replace(/_/g, ' ').replace('undefined', '')}"}]}`)
        }
    }
    if (!data.source.hasTag(adminTag) && !data.source.hasTag(trustTag)) {
        if (trusted.includes(data.item.typeId)) {
            data.cancel = true
            data.source.runCommandAsync(`clear @s ${data.item.typeId}`)
            data.source.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§7§l[§cMOD ANTICHEAT§7] §r${data.source.name} §aYou cant place that block"}]}`)
            data.source.runCommandAsync('playsound random.orb @a')
            data.source.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§7§l[§cMOD ANTICHEAT§7] §r${data.source.name} §aTried to place a ${data.item.typeId.replace('minecraft:').replace(/_/g, ' ').replace('undefined', '')}"}]}`)
        }
    }
});