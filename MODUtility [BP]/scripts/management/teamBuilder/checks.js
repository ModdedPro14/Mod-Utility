import { world } from "@minecraft/server"

const teamPrefix = 'team:'

export function isInTeam(player) {
    return Boolean(player.getTags().find(tag => tag.startsWith(teamPrefix)))
}

export function isTeamOwner(player) {
    return Boolean(player.getTags().find(tag => tag.startsWith('teamOwner:')));
}

export function getAllMembersOnlineInAteam(team) {
    return [...world.getPlayers({tags:[`${teamPrefix}§a${team}`]})].length
}

export function getPlayersTeam(player) {
    const teamTag = player.getTags().find(tag => tag.startsWith(teamPrefix))
    const teamName = teamTag?.replace(teamPrefix, '') 
    return teamName
}

export function getPlayersOwnerTeam(player) {
    const teamTag = player.getTags().find(tag => tag.startsWith('teamOwner:'))
    const teamName = teamTag?.replace('teamOwner:', '') 
    return teamName
}

export function getPlayersTeamWithNoColors(player) {
    const teamTag = player.getTags().find(tag => tag.startsWith(`${teamPrefix}§a`))
    const teamName = teamTag?.replace(`${teamPrefix}§a`, '') 
    return teamName
}