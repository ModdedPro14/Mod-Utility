import { world } from '@minecraft/server';

export class scoreboard {
    
    get(player, objective) {
        try {
            return world.scoreboard.getObjective(objective).getScore(player.scoreboard);
        } catch { 
            return 0;
        }
    }

    set(player, objective, value = 0, updateId) {
        try {
            world.scoreboard.setScore(world.scoreboard.getObjective(objective), player.scoreboard, value);
            if (!updateId) return value;
            const scoreboardObjectiveDisplayOptions = world.scoreboard.getObjectiveAtDisplaySlot(updateId);
            if (scoreboardObjectiveDisplayOptions.objective.id !== objective) return value;
            world.scoreboard.clearObjectiveAtDisplaySlot(updateId);
            world.scoreboard.setObjectiveAtDisplaySlot(updateId, scoreboardObjectiveDisplayOptions);
            return value;
        } catch { }
    }
    
    add(player, objective, value = 0, updateId) {
        const score = this.get(player, objective) ?? 0;
        return this.set(player, objective, score + value, updateId);
    }

    reset(player, objective) {
        try {
            return world.scoreboard.getObjective(objective).removeParticipant(player.scoreboard);
        } catch {
            return false;
        }
    }
};