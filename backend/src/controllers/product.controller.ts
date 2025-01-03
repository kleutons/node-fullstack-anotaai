import { Request, Response } from "express";
import { ProductService } from "../services/product/product.service";
import { HttpError } from "../errors/http-error";
import { ProductCreateModel } from "../models/product.model";

export class ProductController{

    private service: ProductService;

    constructor(){
        this.service = new ProductService();
    }

    public async listAll(req:Request, res:Response){
        try{
            const result = await this.service.listAll();
            res.status(200).json(result);    
        }catch(err){
            res.status(500).json({error:'Failed to list' }) 
        }
    }

    public async listByOwnerId(req:Request, res:Response){
        const { ownerId } = req.params;
        try{
            const result = await this.service.listByOwnerId(ownerId);
            res.status(200).json(result);    
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})
            res.status(500).json({error:'Failed to list' }) 
        }
    }

    public async create(req:Request, res:Response){
        const user = req.body as ProductCreateModel;

        try{    
            const result = await this.service.create(user);
            res.status(201).json(result);
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to create' }) 
        }
    }


    public async update(req:Request, res:Response){
        const user = req.body as ProductCreateModel;
        const {id} = req.params;

        try{
            const result = await this.service.update(id, user);
            res.status(200).json(result);
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})
            
            res.status(500).json({error:'Failed to update' }) 
        }
    }

    public async delete(req:Request, res:Response){
        const {id} = req.params;

        try{
            await this.service.delete(id);
            res.status(204).send();
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to delete' }) 
        }

    }
}