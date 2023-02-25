import { DatabasePaper } from "../Database/Database.js";
import { Commands } from "../CommandHandler/CommandHandler.js";
import { scoreboard } from "../Scoreboard/scoreboard.js";
import { newTeam } from "../teamBuilder/newTeam.js";
import { checks } from "../teamBuilder/checks.js";
import { item } from "./utils.js";
import { Ban } from "../ban/Ban.js";

class Server {
    constructor() {
        this.database = new DatabasePaper()
        this.commands = new Commands()
        this.prefix = this.database.register('prefix');
        this.jail = this.database.register('jail');
        this.spawn = this.database.register('spawn');
        this.kit = this.database.register('kit');
        this.ban = this.database.register('ban');
        this.teams = this.database.register('teams');
        this.scoreboard = new scoreboard()
        this.newTeam = (teamName, Owner) => {
            newTeam(teamName, Owner)
        }
        this.checks = new checks()
        this.item = new item()
        this.Ban = new Ban()
    }
}

const server = new Server()
export default server;