import { randomUUID } from "crypto";

interface Item {
    id?: string;
    name: string;
}

export class DatabaseMemory {
    #items: Map<string, Item> = new Map();

    list(search?: string): Item[] {
        const itemsArray = Array.from(this.#items.values());

        if (!search) { return itemsArray; }

         // Filtrar itens by nome
         return itemsArray.filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()));
    }

    getById(id:string): Item | undefined{
        return this.#items.get(id);       
    }

    create(item: Omit<Item, "id">): void {
        const itemId = randomUUID();
        const newItem = { ...item, id: itemId };
        this.#items.set(itemId, newItem);
    }

    update(id: string, item: Partial<Omit<Item, "id">>): void {
        const existingItem = this.#items.get(id);
        if (existingItem) {
            const updatedItem = { ...existingItem, ...item, id }; // Keep the same id
            this.#items.set(id, updatedItem);
        }
    }

    delete(id: string): void {
        this.#items.delete(id);
    }
}