import { NextFunction, Request, Response } from "express";
import { ItemService } from "../services/item.service";
import { ItemCreateModel, ItemIdModel, ItemModel } from "../models/items.model";
import { HttpError } from "../errors/http-error";

export class itemController {

    private service: ItemService;
    
    constructor() {
        this.service = new ItemService();
    }

    public async list(req:Request, res:Response, next: NextFunction){
        const {search} = req.query as {search?: string};

        try{
            const result = await this.service.list(search); 
            res.status(200).json(result);
        }catch(err){
            next(err)
        }
    }

    public async post(req:Request, res:Response){
        const item = req.body as ItemCreateModel;
        try{
            const result = await this.service.post(item);
            res.status(201).json(result);
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to create item' })            
        }
    }

    public async put(req:Request, res:Response){
        try{
            const id = req.params.id as string;
            const item = req.body as ItemCreateModel;
            const itemUpdate: ItemModel = { id, ...item}
            
            const result = await this.service.put(itemUpdate); 
            res.status(200).json(result);
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to create item' }) 
        }
    }

    public async delete(req:Request, res:Response){
        const id = req.params.id as string;

        try{
            await this.service.delete(id);
            res.status(204).send();
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to create item' }) 
        }
    }
}