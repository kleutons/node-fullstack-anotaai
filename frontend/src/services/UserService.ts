import { AxiosInstance } from "axios";
import axiosInstance from "../utils/AxiosInstance";
import ApiResponse from "../utils/ApiResponse";
import { UserInputType, UserReturnType } from "../types/UserType";



class UserService {
    private api: AxiosInstance;
    private categoryUrl: string;
    private token: string;

    constructor(token: string) {
        this.api = axiosInstance;
        this.token = token;
        this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.categoryUrl = '/user';
    }

    public async get(): Promise<UserReturnType[]> {
        const emptyData: UserReturnType[] = [];
        try{
            const response = await this.api.get(this.categoryUrl);
            return response.data;
        }catch(err){
            ApiResponse.error(err);
            return emptyData;
        }
    }

    public async create(data: UserInputType): Promise<UserReturnType | undefined> {        
        try{
            const response = await this.api.post(this.categoryUrl, data);
            ApiResponse.success('Categoria Criada com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async update(data: UserInputType): Promise<UserReturnType | undefined> {
        const { id, ...formData } = data;
        try{
            const response = await this.api.put(`${this.categoryUrl}/${id}`, formData);
            ApiResponse.success('Categoria Atualizada com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async delete(id: string): Promise<boolean> {
        try{
            await this.api.delete(`${this.categoryUrl}/${id}`);
            ApiResponse.success('Categoria Excluida com Sucesso!');
            return true;
        }catch(err){
            ApiResponse.error(err);
            return false;
        }
    }
}

export default UserService;
