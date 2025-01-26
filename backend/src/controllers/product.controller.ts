import { Request, Response } from "express";
import { ProductService } from "../services/product/product.service";
import { HttpError } from "../errors/http-error";
import { ProductCreateModel } from "../models/product.model";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

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
        if(req.user !== undefined){
            const ownerId = req.user?.id ?? '';
            try{
                const result = await this.service.listByOwnerAndCategoryId(ownerId);
                res.status(200).json(result);    
            }catch(err){
                if(err instanceof HttpError)
                    return res.status(err.statusCode).json({error: err.message})
                res.status(500).json({error:'Failed to list' }) 
            }
        }else{
            res.status(500).json({error:'Invalid ownerId!' }) 
        }
        
    }

    public async create(req:Request, res:Response){
        const data = req.body as ProductCreateModel;
        data.ownerId = req.user?.id ?? '';

        try{    
            const result = await this.service.create(data);
            res.status(201).json(result);
        }catch(err){
            
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})
            
            if(err instanceof PrismaClientValidationError)
                console.log(err.message);

            res.status(500).json({error:'Failed to create' }) 
        }
    }


    public async update(req:Request, res:Response){
        const data = req.body as ProductCreateModel;
        data.ownerId = req.user?.id ?? '';
        const {id} = req.params;

        try{
            const result = await this.service.update(id, data);
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