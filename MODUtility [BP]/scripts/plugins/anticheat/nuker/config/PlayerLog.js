import { Player, world } from "@minecraft/server";

export class PlayerLog {

  static data = null;

  constructor() {
    this.data = new Map();
    this.events = {
      playerLeave: world.events.playerLeave.subscribe((data) =>
        this.data.delete(data.playerName)
      ),
    };
  }

  set(player, value) {
    this.data.set(player.name, value);
  }

  get(player) {
    return this.data.get(player.name);
  }

  delete(player) {
    this.data.delete(player.name);
  }

  clear() {
    this.data.clear()
  }

  playerNames() {
    return this.data.keys();
  }
}
