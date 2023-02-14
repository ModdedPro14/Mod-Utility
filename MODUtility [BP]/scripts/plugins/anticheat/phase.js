import { world, system, BlockLocation } from "@minecraft/server"
import { adminTag } from "../../config/main.js";

const ValidBlockTags = [
    "snow",
    "lush_plants_replaceable",
    "azalea_log_replaceable",
    "minecraft:crop",
    "fertilize_area",
    "plant",
  ];

function PlayerLocation(location) {
    return new BlockLocation(
        Math.floor(location.x),
        Math.floor(location.y),
        Math.floor(location.z)
    )
}
function phase(player) {
    if (player.hasTag(adminTag)) return;
    const blockInside = player.dimension.getBlock( PlayerLocation(player.location) )
    if (blockInside.getTags().some((tag) => ValidBlockTags.includes(tag))) return;
    if (blockInside.type.id.endsWith("water")) return;
    if (blockInside.type.id.endsWith("lava")) return;
    if (blockInside.type.id.endsWith("portal")) return;
    if (blockInside.type.id.endsWith("gateway")) return;
    if (blockInside.type.id.endsWith("grass")) return;    
    if (blockInside.type.id.endsWith("iron_bars")) return;
    if (blockInside.type.id.endsWith("scaffolding")) return;
    if (blockInside.type.id.endsWith("ladder")) return;
    if (blockInside.type.id.endsWith("powder_snow")) return;
    if (blockInside.type.id.endsWith("stairs")) return;
    if (blockInside.type.id.endsWith("slab")) return;
    if (blockInside.type.id.endsWith("slab4")) return;
    if (blockInside.type.id.endsWith("slab3")) return;
    if (blockInside.type.id.endsWith("slab2")) return;
    if (blockInside.type.id.endsWith("door")) return;
    if (blockInside.type.id.endsWith("button")) return;
    if (blockInside.type.id.endsWith("lever")) return;
    if (blockInside.type.id.endsWith("fire")) return;
    if (blockInside.type.id.endsWith("trip_wire")) return;
    if (blockInside.type.id.endsWith("tripwire_hook")) return;
    if (blockInside.type.id.endsWith("trapdoor")) return;
    if (blockInside.type.id.endsWith("cauldron")) return;
    if (blockInside.type.id.endsWith("composter")) return;
    if (blockInside.type.id.endsWith("gate")) return;
    if (blockInside.type.id.endsWith("plate")) return;
    if (blockInside.type.id.endsWith("fence")) return;
    if (blockInside.type.id.endsWith("carpet")) return;
    if (blockInside.type.id.endsWith("collision")) return;
    if (blockInside.type.id.endsWith("bud")) return;
    if (blockInside.type.id.endsWith("cluster")) return;
    if (blockInside.type.id.endsWith("shrieker")) return;
    if (blockInside.type.id.endsWith("sensor")) return;
    if (blockInside.type.id.endsWith("web")) return;
    if (blockInside.type.id.endsWith("spawn")) return;
    if (blockInside.type.id.endsWith("vein")) return;
    if (blockInside.type.id.endsWith("dripleaf")) return;
    if (blockInside.type.id.endsWith("coral")) return;
    if (blockInside.type.id.endsWith("seeds")) return;
    if (blockInside.type.id.endsWith("stem")) return;
    if (blockInside.type.id.endsWith("farmland")) return;
    if (blockInside.type.id.endsWith("pane")) return;
    if (blockInside.type.id.endsWith("propagule")) return;
    if (blockInside.type.id.endsWith("lichen")) return;
    if (blockInside.type.id.endsWith("fan")) return;
    if (blockInside.type.id.endsWith("fan_dead")) return;
    if (blockInside.type.id.endsWith("hang")) return;
    if (blockInside.type.id.endsWith("hang2")) return;
    if (blockInside.type.id.endsWith("hang3")) return;
    if (blockInside.type.id.endsWith("roots")) return;
    if (blockInside.type.id.endsWith("bed")) return;
    if (blockInside.type.id.endsWith("lectern")) return;
    if (blockInside.type.id.endsWith("stand")) return;
    if (blockInside.type.id.endsWith("egg")) return;
    if (blockInside.type.id.endsWith("cake")) return;
    if (blockInside.type.id.endsWith("vines")) return;
    if (blockInside.type.id.endsWith("vine")) return;
    if (blockInside.type.id.endsWith("dripstone")) return;
    if (blockInside.type.id.endsWith("lantern")) return;
    if (blockInside.type.id.endsWith("candle")) return;
    if (blockInside.type.id.endsWith("pickle")) return;
    if (blockInside.type.id.endsWith("table")) return;
    if (blockInside.type.id.endsWith("chest")) return;
    if (blockInside.type.id.endsWith("bamboo")) return;
    if (blockInside.type.id.endsWith("sapling")) return;
    if (blockInside.type.id.endsWith("bush")) return;
    if (blockInside.type.id.endsWith("pot")) return;
    if (blockInside.type.id.endsWith("stonecutter_block")) return;
    if (blockInside.type.id.endsWith("frame")) return;
    if (blockInside.type.id.endsWith("bell")) return;
    if (blockInside.type.id.endsWith("skull")) return;
    if (blockInside.type.id.endsWith("head")) return;
    if (blockInside.type.id.endsWith("sign")) return;
    if (blockInside.type.id.endsWith("rod")) return;
    if (blockInside.type.id.endsWith("banner")) return;
    if (blockInside.type.id.endsWith("chain")) return;
    if (blockInside.type.id.endsWith("conduit")) return;
    if (blockInside.type.id.endsWith("void")) return;
    if (blockInside.type.id.endsWith("torch")) return;
    if (blockInside.type.id.endsWith("unpowered_comparator")) return;
    if (blockInside.type.id.endsWith("powered_comparator")) return;
    if (blockInside.type.id.endsWith("unpowered_repeater")) return;
    if (blockInside.type.id.endsWith("powered_repeater")) return;
    if (blockInside.type.id.endsWith("redstone_wire")) return;
    if (blockInside.type.id.endsWith("rail")) return;
    if (blockInside.type.id == 'minecraft:air') return;
    player.kill()
}
system.runSchedule(() => {
    for (const player of world.getPlayers()) {
        phase(player)
    }
}, 1)