import { adminTag } from "../../../config/main.js";
import server from "../../../management/api/server";

server.commands.register({
    name: "kit",
    description: "testestetstestets",
    aliases: [],
    category: 'Kit',
    syantx: '§2<create> <Kit name> ',
    permisson: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (args[0] == 'create') {
        if (!args[1]) return player.tell('§cYou must provide a kits name');
        if (server.kit.has(args[1])) return player.tell('§cThat kit already exists');
        server.kit.write(args[1], args[1])
        player.tell(`§cCreated the kit with the name ${args[1]}`)
    } else {
        player.tell('saaasasas')
    }
});