import { world, system } from "@minecraft/server"
import server from "../../management/api/server"

system.runSchedule(() => {
    for(const player of world.getPlayers()) {
        if (server.teams.isInTeam(player) && !server.teams.has(server.teams.getPlayersTeamWithNoColors(player))) {
            player.removeTag(`rank:${server.teams.getPlayersTeam(player)}`)
            player.removeTag(`team:${server.teams.getPlayersTeam(player)}`)
        }
    }
}, 5)