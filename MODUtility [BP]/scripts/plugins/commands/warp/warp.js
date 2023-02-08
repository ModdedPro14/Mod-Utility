import { Command } from "../../../management/CommandHandler/CommandHandler.js";

Command.register({
    name: 'warp',
    description: `set/remove/tp a warp`,
    aliases: [],
}, (data, args) => {
    const player = data.player
    if (player.hasTag('jailed')) return player.tell('§cYou can\'t use this command while your jailed')
    const warps = player.getTags().join(' '), coordFormat = /(?<=[x-zX-Z]:)(-\d+|\d+)/g, warp = args[1], warpRegex = new RegExp(`\\(N:${warp} X:(-\\d+|\\d+) Y:(-\\d+|\\d+) Z:(-\\d+|\\d+)(.*)\\)`), findwarpName = /(?<=\(N:).+?(?= X:(-\d+|\d+) Y:(-\d+|\d+) Z:(-\d+|\d+)\))/g, findXYZ = `${warps.match(warpRegex)}`.match(coordFormat), listOptions = ['list'], setOptions = ['set'], removeOptions = ['remove'], warpOptions = ['tp'];
    if (!args[0]) return player.tell('§cYou must select between list/set/remove/tp');
    if (listOptions.includes(args[0])) {
        try {
            let allwarps = [];
            for (let theWarp of warps.match(findwarpName)) {
                let allwarpsXYZ = `${warps.match(new RegExp(`\\(N:${theWarp} X:(-\\d+|\\d+) Y:(-\\d+|\\d+) Z:(-\\d+|\\d+)(.*)\\)`))}`.match(coordFormat);
                allwarps.push(`§c${theWarp}, Location: §c${allwarpsXYZ[0]} §c${allwarpsXYZ[1]} §c${allwarpsXYZ[2]}`);
            }
            if (allwarps.length > 0)
                return player.tell(`§cHere's a list of all of your warps:\n\n` + allwarps.join('\n'));
            return player.tell('§cYou haven\'t set any warps yet');
        }
        catch {
            return player.tell('§cYou haven\'t set any warps yet');
        }
    } else if (setOptions.includes(args[0])) {
        if (!args[1])
            return player.tell('§cYou must type a warp name to set');
        let X = Math.trunc(player.location.x), Y = Math.trunc(player.location.y), Z = Math.trunc(player.location.z);
        if (warp.length > 8)
            return player.tell('§cPlease keep the warp name under 9 characters');
        if (warps.match(warpRegex))
            return player.tell('§cYou already have a warp set with that name');
        if (!player.dimension.id == 'overworld')
            return player.tell('§cYou cannot use warps in dimensions other than the overworld');
        try {
            if (warps.match(findwarpName).length >= 10)
                return player.tell(`§cYou cannot have more than 10 personal warps. You need to delete one of your other warps to create ${warp}`);
        }
        catch { }
        player.addTag(`"(N:${warp} X:${X} Y:${Y} Z:${Z})"`);
        return player.tell(`§cYou have set a warp with the name ${warp} at: ${X}, ${Y}, ${Z}`);
    } else if (removeOptions.includes(args[0])) {
        if (!args[1])
            return player.tell('§cPlease type a warp name to remove');
        if (!warps.match(warpRegex))
            return player.tell('§cYou don\'t have a warp with that name');
        player.removeTag(`"(N:${warp} X:${findXYZ[0]} Y:${findXYZ[1]} Z:${findXYZ[2]})"`);
        return player.tell(`§cSuccessfully removed warp with the name ${warp} at ${findXYZ[0]}, ${findXYZ[1]}, ${findXYZ[2]}`);
    } else if (warpOptions.includes(args[0])) {
        if (!args[1])
            return player.tell(`§cType a warp name to warp to`);
        if (!warps.match(warpRegex))
            return player.tell('§cYou don\'t have a warp with that name');
        if (!player.dimension.id == 'overworld')
            return player.tell('§cYou cannot use warps in dimensions other than the overworld');
        player.runCommandAsync(`tp @s ${findXYZ[0]} ${findXYZ[1]} ${findXYZ[2]}`);
        player.tell(`§cYou have been teleported to ${warp} at: ${findXYZ[0]}, ${findXYZ[1]}, §c${findXYZ[2]}`);
  } else return player.tell('§cYou must select between list/set/remove/tp');
});