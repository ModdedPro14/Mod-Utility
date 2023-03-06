import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";
import { MinecraftEffectTypes } from '@minecraft/server'

server.commands.register({
    name: "troll",
    description: "Troll someone",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const user = server.commands.addUserOption(player, args[0])
    if (!user) return;
    if (args[1] == 'creeper') {
        user.playSound('random.fuse')
        player.tell(`§cTrolled the player ${user.name} §r§cwith creeper sound`)
    } else if (args[1] == 'explode') {
        user.playSound('random.explode')
        player.tell(`§cTrolled the player ${user.name} §r§cwith explode sound`)
    } else if (args[1] == 'cave') {
        user.playSound('ambient.cave')
        player.tell(`§cTrolled the player ${user.name} §r§cwith cave sound`)
    } else if (args[1] == 'hurt') {
        user.applyDamage(1)
        player.tell(`§cTrolled the player ${user.name} §r§cwith random hurt`)
    } else if (args[1] == 'fire') {
        user.setOnFire(2)
        player.tell(`§cTrolled the player ${user.name} §r§cwith fire`)
    } else if (args[1] == 'fly') {
        user.addEffect(MinecraftEffectTypes.levitation, 50, 15, false)
        player.tell(`§cTrolled the player ${user.name} §r§cwith levitation effect`)
    } else if (args[1] == 'enderman') {
        user.playSound('mob.endermen.stare')
        player.tell(`§cTrolled the player ${user.name} §r§cwith enderman sound`)
    } else if (args[1] == 'slownessScreen') {
        user.addEffect(MinecraftEffectTypes.slowness, 50, 255, false)
        player.tell(`§cTrolled the player ${user.name} §r§cwith slowness screen`)
    } else return player.tell('§cYou must select between creeper/explode/cave/hurt/fire/fly/enderman/slownessScreen') 
});