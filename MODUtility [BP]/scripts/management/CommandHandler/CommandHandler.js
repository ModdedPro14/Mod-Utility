import { world } from "@minecraft/server";
import main from "../../config/main.js";

export class Commands {
    constructor() {
        this.registeredCommands = []
    }

    register(info, callback) {
        Commands.registeredCommands.push({
            name: info.name.toLowerCase().split(' ')[0],
            description: info.description ?? undefined,
            aliases: info.aliases?.map(aL => aL.toLowerCase().split(' ')[0]) ?? [],
            category: info.category ?? 'uncategorized',
            syntax: info.syntax,
            permission: info.permission,
            callback
        });
    }

    remove(command) {
        const index = Commands.registeredCommands.findIndex(cmd => cmd.name === command.toLowerCase());
        if (index === -1)
            return;
        Commands.registeredCommands.splice(index, 1);
    }

    forEach(callback, thisArg) {
        Commands.registeredCommands.forEach(callback, thisArg);
    }

    clear() {
        Commands.registeredCommands = [];
    }

    getAllCommands() {
        return Commands.registeredCommands 
    }

    addUserOption(sender, args) {
        if (!args) return sender.tell('§cYou must type a players name')
        const [player] = world.getPlayers({ name: args })
        if (!player) return sender.tell(`§cCan't find the player: ${args}`);
        return player;
    }

    addReasonOption(sender, reason, optional = false) {
        let Reason = "§cNo reason provided"
        if (optional) {
            if (!reason) return sender.tell('§cYou must provide a reason')
            Reason = reason
            return Reason;
        }
        if (reason) Reason = reason
        return Reason;
    }
}

Commands.registeredCommands = [];

world.events.beforeChat.subscribe((data) => {
    const { message, sender: player } = data;
    const prefix = main.prefix
    if (!message.startsWith(prefix)) return;
    data.cancel = true;
    const args = message.substring(prefix.length).replace(/@(?=\w{2})|@(?!s)/g, '').trim().replace(/ {2,}/g, ' ').match(/".*?"|[\S]+/g)?.map(item => item.replaceAll('"', '')) ?? [];
    const cmd = args.shift();
    const cmdData = Commands.registeredCommands.find(c => c.name === cmd || c.aliases?.includes(cmd));
    if (!cmdData) return player.tell(`§cUnknown command: ${message.replace(main.prefix, '')}. Please check that the command exists and that you have permission to use it.`)
    if (cmdData.permission && !cmdData.permission(player)) return player.tell(`§cUnknown command: ${message.replace(main.prefix, '')}. Please check that the command exists and that you have permission to use it.`)
    cmdData.callback({ player, message }, args);
});