import { AxiosInstance } from "axios";

import axiosInstance from "../utils/AxiosInstance";
import ApiResponse from "../utils/ApiResponse";
import { ProductFullType, ProductInputType } from "../types/ProdutctType";


class ProductService {
    private api: AxiosInstance;
    private categoryUrl: string;

    constructor() {
        this.api = axiosInstance;
        this.api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        this.categoryUrl = '/product';
    }

    public async get(): Promise<ProductFullType[]> {
        const emptyData: ProductFullType[] = [];
        try{
            const response = await this.api.get(this.categoryUrl);
            return response.data;
        }catch(err){
            ApiResponse.error(err);
            return emptyData;
        }
    }

    public async create(data: ProductInputType): Promise<ProductFullType | undefined> {        
        try{
            const response = await this.api.post(this.categoryUrl, data);
            ApiResponse.success('Categoria Criada com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async update(data: ProductFullType): Promise<ProductFullType | undefined> {
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

export default new ProductService();
