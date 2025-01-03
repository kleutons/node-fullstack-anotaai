import { Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { HttpError } from "../errors/http-error";

export class CatalogController{

    private service: CatalogService;

    constructor(){
        this.service = new CatalogService();
    }

    public async list(req:Request, res:Response){
        const { ownerId } = req.params;

        try{
            const result = await this.service.getCatalog(ownerId);
            res.status(200).json(result);    
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to list' }) 
        }
    }



}