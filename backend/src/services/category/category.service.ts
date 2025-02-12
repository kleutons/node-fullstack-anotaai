import { CategoryCache } from "../../data/category.cache";
import { HttpError } from "../../errors/http-error";
import { HttpStatusCodes } from "../../errors/http-status-codes";
import { CategoryCreateModel, CategoryModel } from "../../models/category.model";
import prismaRepository from "../../repositories";
import isValidId from "../../utils/valid.id";
import { categoryValidate, productsInCategoryId } from "./category.validate";


export class CategoryService{
    private repository;
    private cache;

    constructor(){
        this.repository = prismaRepository.category;
        this.cache  = CategoryCache.getInstance();
    }

    async listAll():Promise<CategoryModel[]>{
        const result = await this.repository.findMany();
        return result;
    }

    async listByOwnerId(ownerId:string, orderAsc?:boolean ):Promise<CategoryModel[]>{

        if(!isValidId(ownerId)){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid ID!");
        }

        try{
            const result = await this.repository.findMany({
                where:{
                    ownerId
                },
                orderBy:{
                    id: orderAsc? 'asc' : 'desc'
                }
            });
            //UPDATE CACHE
            setImmediate(() => this.updateCacheAllCategory());
            return result;
        }catch(err){
            console.log(err);
            return [];
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
    
    public async isExists(id:string, ownerId: string):Promise<Boolean>{
        const result = await this.repository.findFirst({
            where:{
                AND:[
                    {id},
                    {ownerId}
                ]
            }
        })
        return result ? true : false;
    }

    async create(data:CategoryCreateModel){
        await categoryValidate(data);

        const result = await this.repository.create({
            data:{
                title:       data.title,
                ownerId:     data.ownerId,
                description: data.description
            }
        })

        //UPDATE CACHE
        setImmediate(() => this.updateCacheAllCategory());
        return result;
    }


    async update(id:string, data: Partial<CategoryCreateModel>){
        await categoryValidate(data);

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

        //UPDATE CACHE
        setImmediate(() => this.updateCacheAllCategory());
        return result;
    }

    async delete(id:string, ownerId?:string){

        if(!isValidId(id))
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid ID!");
        
        const category = await this.findById(id);

        if(!category)
            throw new HttpError(HttpStatusCodes.ERRO_NOT_FOUND, "Category Not Found!");
        

        if(category.ownerId !== ownerId)
            throw new HttpError(HttpStatusCodes.ERRO_FORBIDDEN, "Forbidden: You don't have the required permissions.");
      
        if(await productsInCategoryId(category.id))    
            throw new HttpError(HttpStatusCodes.ERRO_NOT_FOUND, "This Category has registered products!");  
        
        await this.repository.delete({
            where:{
                id
            }
        })

        //UPDATE CACHE
        setImmediate(() => this.updateCacheAllCategory());
        return { message: "Successfully Deleted!"}
    }

    private async updateCacheAllCategory(){
        const listData = await this.listAll();
        const data: CategoryModel[] = listData ? listData : [];
        
        //UPDATE CACHE
        this.cache.updateAllCategory(data);
    }
}