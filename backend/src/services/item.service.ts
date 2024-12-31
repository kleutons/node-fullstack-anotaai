import { DatabaseMemory } from "../data/database-memory";
import { ItemCreateModel, ItemModel } from "../models/items.model";
import { HttpStatusCodes } from "../errors/http-status-codes";
import { HttpError } from "../errors/http-error";



export class ItemService {
    private static database = new DatabaseMemory();

    public async list(search?:string) {
        return ItemService.database.list(search);
    }


    public async getById(id?:string): Promise<ItemModel>{
        if(!id)
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Id");

        const item = ItemService.database.getById(id) as ItemModel; 
        if (!item)
            throw new HttpError(HttpStatusCodes.ERRO_NOT_FOUND, "Item");
        return item;
    }

    public async post(item:ItemCreateModel) {
        ItemService.database.create({
            name: item.name
        });

        console.log(ItemService.database.list());
    }

    public async put(item: ItemModel) {
        // Check item
        await this.getById(item.id); 

        ItemService.database.update(item.id, { name: item.name });

        console.log(ItemService.database.list());
    }

    public async delete(id: string) {
        // Check item
        await this.getById(id); 
        ItemService.database.delete(id);
    }
}