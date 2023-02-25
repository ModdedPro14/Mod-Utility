import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "invsee",
    description: "See a players inventory",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const member = server.commands.addUserOption(player, args[0])
    if (!member) return;
    const container = member.getComponent('inventory').container;
    player.tell(`${member.name}'s§r§c inventory:`);
    for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if(typeof item === "undefined") continue;
        player.tell(`§6Slot ${i}: §2${item.typeId.replace('minecraft:', '')}:§a${item.data} §ex${item.amount}`);
    }
});