import { OwnerCache } from "../../data/owner.cache";
import { HttpError } from "../../errors/http-error";
import { HttpStatusCodes } from "../../errors/http-status-codes";
import { OwnerModel } from "../../models/catalog.model";
import { UserCreateModel, UserDataReturn, UserModel } from "../../models/user.model";
import prismaRepository from "../../repositories";
import bcrypt from 'bcrypt';

export class UserService{

    private repository;
    private cache;

    constructor(){
        this.repository = prismaRepository.user;
        this.cache = OwnerCache.getInstance();
    }

    async listAll():Promise<UserDataReturn[]>{
        const users = await this.repository.findMany();
        // Remover Senha do retorno 
        const returnUsers = users.map(item => ({
            id: item.id,
            name: item.name,
            storeId: item.storeId,
            email: item.email,
            role: item.role,
            status: item.status,
            imgUrl: item.imgUrl || undefined,
        }));
        return returnUsers;
    }

    private  async validateUser(user:Partial<UserCreateModel>, userId?:string){
        const requiredFields: Array<keyof UserCreateModel> = !userId ? ["name", "storeId", "email", "password"] : [];
       
        for(const field of requiredFields){
            if(!user[field]){
                throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, `Field ${field} is mandatory!`);
            }
        }

        const storeIdRegex = /^[a-z0-9.-]+$/; 
        if (user.storeId && !storeIdRegex.test(user.storeId)) {
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Store ID must be lowercase letters, numbers, dots, or hyphens, with no spaces!");
        }

        if(user.storeId && await this.getTotalByStoreId(user.storeId, userId)){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Store ID already exists!");
        }

        if(user.email && await this.findByEmail(user.email, userId)){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Email already used!");
        }
    }

    private async validateAndEncryptPassword( pass: string){

        if(pass.length < 6){
            throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Password must be at least 6 characters long!");
        } 

        return await bcrypt.hash(pass, 10);
    }

    /**
     * Função para encontrar um usuário pelo storeId, excluindo o user com o id fornecido.
     *
     * @param storeId - O ID da loja a ser buscada.
     * @param currentUserId - O ID do usuário que está sendo excluído da busca.
     * @returns O usuário que possui o storeId fornecido, ou null se não encontrado.
    */
    private async getTotalByStoreId(storeId:string, currentUserId?: string):Promise<UserModel | null> {
        const lowercasedValue = storeId.toLowerCase();
        
        const whereClause: any = { storeId: lowercasedValue };
        if (currentUserId) whereClause.NOT = { id: currentUserId };

        const result = await this.repository.findUnique({
            where: whereClause
        });

        return result;
    }

    /**
     * Função para encontrar um usuário pelo email, excluindo um usuário com um ID específico.
     *
     * @param id - Identificador ou StoreId da Loja do usuário.
     * @returns O usuário que possui o Identificador fornecido, ou null se não encontrado.
     */
    public async findById(id:string):Promise<UserModel | null>{
        let whereClause: any = { id };
        if( id.length !== 24 ) // Não é um ID, procura pelo storeId
            whereClause = {storeId: id.toLowerCase()};

        const result = await this.repository.findFirst({
            where:whereClause
        })
        return result;
    }

    /**
     * Função para encontrar um usuário pelo email, excluindo um usuário com um ID específico.
     *
     * @param email - Email do usuário.
     * @param currentUserId - O ID do usuário que está sendo excluído da busca.
     * @returns O usuário que possui o email fornecido, excluindo o usuário com o currentId, ou null se não encontrado.
     */
    public async findByEmail(email:string, currentUserId?: string):Promise<UserModel | null>{
        const lowercasedValue = email.toLowerCase();

        const whereClause: any = { email: lowercasedValue };
        if (currentUserId) whereClause.NOT = { id: currentUserId };

        const result = await this.repository.findUnique({
            where: whereClause
        });

        return result ;
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
                password:   hashPassword,
                imgUrl:     user.imgUrl 
            }
        })

        //UPDATE CACHE
        setImmediate(() => this.updateCacheAll());
        // Remover Senha do retorno 
        const returnUser = {...result, password: undefined};
        return returnUser;
    }


    async update(id:string, user: Partial<UserCreateModel>){
        await this.validateUser(user, id);

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

        //UPDATE CACHE
        setImmediate(() => this.updateCacheAll());
        // Remover Senha do retorno 
        const returnUser = {...result, password: undefined};
        return returnUser;
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
        setImmediate(() => this.updateCacheAll());
        return { message: "Successfully Deleted!"}
    }

    private async updateCacheAll(){
        const listData = await this.listAll();
        const data: UserDataReturn[] = listData ? listData : [];
        
        //UPDATE CACHE
        this.cache.updateFullCache(data);
    }
}