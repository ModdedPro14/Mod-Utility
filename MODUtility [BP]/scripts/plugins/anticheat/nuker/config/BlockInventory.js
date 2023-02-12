import { BlockInventoryComponentContainer } from "@minecraft/server";

export class BlockInventory {

  constructor(inventory) {
    this.emptySlotsCount = inventory.emptySlotsCount;
    this.size = inventory.size;
    this.items = [];
    for (let i = 0; i < this.size; i++) {
      this.items[i] = inventory.getItem(i);
    }
  }

  load(block = BlockInventoryComponentContainer) {
    for (let i = 0; i < block.size; i++) {
      if (!this.items[i]) continue;
      block.setItem(i, this.items[i]);
    }
  }
}
