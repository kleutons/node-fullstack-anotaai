import { AxiosInstance } from "axios";
import { ProductFullType, ProductInputType } from "../types/ProdutctType";
import axiosInstance from "../utils/AxiosInstance";
import ApiResponse from "../utils/ApiResponse";


class ProductService {
    private api: AxiosInstance;
    private categoryUrl: string;
    private token: string;

    constructor(token: string) {
        this.api = axiosInstance;
        this.token = token;
        this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
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
            ApiResponse.success('Produto Criado com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async update(data: ProductFullType): Promise<ProductFullType | undefined> {
        const { id, ...formData } = data;
        try{
            const response = await this.api.put(`${this.categoryUrl}/${id}`, formData);
            ApiResponse.success('Produto Atualizado com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

    public async delete(id: string): Promise<boolean> {
        try{
            await this.api.delete(`${this.categoryUrl}/${id}`);
            ApiResponse.success('Produto Excluído com Sucesso!');
            return true;
        }catch(err){
            ApiResponse.error(err);
            return false;
        }
    }

    public async updateCache(){
        try{
            await this.api.get(`${this.categoryUrl}/update-cache`);
            ApiResponse.success('Cache Atualizado com Sucesso!');
        }catch(err){
            ApiResponse.error(err);
        }
    }
}

export default ProductService;
