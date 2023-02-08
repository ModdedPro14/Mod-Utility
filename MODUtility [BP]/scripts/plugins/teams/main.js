import { world, system } from "@minecraft/server"
import { isInTeam, getPlayersTeam, getPlayersTeamWithNoColors } from "../../management/teamBuilder/checks.js"
import { teams } from "../../management/teamBuilder/newTeam.js"

system.runSchedule(() => {
    for(const player of world.getPlayers()) {
        if (isInTeam(player) && !teams.has(getPlayersTeamWithNoColors(player))) {
            player.removeTag(`rank:${getPlayersTeam(player)}`)
            player.removeTag(`team:${getPlayersTeam(player)}`)
        }
    }
}, 5)