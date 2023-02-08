import { world, system } from "@minecraft/server"
import main, { emj, getMaxHealth } from "../../config/main.js";

const tag = "rank:",
      multirankSign = "§r§8][§r",
      first_rank = ["§6Member"],
      getEntityTagByPrefixs = (entity, tag) => entity?.getTags().filter(v => v.startsWith(tag))?.map(v => v.replace(tag, "")) ?? [];

system.runSchedule(() => {
    world.getAllPlayers().forEach((player) => {
        const health = player.getComponent("health")
        let rank = getEntityTagByPrefixs(player, tag);
        (rank.length >= 1) ? null: (rank = first_rank);
        const nicknameTag = player.getTags().find(tag => tag.startsWith('nickname:'))
        const nickname = nicknameTag?.replace('nickname:', '');
        player.nameTag = `§r§8[§r${rank?.join(multirankSign)}§r§8]§r ${nickname ?? player.name})}\n§c${Math.round(health.current) / 2} §6/§a ${getMaxHealth(player) / 2}`;        
    });
}, 8);

function getRanks(player) {
  const ranks = player
    .getTags()
    .map((v) => {
      if (!v.startsWith(tag)) return null;
      return v.substring(tag.length);
    })
    .filter((x) => x);
  return ranks.length == 0 ? [first_rank] : ranks;
}

world.events.beforeChat.subscribe((data) => {
  data.sendToTargets = true;
  data.targets = [];
  if (data.sender.hasTag('mute')) return;
  if (data.message.startsWith(main.prefix)) return;
  let message = data.message;
  const nicknameTag = data.sender.getTags().find(tag => tag.startsWith('nickname:'))
  const nickname = nicknameTag?.replace('nickname:', '');
  const ranks = getRanks(data.sender).join("§r§8][§r");
  world.say(`§r§8[§r${ranks}§r§8] §r${nickname ?? data.sender.name}§r§7 ${new Date().toLocaleTimeString().replace('-', 1)}§l§6 >>§r ${message = Object.keys(emj).forEach(key => message = message.replaceAll(key, emj[key])) ?? message}`);
});