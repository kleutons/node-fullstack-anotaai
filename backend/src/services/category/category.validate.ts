import { HttpError } from "../../errors/http-error";
import { HttpStatusCodes } from "../../errors/http-status-codes";
import { CategoryCreateModel } from "../../models/category.model";
import prismaRepository from "../../repositories";
import isValidId from "../../utils/valid.id";
import { UserService } from "../user.service";

export async function categoryValidate(data:Partial<CategoryCreateModel>){
    
    const requiredFields: Array<keyof CategoryCreateModel> = [
            "title",
            "ownerId",
            "description",
        ];
    
    for (const field of requiredFields) {
        let value = data[field];
        if (typeof value === 'string') {
            // Remove espaços em branco do início e do fim
            value = value.trim();
            data[field] = value;
        }
        if (!value || value === '') {
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, `Field ${field} is mandatory and cannot be empty!`);
        }
    }
    

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
}

export async function productsInCategoryId(categoryId:string) {
    const isProduct = await prismaRepository.product.findFirst({
        where:{
            categoryId
        }
    });
    
    return isProduct ? true : false;
}