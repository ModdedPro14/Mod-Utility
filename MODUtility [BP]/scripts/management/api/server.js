import { DatabasePaper } from "../Database/Database.js";
import { Commands } from "../CommandHandler/CommandHandler.js";
import { scoreboard } from "../Scoreboard/scoreboard.js";
import { teams } from "../teamBuilder/team.js";
import { utils } from "./utils.js";
import { Ban } from "../ban/Ban.js";

class data {
    constructor() {
        this.database = new DatabasePaper() 
    }
}

class Server {
    constructor() {
        this.database = new DatabasePaper()
        this.commands = new Commands()
        this.prefix = this.database.register('prefix');
        this.jail = this.database.register('jail');
        this.spawn = this.database.register('spawn');
        this.kit = this.database.register('kit');
        this.scoreboard = new scoreboard()
        this.utils = new utils()
        this.ban = new Ban()
        this.teams = new teams()
    }
}

export const Data = new data()
const server = new Server()
export default server;