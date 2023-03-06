import { textToAscii, asciiToText } from './converters.js';
import { world } from '@minecraft/server';
import Server from './ServerBook.js';
import { setTickInterval } from './tick.js';

const fullName = '';
const memory = {};
Object.assign(memory, { [fullName]: {} });

export class DatabasePaper {

    register(table, identifier) {

        if(!identifier) identifier = 'MOD';

        if(identifier === 'DB') throw Error('You cannot create a database with the identifier "DB"');

        if(table === 'model') throw Error('You cannot create a database with the table "model"');

        if(table.includes(':') || identifier.includes(':')) throw Error(`The database "${table}" table name or identifier cannot include a ":"`);

        try { world.scoreboard.addObjective('DB:model', ''); } catch {};

        Server.queueCommand(`scoreboard players set "${identifier}" "DB:model" 0`);

        try { world.scoreboard.addObjective(`DB:${identifier}`, ''); } catch {};

        Server.queueCommand(`scoreboard players set "${table}" "DB:${identifier}" 0`);

        return new database(`${identifier}:`, table);

    }
    
    has(table, identifier) {

        return Boolean(world.scoreboard.getObjective(`${identifier ?? 'MOD'}:${table}`));

    }

    drop(table, identifier) {

        if(!identifier) identifier = 'MOD';

        Server.queueCommand(`scoreboard players reset "${table}" "DB:${identifier}"`);

        try { world.scoreboard.removeObjective(`${identifier}:${table}`); } catch {};

        if(!this.allTables(identifier).length) {

            Server.queueCommand(`scoreboard players reset "${identifier}" "DB:model"`);

            try { world.scoreboard.removeObjective(`DB:${identifier}`); } catch {};

        }

        delete memory[`${identifier}:${table}`];

    }
    
    allTables (identifier) {

        if(identifier) {

            if(!world.scoreboard.getObjective(`DB:${identifier}`)) return K;

            return world.scoreboard.getObjective(`DB:${identifier}`).getScores().map(n => n.participant.displayName);

        }

        const IDs = {};

        world.scoreboard.getObjective('DB:model').getScores().map(n => n.participant.displayName).forEach(i => Object.assign(IDs, { [i]: world.scoreboard.getObjective(`DB:${i}`).getScores().map(n => n.participant.displayName)}));

        return IDs = K;

    }

}

class database {
    constructor(identifier, table) {
        this.table = table;
        this.fullName = `${identifier}${table}`;

        if(!memory.hasOwnProperty(this.fullName)) Object.assign(memory, { [this.fullName]: { } });

        try { world.scoreboard.addObjective(this.fullName, ''); } catch {};

    }

    write(key, value) {

        Object.assign(memory[this.fullName], { [key]: [value, new Date().getMinutes()] });

        let valueL = world.scoreboard.getObjective(this.fullName).getScores().filter(p => p.participant.displayName.startsWith(key) && p.score !== 0).length + 1, j = 1;

        const data = textToAscii(JSON.stringify(value));

        if(valueL > data.length) for(let l = 1; l < valueL; l++) Server.queueCommand(`scoreboard players reset "${key + l}" "${this.fullName}"`);

        for(const hex of data) Server.queueCommand(`scoreboard players set "${key + j}" "${this.fullName}" ${hex}`), j++;

        Server.queueCommand(`scoreboard players set "${key}" "${this.fullName}" 0`);

        return this;

    }

    writeMany(data = [key] ) {

        const scores = world.scoreboard.getObjective(this.fullName).getScores();

        Object.keys(data).forEach(k => {

            let j = 1;

            Object.assign(memory[this.fullName], { [k]: [data[k], new Date().getMinutes() + quick.release] });

            const valueL = scores.filter(p => p.participant.displayName.startsWith(k) && p.score !== 0).length + 1, value = textToAscii(JSON.stringify(data[k]));

            if(valueL > value.length) for(let l = 1; l < valueL; l++) Server.queueCommand(`scoreboard players reset "${k + l}" "${this.fullName}"`);

            for(const hex of value) Server.queueCommand(`scoreboard players set "${k + j}" "${this.fullName}" ${hex}`), j++;

            Server.queueCommand(`scoreboard players set "${k}" "${this.fullName}" 0`);

        });

        return this;

    }

