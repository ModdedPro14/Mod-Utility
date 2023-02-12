import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";
import { isTeamOwner, isInTeam, getAllMembersOnlineInAteam, getPlayersTeam, getPlayersOwnerTeam } from "../../../management/teamBuilder/checks.js";
import { newTeam } from "../../../management/teamBuilder/newTeam.js";
import { teams } from "../../../config/main.js";

const playerRequest = {};

Command.register({
    name: "teams",
    description: "create/list/view/leave/decline/accept/invite/delete/kick a team",
    aliases: [],
}, (data, args) => {
    const { player } = data;
    const { id, name } = player;
    if (args[0] == 'create') {
        if (!args[1]) return player.tell('§cYou must type a name for the team')
        if (isTeamOwner(player)) return player.tell('§cYou already have created a team')
        if (isInTeam(player)) return player.tell('§cYou cant create a team when your in a team')
        if (teams.has(args[1])) return player.tell('§cThis team already exists')
        if (args[2]) return player.tell('§cYou cant have spaces in your teams name')
        newTeam(args[1], player.name)
        player.tell(`§cSuccesfully created the team ${args[1]}`)
        player.addTag(`rank:§a${args[1]} §r§7- §cOwner`)
        player.addTag(`team:§a${args[1]}`)
        player.addTag(`teamOwner:${args[1]}`)
    } else if (args[0] == 'list') {
        player.tell(`§c----------------\nAvailable Teams:${teams.allKeys()}\n§c----------------`)
    } else if (args[0] == 'view') {
        if (!args[1]) return player.tell('§cYou must provide a teams name')
        if (!teams.has(args[1])) return player.tell('§cYou must provide a teams name that exist')
        const Data = teams.read(args[1])
        let text = '\n'
        text += `§cName: ${Data.name} \n§r§cOwner: ${Data.owner} \n§r§cCreated at: ${Data.createdAt} \n§cMembers online: ${getAllMembersOnlineInAteam(args[1])}`
        player.tell(`§cViewing the team ${args[1]}:${text}`)
    } else if (args[0] == 'leave') {
        if (isTeamOwner(player)) return player.tell('§cYou cant leave your own team')
        if (!isInTeam(player)) return player.tell('§cYou arent in a team')
        player.tell(`§cYou have left the team ${getPlayersTeam(player)}`)
        player.removeTag(`rank:${getPlayersTeam(player)}`)
        player.removeTag(`team:${getPlayersTeam(player)}`)
    } else if (args[0] == 'delete') {
        if (!isInTeam(player)) return player.tell('§cYou arent in a team')
        if (!isTeamOwner(player)) return player.tell('§cYou arent the owner of the team to delete this team')
        player.tell(`§cYou have deleted the team ${getPlayersTeam(player)}`)
        teams.delete(getPlayersOwnerTeam(player))
        player.removeTag(`rank:${getPlayersTeam(player)} §r§7- §cOwner`)
        player.removeTag(`teamOwner:${getPlayersOwnerTeam(player)}`)
        player.removeTag(`team:${getPlayersTeam(player)}`)
    } else if (args[0] == 'invite') {
        if (!args[1]) return player.tell('§cYou must type a players name');
        if (!isInTeam(player)) return player.tell('§cYou arent in a team to invite any one')
        const [foundPlayer] = world.getPlayers({ name: args[1] });
        if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
        if (foundPlayer == player) return player.tell("§cYou can't send a invite request to yourself")
        if (isInTeam(foundPlayer)) return player.tell(`${foundPlayer.name} §r§care in a team so u cant invite them`)
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
        player.addTag(`team:${getPlayersTeam(requester)}`)
        player.addTag(`rank:${getPlayersTeam(requester)}`)
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
        if (!isTeamOwner(player)) return player.tell('§cYou arent the team owner to kick anyone')
        if (!args[1]) return player.tell('§cYou must type a players name')
        const [foundPlayer] = world.getPlayers({ name: args[1] });
        if (!foundPlayer) return player.tell(`§cCan't find the player: ${args[1]}`);
        if (foundPlayer == player) return player.tell('§cYou cant kick yourself')
        player.tell(`§cYou have kicked the player ${foundPlayer.name} §r§cfrom the team`)
        foundPlayer.removeTag(`rank:${getPlayersTeam(player)}`)
        foundPlayer.removeTag(`team:${getPlayersTeam(player)}`)
        foundPlayer.tell('§cYou have been kicked from the team')
    } else {
        player.tell('§cYou must choose between create/list/view/leave/decline/accept/invite/delete/kick')
    }
})