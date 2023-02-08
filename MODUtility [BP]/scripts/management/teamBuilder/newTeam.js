import { Database } from "../Database/Database.js"

export const teams = Database.register('teams')
export function newTeam(teamName, Owner) {
    const Data = {
        name: teamName,
        createdAt: new Date().toLocaleString(),
        owner: Owner,
    }
    teams.write(teamName, Data)
}