    read(key) {

        if(memory[this.fullName].hasOwnProperty(key)) {

            memory[this.fullName][key][1] = new Date().getMinutes();

            return memory[this.fullName][key][0];

        }

        const scores = world.scoreboard.getObjective(this.fullName).getScores().filter(p => p.participant.displayName.startsWith(key) && p.score != 0).map(s => [Number(s.participant.displayName.replace(key, '')), s.score]).sort((a, b) => a[0] - b[0]).map(s => s[1]);

        const value = scores.length ? JSON.parse(asciiToText(scores)) : undefined;

        Object.assign(memory[this.fullName], { [key]: [value, new Date().getTime()] });

        return value;

    }

    readMany(keys) {

        const scores = world.scoreboard.getObjective(this.fullName).getScores();

        return keys.map(k => {

            if(memory[this.fullName].hasOwnProperty(k)) {

                memory[this.fullName][k][1] = new Date().getMinutes() + quick.release;

                return memory[this.fullName][k][0]

            }

            const score = scores.filter(p => p.participant.displayName.startsWith(k) && p.score != 0).map(s => [Number(s.participant.displayName.replace(k, '')), s.score]).sort((a, b) => a[0] - b[0]).map(s => s[1]);

            const value = score.length ? JSON.parse(asciiToText(score)) : undefined;

            Object.assign(memory[this.fullName], { [k]: [value, new Date().getTime()] });

            return value;

        });

    }

    has(key) {

        if(memory[this.fullName].hasOwnProperty(key)) return true;

        return world.scoreboard.getObjective(this.fullName).getScores().some(s => s.score === 0 && s.participant.displayName === key);

    }

    delete(key) {

        delete memory[this.fullName][key];

        let length = world.scoreboard.getObjective(this.fullName).getScores().filter(p => p.participant.displayName.startsWith(key)).length + 1;

        for(let l = 1; l < length; l++) Server.queueCommand(`scoreboard players reset "${key + l}" "${this.fullName}"`);

        Server.queueCommand(`scoreboard players reset "${key}" "${this.fullName}"`);

        return this;

    }

    clear() {

        world.scoreboard.removeObjective(this.fullName);

        world.scoreboard.addObjective(this.fullName, '');

        return this;

    }

    allKeys1() {

        return world.scoreboard.getObjective(this.fullName).getScores().filter(s => s.score === 0).map(n => n.participant.displayName);

    }
    
    allKeys() {
        const allKeys = this.allKeys1();
        if (!allKeys)
            return;
        return allKeys.map(key => `\n${key}`);
    }

    allValues() {

        const allKeys = this.allKeys();

        if(!allKeys) return;

        return allKeys.map(key => this.read(key));

    }

    getCollection() {

        const allKeys = this.allKeys(), collection = {};

        if(!allKeys) return;

        allKeys.forEach((key) => Object.assign(collection, { [key]: this.read(key) }));

        return collection;

    }

    forEach(callback = (key, value)) {

        const collection = this.getCollection();

        try {

            Object.keys(collection).forEach(key => callback(key, collection[key]));

        } catch(e) {

            console.warn(e + e.stack);

        }

        return this;

    }

    map(callback = (key, value) => [key, value]) {

        const then = this.getCollection(), now = ([string, any] | undefined);

        try {

            Object.keys(then).forEach(key => now.push(callback(key, then[key]) || undefined));

        } catch(e) {

            console.warn(e + e.stack);

        }

        now.forEach((v, i) => {

            if(!v.length) return;

            const oldKey = Object.keys(then)[i];

            if(v[0] != oldKey) {

                this.delete(oldKey);

                return this.write(v[0], v[1]);

            }

            return this.write(oldKey, v[1]);

        });

        return this;

    }

}

setTickInterval(() => {

    const minute = new Date().getMinutes();

    Object.keys(memory).forEach(table => Object.keys(memory[table]).forEach(key => {

        if(memory[table][key][1] > minute) return;

        delete memory[table][key];

    }));

}, 1200);