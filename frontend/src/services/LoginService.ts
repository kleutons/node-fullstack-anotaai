import { AxiosInstance } from "axios";
import axiosInstance from "../utils/AxiosInstance";
import ApiResponse from "../utils/ApiResponse";
import { LoginInputType, UserReturnType } from "../types/UserType";


class LoginService {
    private api: AxiosInstance;
    private loginUrl: string;
    private token: string;

    constructor(token: string) {
        this.api = axiosInstance;
        this.token = token;
        this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.loginUrl = '/login';
    }

    public async post(data: LoginInputType): Promise<UserReturnType | undefined> {        
        try{
            const response = await this.api.post(this.loginUrl, data);
            ApiResponse.success('Login Efetuado com Sucesso!');
            return response.data;
        }catch(err){
            ApiResponse.error(err);
        }
    }

}

export default LoginService;
