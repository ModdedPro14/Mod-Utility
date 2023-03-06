import { system } from '@minecraft/server'

console.warn('Cancel watch dog termination has been loaded')
system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true
});