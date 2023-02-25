import { world, system } from "@minecraft/server"
import { adminTag } from "../../config/main.js";
import server from "../../management/api/server.js";

world.events.beforeItemUse.subscribe((data) => {
    const pearlD = 10
    const player = data.source
    if (player.hasTag(adminTag)) return;
    if (data.item.typeId == 'minecraft:ender_pearl') {
        const timeLeft = (server.scoreboard.get(player, 'pearlTimer'))
        if (server.scoreboard.get(player, 'pearlTimer') !== 0) {
        player.tell(`§cYou still have ${timeLeft} seconds before you can use an ender pearl again`)
        data.cancel = true;
    } else if (server.scoreboard.get(player, 'pearlTimer') == 0) {
        player.runCommandAsync(`scoreboard players set @s pearlTimer ${pearlD}`)
    }
}
});

system.runSchedule(() => {
    for (const player of world.getPlayers()) {
    if (server.scoreboard.get(player, 'pearlTimer') >= 1) {
        player.runCommandAsync(`scoreboard players remove @s pearlTimer 1`)
    }
}
}, 20)