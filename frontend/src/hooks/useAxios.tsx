import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";

export interface useAxiosProps {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "put" | "delete";  // Métodos HTTP esperados
  url: string;
  token?:string;
  othersConfigs?: object; 
}

interface ErrorResponse {
  error?: string;  
}

export default function useAxios<T>({ axiosInstance, method, url, token, othersConfigs }: useAxiosProps) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useRef to store axiosInstance
  const axiosInstanceRef = useRef(axiosInstance);

  useEffect(() => {
    const fetchData = async () => {
      if(token){
        setError(null);
        setLoading(true);
        try {
          const response: AxiosResponse<T> = await axiosInstanceRef.current[method](url, othersConfigs);
          setData(response.data);
        } catch (err) {
          console.log(err);
          const axiosError = err as AxiosError<ErrorResponse>;
          const returnErro = axiosError.response?.data ? `Error: ${axiosError.response.data?.error}` : `Error fetching data: ${err}`;
          setError(returnErro);
        } finally {
          setLoading(false);
        }
      }
      
    };
    
    fetchData();
  }, [method, url, token, othersConfigs] );

  return { data, loading, error };
}
