import { world } from "@minecraft/server";
import server from "../../../management/api/server";

const playerRequest = {};

server.commands.register({
    name: "teams",
    description: "create/list/view/leave/decline/accept/invite/delete/kick a team",
    aliases: [],
}, (data, args) => {
    const { player } = data;
    const { id, name } = player;
    if (args[0] == 'create') {
        if (!args[1]) return player.tell('§cYou must type a name for the team')
        if (server.checks.isTeamOwner(player)) return player.tell('§cYou already have created a team')
        if (server.checks.isInTeam(player)) return player.tell('§cYou cant create a team when your in a team')
        if (server.teams.has(args[1])) return player.tell('§cThis team already exists')
        if (args[2]) return player.tell('§cYou cant have spaces in your teams name')
        server.newTeam(args[1], player.name)
        player.tell(`§cSuccesfully created the team ${args[1]}`)
        player.addTag(`rank:§a${args[1]} §r§7- §eLeader`)
        player.addTag(`team:§a${args[1]}`)
        player.addTag(`teamOwner:${args[1]}`)
    } else if (args[0] == 'list') {
        player.tell(`§c----------------\nAvailable Teams:${server.teams.allKeys()}\n§c----------------`)
    } else if (args[0] == 'view') {
        if (!args[1]) return player.tell('§cYou must provide a teams name')
        if (!server.teams.has(args[1])) return player.tell('§cYou must provide a teams name that exist')
        const Data = server.teams.read(args[1])
        let text = '\n'
        text += `§cName: ${Data.name} \n§r§cOwner: ${Data.owner} \n§r§cCreated at: ${Data.createdAt} \n§cMembers online: ${getAllMembersOnlineInAteam(args[1])}`
        player.tell(`§cViewing the team ${args[1]}:${text}`)
    } else if (args[0] == 'leave') {
        if (server.checks.isTeamOwner(player)) return player.tell('§cYou cant leave your own team')
        if (!server.checks.isInTeam(player)) return player.tell('§cYou arent in a team')
        player.tell(`§cYou have left the team ${server.checks.getPlayersTeam(player)}`)
        player.removeTag(`rank:${server.checks.getPlayersTeam(player)}`)
        player.removeTag(`team:${server.checks.getPlayersTeam(player)}`)
    } else if (args[0] == 'delete') {
        if (!server.checks.isInTeam(player)) return player.tell('§cYou arent in a team')
        if (!server.checks.isTeamOwner(player)) return player.tell('§cYou arent the owner of the team to delete this team')
        player.tell(`§cYou have deleted the team ${server.checks.getPlayersTeam(player)}`)
        server.teams.delete(server.checks.getPlayersOwnerTeam(player))
        player.removeTag(`rank:${server.checks.getPlayersTeam(player)} §r§7- §eLeader`)
        player.removeTag(`teamOwner:${server.checks.getPlayersOwnerTeam(player)}`)
        player.removeTag(`team:${server.checks.getPlayersTeam(player)}`)
    } else if (args[0] == 'invite') {
        const foundPlayer = server.commands.addUserOption(player, args[1])
        if (!foundPlayer) return;
        if (!server.checks.isInTeam(player)) return player.tell('§cYou arent in a team to invite any one')
        if (foundPlayer == player) return player.tell("§cYou can't send a invite request to yourself")
        if (server.checks.isInTeam(foundPlayer)) return player.tell(`${foundPlayer.name} §r§care in a team so u cant invite them`)
        if (server.checks.getPlayersTeam(foundPlayer) == server.checks.getPlayersTeam(player)) return player.tell(`${foundPlayer.name} §r§care already in your team`)
        playerRequest[foundPlayer.id] = {name, id}
        player.tell(`§cYou have sent a invite request to the player ${foundPlayer.name}`)
        foundPlayer.tell(`${player.name} §r§chas sent you a invite request to their team`)
    } else if (args[0] == 'accept') {
        if (!playerRequest.hasOwnProperty(id)) return player.tell('§cYou dont have any requests')
        const { id: requesterId, name: requesterName } = playerRequest[id];
        const requester = world.getAllPlayers().find(({id}) => id === requesterId);
        if (!requester) return player.tell(`§cCan\'t find the player: ${requesterName}`);
        requester.tell(`${name}§r§c has accepted your invite`)
        delete playerRequest[id]
        player.addTag(`team:${server.checks.getPlayersTeam(requester)}`)
        player.addTag(`rank:${server.checks.getPlayersTeam(requester)}`)
        player.tell(`§cYou have joined ${name}'s §r§cteam`)
    } else if (args[0] == 'decline') {
        if (!playerRequest.hasOwnProperty(id)) return player.tell('§cThere are no invites to decline');
        const { id: requesterId, name: requesterName } = playerRequest[id];
        const requester = world.getAllPlayers().find(({id}) => id === requesterId);
        if (!requester) return player.tell(`§cCan\'t find the player: ${requesterName}`);
        requester.tell(`${player.name} §r§chas declined your invite`)
        player.tell(`§cYou have declined ${requesterName}'s §r§cinvite`);
        delete playerRequest[id]
    } else if (args[0] == 'kick') {
        if (!server.checks.isTeamOwner(player)) return player.tell('§cYou arent the team owner to kick anyone')
        const foundPlayer = server.commands.addUserOption(player, args[1])
        if (!foundPlayer) return;
        if (foundPlayer == player) return player.tell('§cYou cant kick yourself')
        player.tell(`§cYou have kicked the player ${foundPlayer.name} §r§cfrom the team`)
        foundPlayer.removeTag(`rank:${server.checks.getPlayersTeam(player)}`)
        foundPlayer.removeTag(`team:${server.checks.getPlayersTeam(player)}`)
        foundPlayer.tell('§cYou have been kicked from the team')
    } else {
        player.tell('§cYou must choose between create/list/view/leave/decline/accept/invite/delete/kick')
    }
})