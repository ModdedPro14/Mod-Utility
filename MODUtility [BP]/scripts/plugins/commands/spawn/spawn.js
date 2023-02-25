import server from "../../../management/api/server";

server.commands.register({
    name: "spawn",
    description: "Teleports you to spawn if is set",
    aliases: [],
}, (data) => {
    const player = data.player
    if (player.hasTag('jailed')) return player.tell('§cYou can\'t use this command while your jailed')
    if (!server.spawn.has('spawn')) return player.tell('§cThe spawn haven\'t been set yet');
    player.runCommandAsync(`tp @s ${server.spawn.read('spawn')[0]} ${server.spawn.read('spawn')[1]} ${server.spawn.read('spawn')[2]}`);
    player.tell('§cYou have been teleported to the spawn')
});