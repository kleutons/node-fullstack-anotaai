import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserCreateModel } from "../models/user.model";
import { HttpError } from "../errors/http-error";

export class UserController{

    private service: UserService;

    constructor(){
        this.service = new UserService();
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
        const user = req.body as UserCreateModel;

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
        const user = req.body as UserCreateModel;
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
        const id = req.params.id;
        console.log('delete');
        console.log(id);

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