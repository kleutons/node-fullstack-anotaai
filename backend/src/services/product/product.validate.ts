import { HttpError } from "../../errors/http-error";
import { HttpStatusCodes } from "../../errors/http-status-codes";
import { ProductCreateModel } from "../../models/product.model";
import isValidId from "../../utils/valid.id";
import { CategoryrService } from "../category/category.service";
import { UserService } from "../user.service";

export async function productValidate(data:Partial<ProductCreateModel>, isUpdate:boolean = false){
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