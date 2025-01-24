import { Request, Response } from "express";
import { CategoryrService } from "../services/category/category.service";
import { HttpError } from "../errors/http-error";
import { CategoryCreateModel } from "../models/category.model";

export class CategoryController{

    private service: CategoryrService;

    constructor(){
        this.service = new CategoryrService();
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
                const result = await this.service.listByOwnerId(ownerId);
                res.status(200).json(result);    
            }catch(err){
                res.status(500).json({error:'Failed to list' }) 
            }
        }else{
            res.status(500).json({error:'Invalid ownerId!' }) 
        }
    }

    public async create(req:Request, res:Response){
        const user = req.body as CategoryCreateModel;
        user.ownerId = req.user?.id ?? '';

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
        const user = req.body as CategoryCreateModel;
        user.ownerId = req.user?.id ?? '';
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
        const ownerId = req.user?.id;

        try{
            await this.service.delete(id, ownerId);
            res.status(204).send();
        }catch(err){
            console.log(err);
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to delete' }) 
        }

    }
}