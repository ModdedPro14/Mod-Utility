import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "dupe",
    description: "Duplicates the item your holding",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data) => {
    const inventory = data.player.getComponent('inventory').container;
    const item = inventory.getItem(data.player.selectedSlot)
    inventory.addItem(item)
    data.player.tell(`§cSuccessfully duped the item ${item.typeId.replace('minecraft:', '')}`)
});