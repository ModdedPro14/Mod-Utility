import { world, system } from "@minecraft/server"
import server from "../../management/api/server.js"

system.runSchedule(() => {
    for (const player of world.getPlayers()) {
        if (server.ban.has(player.name)) {
            const Data = server.ban.read(player.name)
            player.runCommandAsync(`kick @s §cYou have been banned from the server By: ${Data.by} Reason: ${Data.reason} At: ${Data.date}`)
        }
    }
}, 20)
