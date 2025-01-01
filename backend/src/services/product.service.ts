import { HttpError } from "../errors/http-error";
import { HttpStatusCodes } from "../errors/http-status-codes";
import { ProductCreateModel, ProductModel } from "../models/product.model";
import prismaRepository from "../repositories";
import isValidId from "../utils/valid.id";
import { CategoryrService } from "./category.service";
import { UserService } from "./user.service";


export class ProductService{

    private repository;

    constructor(){
        this.repository = prismaRepository.product;
    }

    private  async validate(data:Partial<ProductCreateModel>, isUpdate:boolean = false){
        const requiredFields: Array<keyof ProductCreateModel> = !isUpdate ? ["title", "ownerId", "categoryId", "price", "description"] : ["ownerId"];

        for(const field of requiredFields){
            if(!data[field]){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, `Field ${field} is mandatory!`);
            }
        }

        //Check OwnerId
        if(data.ownerId){
            if(!isValidId(data.ownerId)){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Owner ID Inválido!");
            }else{
                const checkUser = await new UserService().userExists(data.ownerId);
                if(!checkUser){
                   throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Owner ID Not Found!");
                } 
            }
        }

        //Check CategoryId
        if(data.categoryId && data.ownerId){
            if(!isValidId(data.categoryId)){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid Category ID!");
            }else{
                const checkUser = await new CategoryrService().isExists(data.categoryId, data.ownerId);
                if(!checkUser){
                   throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Category ID Not Found!");
                } 
            }
        }
    }

    async listAll(){
        const result = await this.repository.findMany();
        return result;
    }

    async listByOwnerId(ownerId:string){
        
        if(!isValidId(ownerId)){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid ID!");
        }

        const result = await this.repository.findMany({
            where:{
                ownerId
            }
        });
        return result;
    }

    private async findById(id:string):Promise<ProductModel | null>{
        const result = await this.repository.findFirst({
            where:{
                id
            }
        })
        return result;
    }

    async create(data:ProductCreateModel){
        await this.validate(data);

        const result = await this.repository.create({
            data: data
        })

        return result;
    }


    async update(id:string, data: Partial<ProductCreateModel>){
        await this.validate(data, true);

        const dataToUpdate: Partial<ProductCreateModel> = {};

        const keys = Object.keys(data) as Array<keyof ProductCreateModel>;

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