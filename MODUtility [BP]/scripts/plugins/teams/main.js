import { world, system } from "@minecraft/server"
import server from "../../management/api/server"

system.runSchedule(() => {
    for(const player of world.getPlayers()) {
        if (server.checks.isInTeam(player) && !server.teams.has(server.checks.getPlayersTeamWithNoColors(player))) {
            player.removeTag(`rank:${server.checks.getPlayersTeam(player)}`)
            player.removeTag(`team:${server.checks.getPlayersTeam(player)}`)
        }
    }
}, 5)