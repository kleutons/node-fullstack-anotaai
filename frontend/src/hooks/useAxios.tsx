import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

export interface useAxiosProps {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "put" | "delete";  // Métodos HTTP esperados
  url: string;
  formData?: object
}

interface ErrorResponse {
  error?: string;  
}

export default function useAxios<T>({ axiosInstance, method, url, formData }: useAxiosProps) {
  
  const {token} = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const headers = {
    headers: { 'Authorization': `Bearer ${token}` }
  }
  // Use useRef to store axiosInstance
  const axiosInstanceRef = useRef(axiosInstance);


    const sendRequest = async () => {
      if(token){        
        setLoading(true);
        try {
          let response: AxiosResponse<T> ;
          if(formData){
            response = await axiosInstanceRef.current[method](url, formData, headers);
          }else{
            response = await axiosInstanceRef.current[method](url, headers);
          }
          setData(response.data);
        } catch (err) {
          console.log(err);
          const axiosError = err as AxiosError<ErrorResponse>;
          const returnErro = axiosError.response?.data ? `Error: ${axiosError.response.data?.error}` : `Error fetching data: ${err}`;
          toast.error(returnErro)
        } finally {
          setLoading(false);
        }
      }
      
    };
    

  return { sendRequest, response:{ data, loading } };
}
