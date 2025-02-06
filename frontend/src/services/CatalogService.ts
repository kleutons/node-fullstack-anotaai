import { AxiosInstance } from "axios";
import axiosInstance from "../utils/AxiosInstance";
import ApiResponse from "../utils/ApiResponse";
import { CatalogDataType } from "../types/CatalogyType";


class CatalogService {
    private api: AxiosInstance;
    private catalogyUrl: string;

    constructor() {
        this.api = axiosInstance;
        this.catalogyUrl = '/catalog';
    }

    public async getCatalog(ownerIdOrStoreId:string): Promise<CatalogDataType|null> {
        try{
            const response = await this.api.get(this.catalogyUrl+'/'+ownerIdOrStoreId);
            return response.data;
        }catch(err){
            ApiResponse.error(err);
            return null;
        }
    }

}

export default CatalogService;
