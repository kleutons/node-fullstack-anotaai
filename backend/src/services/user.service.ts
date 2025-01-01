import { HttpError } from "../errors/http-error";
import { HttpStatusCodes } from "../errors/http-status-codes";
import { UserCreateModel, UserModel } from "../models/user.model";
import prismaRepository from "../repositories";
import bcrypt from 'bcrypt';


export class UserService{

    private repository;

    constructor(){
        this.repository = prismaRepository.user;
    }

    async listAll(){
        const users = await this.repository.findMany();
        return users;
    }

    private  async validateUser(user:Partial<UserCreateModel>, isUpdate:boolean = false){
        const requiredFields: Array<keyof UserCreateModel> = !isUpdate ? ["name", "storeId", "email", "password"] : [];
        
        for(const field of requiredFields){
            if(!user[field]){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, `Field ${field} is mandatory!`);
            }
        }

        const storeIdRegex = /^[a-z0-9.-]+$/; 
        if (!isUpdate && user.storeId && !storeIdRegex.test(user.storeId)) {
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Store ID must be lowercase letters, numbers, dots, or hyphens, with no spaces!");
        }

        if(user.storeId && await this.findByStoreIdOrEmail(user.storeId)){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Store ID already exists!");
        }

        if(user.email && await this.findByStoreIdOrEmail(user.email)){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Email already used!");
        }
    }

    private async validateAndEncryptPassword( pass: string){

        if(pass.length < 6){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Password must be at least 6 characters long!");
        } 

        return await bcrypt.hash(pass, 10);
    }

    private async findByStoreIdOrEmail(value:string):Promise<Boolean>{
        const lowercasedValue = value.toLowerCase();

        const result = await this.repository.findFirst({
            where:{
                OR:[
                    { storeId: lowercasedValue }, 
                    { email: lowercasedValue }    
                ]
            }
        });

        return result ? true : false;
    }

    private async findById(id:string):Promise<UserModel | null>{
        const result = await this.repository.findFirst({
            where:{
                id
            }
        })
        return result;
    }

    public async userExists(id:string):Promise<Boolean>{
        const result = await this.repository.findFirst({
            where:{
                id
            }
        })
        return result ? true : false;
    }

    async create(user:UserCreateModel){
        await this.validateUser(user);
        const hashPassword =  await this.validateAndEncryptPassword(user.password);

        const result = await this.repository.create({
            data:{
                name:       user.name,
                storeId:    user.storeId.toLowerCase(),
                email:      user.email.toLowerCase(),
                password:   hashPassword
            }
        })

        return result;
    }


    async update(id:string, user: Partial<UserCreateModel>){
        await this.validateUser(user, true);

        const dataToUpdate: Partial<UserCreateModel> = {};

        const keys = Object.keys(user) as Array<keyof UserCreateModel>;

        //Data update
        for(const key of keys ){
            if(user[key] !== undefined && user[key] !== null){
                dataToUpdate[key] = user[key] as any;
            }
        }

        if(user.password){
            dataToUpdate.password = await this.validateAndEncryptPassword(user.password);
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