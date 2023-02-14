import { world } from '@minecraft/server';
import { setTickInterval } from './tick.js';

const commandQueue = [];
setTickInterval(() => {
    if (!commandQueue.length)
        return;
    const hundred = commandQueue.slice(0, 100);
    commandQueue.splice(0, 100);
    for (let i = 0; i < 100; i++) {
        if (!hundred[i])
            return;
        world.getDimension(hundred[i][1] ?? 'overworld').runCommandAsync(hundred[i][0]).catch();
    }
}, 5);

export class ServerPaper {

    queueCommand(command, dimension) {
        commandQueue.push(dimension ? [command, dimension] : [command]);
    }

    async runCommand(command, dimension) {
        let value = '';
        await world.getDimension(dimension ?? 'overworld').runCommandAsync(command).catch(e => value = e);
        return value;
    }
}