import { world } from "@minecraft/server";

const tickIntervalMap = new Map();
let tickIntervalID = 0;
let totalTick = 0
world.events.tick.subscribe(() => {
    totalTick++;
    for (const [, tickInterval] of tickIntervalMap) {
        if (totalTick % tickInterval.tick === 0)
            tickInterval.callback(...tickInterval.args);
    }
});

export const setTickInterval = (handler, timeout, ...args) => {
    const tickInterval = { callback: handler, tick: timeout, args };
    tickIntervalID++;
    tickIntervalMap.set(tickIntervalID, tickInterval);
    return tickIntervalID;
};