import { world } from "@minecraft/server";
import { Database } from "../management/Database/Database.js";

const main = {
    prefix: '!'
}
export const emj = {
      ':smiley:': '',
      ':grimacing:': '', 
      ':grin:': '', 
      ':joy:': '', 
      ':smile:': '',
      ':sweat_smile:': '', 
      ':laughing:': '', 
      ':innocent:': '',
      ':wink:': '',
      ':blush:': '', 
      ':slight_smile:': '', 
      ':upside_down:': '', 
      ':relaxed:': '',
      ':yum:': '',
      ':relieved:': '', 
      ':heart_eyes:': '',
      ':kissing_heart:': '',
      ':kissing:': '',
      ':kissing_smiling_eyes:': '',
      ':kissing_closed_eyes:': '',
      ':stuck_out_tongue_winking_eye:': '',
      ':stuck_out_tongue_closed_eyes:': '',
      ':stuck_out_tongue:': '',
      ':money_mouth:': '', 
      ':sunglasses:': '', 
      ':smirk:': '', 
      ':no_mouth:': '', 
      ':neutral_face:': '',
      ':expressionless:': '',
      ':unamused:': '',
      ':rolling_eyes:': '', 
      ':flushed:': '', 
      ':disappointed:': '', 
      ':worried:': '', 
      ':angry:': '',
      ':rage:': '', 
      ':pensive:': '', 
      ':confused:': '',
      ':slight_frown:': '', 
      ':frowning2:': ''
   };
export default main;
export const jail = Database.register('jail');
export const spawn = Database.register('spawn');
export const kit = Database.register('kit')
export const ban = Database.register('ban')
export const teams = Database.register('teams')
export const adminTag = "skummeh";
export const trustTag = "trusted";
export function setLore(player, lore = []) {
    const container = player.getComponent("inventory").container,
    item = container.getItem(player.selectedSlot);
    if (!item) return player.tell('§cYou must hold an item')
    item.setLore(lore);
    container.setItem(player.selectedSlot, item);
}
export function setNameTag(player, nameTag = []) {
    const container = player.getComponent("inventory").container,
    item = container.getItem(player.selectedSlot);
    if (!item) return player.tell('§cYou must hold an item')
    item.nameTag = nameTag
    container.setItem(player.selectedSlot, item);
}

export function getMaxHealth(player) {
    const healthComp = player.getComponent("health"), old = healthComp.current
    healthComp.resetToMaxValue()
    const health = healthComp.current
    healthComp.setCurrent(old)
    return health
}

world.events.tick.subscribe(() => {
    for (const plr of world.getPlayers()) {
        plr.runCommandAsync('gamerule sendcommandfeedback false')
        if (plr.hasTag('freeze')) {
            plr.teleport(plr.location, plr.dimension, plr.rotation.x, plr.rotation.y)
      }
   }
});
world.events.beforeChat.subscribe(data => {
    const plr = data.sender
    if (plr.hasTag('mute')) {
        data.cancel = true
        plr.tell('§cYou can\'t send messages since your muted')
    }
});