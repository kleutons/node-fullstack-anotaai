import { AxiosInstance } from "axios";
import { CategoryInputType, CategoryFullType } from "../types/CategoryType";
import axiosInstance from "../utils/AxiosInstance";
import ApiResponse from "../utils/ApiResponse";


class CategoryService {
    private api: AxiosInstance;
    private categoryUrl: string;

    constructor() {
        this.api = axiosInstance;
        this.api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        this.categoryUrl = '/category';
    }

    public async getCategories(): Promise<CategoryFullType[]> {
        const emptyData: CategoryFullType[] = [];
        try{
            const response = await this.api.get(this.categoryUrl);
            return response.data;
        }catch(err){
            ApiResponse.error(err);
            return emptyData;
        }
    }

    public async createCategory(category: CategoryInputType): Promise<CategoryFullType | undefined> {        
        try{
            const response = await this.api.post(this.categoryUrl, category);
            ApiResponse.success('Categoria Criada com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async updateCategory(category: CategoryFullType): Promise<CategoryFullType | undefined> {
        const { id, ...formData } = category;
        try{
            const response = await this.api.put(`${this.categoryUrl}/${id}`, formData);
            ApiResponse.success('Categoria Atualizada com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async deleteCategory(id: string): Promise<boolean> {
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

export default new CategoryService();
