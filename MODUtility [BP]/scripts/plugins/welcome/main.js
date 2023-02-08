import { world } from "@minecraft/server";

world.events.playerJoin.subscribe(data => {
    const player = data.player
    if (!player.hasTag('old')) {
        world.say(`§c${player.name}§r§7 has connected for the first time. Please welcome them`)
        player.addTag('old')
    }
});