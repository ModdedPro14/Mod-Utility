import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { adminTag } from "../../../config/main.js";

Command.register({
    name: "resetnickname",
    description: "Reset a players nickname if they had one",
    aliases: ['rnn', 'resetnn'],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    if (!args[0]) return player.tell('§cYou must type a players name')
    const [foundPlayer] = world.getPlayers({ name: args[0] })
    if (!foundPlayer) return player.tell(`§cCant find the player: ${args[0]}`)
    const nicknameTag = foundPlayer.getTags().find(tag => tag.startsWith('nickname:'))
    if (!nicknameTag) return player.tell(`${foundPlayer.name} §r§cDosent have a nickname`)
    foundPlayer.removeTag(nicknameTag)
    player.tell(`§cSuccessfully reset the player ${foundPlayer.name}'s §r§cname`)
    foundPlayer.tell(`${player.name} §r§cHas reset your name`)
});