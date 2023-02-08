import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import main, { adminTag } from "../../../config/main.js";

Command.register({
    name: "ecwipe",
    description: "Wipe a players ender chest",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const prefix = main.prefix
    const player = data.player
    const msg = data.message
    if(args.length === 0) return player.tell("§cYou need to type a players name");
    for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl;
        break;
    }
    if(typeof member === "undefined") return player.tell(`§cCant find the player:${msg.replace(`${prefix}ecwipe`, '')}`);
    if (member.hasTag(adminTag)) return player.tell('§cYou can\'t wipe a staff members ender chest');
    player.tell(`${member.name}'s §r§cender chest have been wiped`)
member.runCommandAsync('replaceitem entity @s slot.enderchest 0 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 1 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 2 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 3 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 4 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 5 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 6 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 7 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 8 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 9 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 10 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 11 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 12 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 13 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 14 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 15 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 16 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 17 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 18 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 19 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 20 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 21 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 22 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 23 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 24 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 25 air ')
member.runCommandAsync('replaceitem entity @s slot.enderchest 26 air ')
member.tell(`§cYour ender chest has been wiped by: ${player.name}`)
});