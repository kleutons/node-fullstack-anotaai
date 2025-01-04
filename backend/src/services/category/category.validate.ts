import { HttpError } from "../../errors/http-error";
import { HttpStatusCodes } from "../../errors/http-status-codes";
import { CategoryCreateModel } from "../../models/category.model";
import isValidId from "../../utils/valid.id";
import { UserService } from "../user.service";

export async function categoryValidate(data:Partial<CategoryCreateModel>, isUpdate:boolean = false){
    const requiredFields: Array<keyof CategoryCreateModel> = !isUpdate ? ["title", "ownerId", "description"] : ["ownerId"];
            
    for(const field of requiredFields){
        if(!data[field]){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, `Field ${field} is mandatory!`);
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