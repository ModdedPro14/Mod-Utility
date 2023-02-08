import { ServerPaper } from './Server.js';
import { Database } from './Database.js';

class ServerBook extends ServerPaper {
    constructor() {
        super(...arguments);
        
    }
}

const Server = new ServerBook();
export default Server;