import { ProductCache } from "../../data/product.cache.";
import { HttpError } from "../../errors/http-error";
import { HttpStatusCodes } from "../../errors/http-status-codes";
import { ProductCreateModel, ProductModel } from "../../models/product.model";
import prismaRepository from "../../repositories";
import isValidId from "../../utils/valid.id";
import { productValidate } from "./product.validate";

export class ProductService{

    private repository;
    private cache;

    constructor(){
        this.repository = prismaRepository.product;
        this.cache   = ProductCache.getInstance();        
    }

    async listAll(){
        const result = await this.repository.findMany();
        return result;
    }

    
    async listByOwnerAndCategoryId(ownerId:string, categoryId?: string, orderAsc?: boolean){
        
        const whereClause: any = {AND:[]};

        if(isValidId(ownerId)){
            whereClause.AND.push({ ownerId: ownerId });
        }
        
        if (categoryId) {
            if (!isValidId(categoryId)) {
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid Category Id!");
            }
            whereClause.AND.push({ categoryId: categoryId });
        }

        try{
            const result = await this.repository.findMany({
                where: whereClause,
                orderBy:{
                    id: orderAsc? 'asc' : 'desc'
                }
            });
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
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
        await productValidate(data);

        const result = await this.repository.create({
            data: data
        })

        //UPDATE CACHE
        setImmediate(() => this.cache.addOrUpdate(result));
        return result;
    }


    async update(id:string, data: Partial<ProductCreateModel>){
        await productValidate(data, true);

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

        //UPDATE CACHE
        setImmediate(() => this.cache.addOrUpdate(result));
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

        //UPDATE CACHE
        setImmediate(() => this.cache.delete(id));
        return { message: "Successfully Deleted!"}
    }
}