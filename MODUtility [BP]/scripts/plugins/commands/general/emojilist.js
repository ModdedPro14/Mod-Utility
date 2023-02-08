import { world } from "@minecraft/server";
import { Command } from "../../../management/CommandHandler/CommandHandler.js";

Command.register({
    name: "emojilist",
    description: "Lists all the emojis that are available",
    aliases: [],
}, (data) => {
    data.player.tell('§c---------------------\nHere\'s a list of all of the emojis:\n:smiley: ,\n:grimacing: ,\n:grin: ,\n:joy:: ,\n:smile: ,\n:sweat_smile: ,\n:laughing: ,\n:innocent: ,\n:wink: ,\n:blush: ,\n:slight_smile: ,\n:upside_down: ,\n:relaxed: ,\n:yum: ,\n:relieved: ,\n:heart_eyes: ,\n:kissing_heart: ,\n:kissing: ,\n:kissing_smiling_eyes: ,\n:kissing_closed_eyes: ,\n:stuck_out_tongue_winking_eye: ,\n:stuck_out_tongue_closed_eyes: ,\n:stuck_out_tongue: ,\n:money_mouth: ,\n:sunglasses: ,\n:smirk: ,\n:no_mouth: ,\n:neutral_face: ,\n:expressionless: ,\n:unamused: ,\n:rolling_eyes: ,\n:flushed: ,\n:disappointed: ,\n:worried: ,\n:angry: ,\n:rage: ,\n:pensive: ,\n:confused: ,\n:slight_frown: ,\n:frowning2: \n---------------------')
});
