import { teams } from "../../config/main.js";

export function newTeam(teamName, Owner) {
    const Data = {
        name: teamName,
        createdAt: new Date().toLocaleString(),
        owner: Owner,
    }
    teams.write(teamName, Data)
}