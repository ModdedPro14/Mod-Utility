import { Data } from "../api/server"

const teamPrefix = 'team:'
export class teams {
    constructor() {
        this.database = Data.database.register('teams');
    }
    isInTeam(player) {
        return Boolean(player.getTags().find(tag => tag.startsWith(teamPrefix)))
    }
    
    isTeamOwner(player) {
        return Boolean(player.getTags().find(tag => tag.startsWith('teamOwner:')));
    }
    
    getAllMembersOnlineInAteam(team) {
        return [...world.getPlayers({tags:[`${teamPrefix}§a${team}`]})].length
    }
    
    getPlayersTeam(player) {
        const teamTag = player.getTags().find(tag => tag.startsWith(teamPrefix))
        const teamName = teamTag?.replace(teamPrefix, '') 
        return teamName
    }
    
    getPlayersOwnerTeam(player) {
        const teamTag = player.getTags().find(tag => tag.startsWith('teamOwner:'))
        const teamName = teamTag?.replace('teamOwner:', '') 
        return teamName
    }
    
    getPlayersTeamWithNoColors(player) {
        const teamTag = player.getTags().find(tag => tag.startsWith(`${teamPrefix}§a`))
        const teamName = teamTag?.replace(`${teamPrefix}§a`, '') 
        return teamName
    }
    
    newTeam(teamName, Owner) {
        const Data = {
            name: teamName,
            createdAt: new Date().toLocaleString(),
            owner: Owner,
        }
        this.database.write(teamName, Data)
    }
}