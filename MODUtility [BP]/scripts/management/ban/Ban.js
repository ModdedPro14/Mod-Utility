import { Data } from "../api/server.js";
import { adminTag } from "../../config/main.js";

export class Ban {
    constructor() {
        this.database = Data.database.register('ban');
    }
    newBan(sender, player, reason) {
        if (player == sender) return sender.tell("§cYou can't ban yourself")
        if (player.hasTag(adminTag)) return sender.tell('§cYou cant ban a staff member')
        if (this.database.has(player.name)) return sender.tell(`${player.name} §r§cIs already banned`)
        const Data = {
            name: player.name,
            date: new Date().toLocaleString(),
            reason: reason,
            by: sender.name
        }
        this.database.write(player.name, Data)
        sender.tell(`§cYou have banned the player ${player.name} §r§cReason: ${reason}`)
    }

    unban(sender, player) {
        const getPlayer = this.database.has(player)
        if (!player) return sender.tell('§cYou must type a players name to unban')
        if (!getPlayer) return sender.tell(`§cThe player ${player} §r§cisnt banned`);
        sender.tell(`§cYou have unbanned the player ${player}`)
        this.database.delete(player)
    }

    banview(sender, player) {
        if (!player) return sender.tell('§cYou must type a banned players name to view')
        if (!this.database.has(player)) return sender.tell('§cYou must type a players name that is banned')
        const Data = this.database.read(player)
        let text = '\n'
        text += `§cName: ${Data.name} \n§r§cBanned by: ${Data.by} \n§r§cBanned at: ${Data.date} \n§r§cReason: ${Data.reason}`
        sender.tell(`§cViewing the banned player ${player}:${text}`)
    }

    banlist(sender) {
        sender.tell(`§c----------------\nBanned Players:${this.database.allKeys()}\n§c----------------`)
    }
}