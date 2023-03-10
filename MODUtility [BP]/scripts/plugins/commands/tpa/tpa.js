import { world } from "@minecraft/server";
import server from "../../../management/api/server";

const playerRequest = {};

server.commands.register({
    name: "tpa",
    description: "Send/accept/decline a tp request from a player",
    aliases: [],
}, (data, args) => {
    const { player } = data;
    const { id, name } = player;
    const send = "send", accept = 'accept', decline = 'decline';
    if (accept.includes(args[0])) {
        if (!playerRequest.hasOwnProperty(id)) return player.tell('§cYou dont have any requests')
        const { id: requesterId, name: requesterName } = playerRequest[id];
        const requester = world.getAllPlayers().find(({id}) => id === requesterId);
        if (!requester) return player.tell(`§cCan\'t find the player: ${requesterName}`);
        requester.tell(`${name}§r§c has accepted your request`)
        delete playerRequest[id]
        requester.teleport(player.location, player.dimension, player.rotation.x, player.rotation.y);
    } else if (send.includes(args[0])) {
        const foundPlayer = server.commands.addUserOption(player, args[1])
        if (!foundPlayer) return;
        if (foundPlayer == player) return player.tell("§cYou can't send a tp request to yourself")
        foundPlayer.tell(`${name}§r§c sent you a tp request`)
        playerRequest[foundPlayer.id] = {name, id}
    } else if (decline.includes(args[0])) {
        if (!playerRequest.hasOwnProperty(id)) return player.tell('§cThere are no requests to decline');
        const { id: requesterId, name: requesterName } = playerRequest[id];
        const requester = world.getAllPlayers().find(({id}) => id === requesterId);
        if (!requester) return player.tell(`§cCan\'t find the player: ${requesterName}`);
        requester.tell(`${player.name} §r§chas declined your request`)
        player.tell(`§cYou have declined ${requesterName}'s §r§crequest`);
        delete playerRequest[id]
    } else return player.tell('§cYou have to choose between Send/accept/decline')
});