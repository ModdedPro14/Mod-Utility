import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "resetnickname",
    description: "Reset a players nickname if they had one",
    aliases: ['rnn', 'resetnn'],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const foundPlayer = server.commands.addUserOption(player, args[0])
    if (!foundPlayer) return;
    const nicknameTag = foundPlayer.getTags().find(tag => tag.startsWith('nickname:'))
    if (!nicknameTag) return player.tell(`${foundPlayer.name} §r§cDosent have a nickname`)
    foundPlayer.removeTag(nicknameTag)
    player.tell(`§cSuccessfully reset the player ${foundPlayer.name}'s §r§cname`)
    foundPlayer.tell(`${player.name} §r§cHas reset your name`)
});