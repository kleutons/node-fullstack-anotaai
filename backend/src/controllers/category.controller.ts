import { Request, Response } from "express";
import { CategoryrService } from "../services/category.service";
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

    public async create(req:Request, res:Response){
        const user = req.body as CategoryCreateModel;

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