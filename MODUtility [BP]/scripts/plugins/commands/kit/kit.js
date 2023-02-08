import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { Database } from "../../../management/Database/Database.js";
import main, { adminTag, kit } from "../../../config/main.js";
import { getItemData, newItem, getScore } from "./utils.js";
try {
    world.scoreboard.addObjective('money', '§c§lMoney')
} catch (error) {
    0;
}

Command.register({
    name: "kit",
    description: "create/set/reset/list/view/remove/buy a kit",
    aliases: [],
}, (data, args) => {
    const player = data.player
    const message = data.message;
    if (player.hasTag('jailed')) return player.tell('§cYou can\'t use this command while your jailed')
    const inventory = player.getComponent('inventory').container;
    const create = "create", remove = "remove", list = "list", set = "set", view = "view", buy = "buy", reset = "reset"
    if (create.includes(args[0])) {
        if (!player.hasTag(adminTag)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cUnknown command ${message.replace(main.prefix, '')}. Please check that the command exists and that you have permission to use it."}]}`)
        if (!args[1]) return player.tell('§cYou must provide a kits name');
        if (kit.has(args[1])) return player.tell('§cThat kit already exists');
        kit.write(args[1], args[1])
        player.tell(`§cCreated the kit with the name ${args[1]}`)
    } else if (remove.includes(args[0])) {
        if (!player.hasTag(adminTag)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cUnknown command ${message.replace(main.prefix, '')}. Please check that the command exists and that you have permission to use it."}]}`)
        if (!args[1]) return player.tell('§cYou must provide a kit name to remove');
        if (!kit.has(args[1])) return player.tell('§cThat kit doesn\'t exist');
        kit.delete(args[1]);
        player.tell(`§cYou have removed the kit ${args[1]}§r §csuccessfuly`)
    } else if (list.includes(args[0])) {
        player.tell(`§c----------------\nAvailable kits:${kit.allKeys()}\n§c----------------`)
    } else if (set.includes(args[0])) {
        if (!player.hasTag(adminTag)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cUnknown command ${message.replace(main.prefix, '')}. Please check that the command exists and that you have permission to use it."}]}`)
        let permission;
        let price;
        if (!args[1]) return player.tell('§cYou must provide a kit name');
        if (!kit.has(args[1])) return player.tell('§cThat kit dosent exist');
        if (args[1] && !args[2]) return player.tell('§cYou must type items in the last to continue')
        if (args[2] == "items") {
            if (!args[3]) return player.tell('§cYou need to enter a permission tag at the last')
            permission = args[3]
            if (!args[4]) return player.tell('§cYou must type a price for the kit');
            if (!Number.isInteger(Number(args[4]))) return player.tell('§cYou must define a number')
            price = Number(args[4])
        const items = [];
        let itemCount = 0;
        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (!item) continue; 
            itemCount++;
            items.push(getItemData(item));
        }
        if (!items.length)
            return player.tell('§cThere are no items to add')
        const data = {
            name: args[1],
            itemCount,
            permission: permission ?? "none",
            price: price ?? 0,
            items: items,
            createdAt: new Date().toLocaleString()
        };
        player.tell(`§cYou have set the items in your inventory to the kit ${args[1]}`)
        kit.write(args[1], data);
        }
    } else if (buy.includes(args[0])) {
        if (!args[1]) return player.tell('§cYou must provide a kit name')
        if (!kit.has(args[1])) return player.tell('§cYou must provide an existing kit name')
        const Data = kit.read(args[1])
        if (!args[1].includes(Data.name || Data.createdAt)) return player.tell('§cThis kit cannot be bought since there\'s no items, price, permission that have been set on it')
        if (Data.permission !== "none" && (!player.hasTag(Data.permission))) return player.tell('§cYou don\'t have permission to buy this kit')
        if (getScore(player, "money") < Data.price) return player.tell(`§cYou need ${Data.price} money to buy this item`)
        const items = Data.items;
        if (!items) return player.tell('§cThere are no items set in this kit')
        for (const item of items) {
                    inventory.addItem(newItem(item));
                }
        player.tell(`§cYou have bought the kit ${args[1]}`)
        player.runCommandAsync(`scoreboard players remove @s money ${Data.price}`)
    } else if (view.includes(args[0])) {
        if (!args[1]) return player.tell('§cYou must provide the kit name that you want to view')
        if (!kit.has(args[1])) return player.tell('§cYou must provide an existing kit name')
        const Data = kit.read(args[1])
        if (!args[1].includes(Data.name || Data.createdAt)) return player.tell('§cThis kit cannot be viewed since there\'s no items, price, permission that have been set on it')
        let tx = "\n"
        tx += `§cName: ${Data.name}\n§cItem Amount: ${Data.itemCount}\n§cPermission: ${Data.permission}\n§cPrice: ${Data.price}\n§cCreated At: ${Data.createdAt}`
        player.tell(`§cViewing the kit ${args[1]}:${tx}`)
    } else if (reset.includes(args[0])) {
        if (!player.hasTag(adminTag)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cUnknown command ${message.replace(main.prefix, '')}. Please check that the command exists and that you have permission to use it."}]}`)
        if (!args[1]) return player.tell('§cYou must provide the kits name that you want to reset')
        if (!kit.has(args[1])) return player.tell('§cYou must provide an existing kit name')
        kit.write(args[1], args[1])
        player.tell(`§cYou have reseted the kit ${args[1]}§r§c successfully`)
    } else {
        if (player.hasTag(adminTag)) {
            player.tell('§cYou must select between create/set/list/view/buy/remove/reset')
        } else {
            player.tell('§cYou must select between list/buy/view')
        }
    }
});
