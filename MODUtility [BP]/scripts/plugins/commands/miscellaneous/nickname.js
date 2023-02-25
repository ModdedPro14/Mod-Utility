import server from "../../../management/api/server.js";
import { adminTag } from "../../../config/main.js";

server.commands.register({
    name: "nickname",
    description: "Name players on your server",
    aliases: [],
    permission: (player) => player.hasTag(adminTag)
}, (data, args) => {
    const player = data.player
    const foundPlayer = server.commands.addUserOption(player, args[0])
    if (!foundPlayer) return;
    if (!args[1]) return player.tell('§cYou must type a nickname for the player')
    const nicknameTag = foundPlayer.getTags().find(tag => tag.startsWith('nickname:'))
    if (!nicknameTag) {
        foundPlayer.addTag(`nickname:${args.slice(1).join(` `)}`)
        player.tell(`§cSuccessfully renamed the player ${foundPlayer.name} §r§cto ${args.slice(1).join(` `)}`)
        foundPlayer.tell(`§cYou have been renamed to ${args.slice(1).join(` `)}`)
    } else {
        foundPlayer.removeTag(nicknameTag)
        foundPlayer.addTag(`nickname:${args.slice(1).join(` `)}`)
        player.tell(`§cSuccessfully renamed the player ${foundPlayer.name} §r§cto ${args.slice(1).join(` `)}`)
        foundPlayer.tell(`§cYou have been renamed to ${args.slice(1).join(` `)}`)
    }
});