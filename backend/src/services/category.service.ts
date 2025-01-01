import { HttpError } from "../errors/http-error";
import { HttpStatusCodes } from "../errors/http-status-codes";
import { CategoryCreateModel, CategoryModel } from "../models/category.model";
import prismaRepository from "../repositories";
import { UserService } from "./user.service";


export class CategoryrService{

    private repository;

    constructor(){
        this.repository = prismaRepository.category;
    }

    async listAll(){
        const result = await this.repository.findMany();
        return result;
    }

    private  async validate(data:Partial<CategoryCreateModel>, isUpdate:boolean = false){
        const requiredFields: Array<keyof CategoryCreateModel> = !isUpdate ? ["title", "ownerId", "description"] : [];
        
        for(const field of requiredFields){
            if(!data[field]){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, `Field ${field} is mandatory!`);
            }
        }

        if(data.ownerId){
            if(data.ownerId.length !== 24){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Owner ID Inválido!");
            }else{
                const checkUser = await new UserService().userExists(data.ownerId);
                if(!checkUser){
                   throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Owner ID Not Found!");
                } 
                    
            }
        }
    }


    private async findById(id:string):Promise<CategoryModel | null>{
        const result = await this.repository.findFirst({
            where:{
                id
            }
        })
        return result;
    }

    async create(data:CategoryCreateModel){
        await this.validate(data);

        const result = await this.repository.create({
            data:{
                title:       data.title,
                ownerId:     data.ownerId,
                description: data.description
            }
        })

        return result;
    }


    async update(id:string, data: Partial<CategoryCreateModel>){
        await this.validate(data);

        const dataToUpdate: Partial<CategoryCreateModel> = {};

        const keys = Object.keys(data) as Array<keyof CategoryCreateModel>;

        //Data update
        for(const key of keys ){
            if(data[key] !== undefined && data[key] !== null){
                dataToUpdate[key] = data[key] as any;
            }
        }

        const result = await this.repository.update({
            where:{
                id
            },
            data: dataToUpdate
            
        })

        return result;
    }

    async delete(id:string){
        if(id == "") throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid Id!");

        if(!await this.findById(id)) throw new HttpError(HttpStatusCodes.ERRO_NOT_FOUND, "User Not Found!");

        await this.repository.delete({
            where:{
                id
            }
        })

        return { message: "Successfully Deleted!"}
    }
}