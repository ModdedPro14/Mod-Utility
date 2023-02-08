import { world } from "@minecraft/server"
import { setTickInterval } from "../../management/Database/tick.js"
import { ban } from "../../config/main.js"

setTickInterval(() => {
    for (const player of world.getPlayers()) {
        if (ban.has(player.name)) {
            const Data = ban.read(player.name)
            player.runCommandAsync(`§cYou have been banned from the server By: ${Data.by} Reason: ${Data.reason} At: ${Data.date}`)
        }
    }
}, 20)
