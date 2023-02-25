import server from "../api/server"

export function newTeam(teamName, Owner) {
    const Data = {
        name: teamName,
        createdAt: new Date().toLocaleString(),
        owner: Owner,
    }
    server.teams.write(teamName, Data)
}