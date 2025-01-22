import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface ConfigRequest {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "put" | "delete";  // Adicionando métodos HTTP esperados
  url: string;
  othersConfigs?: object;  // Tornando opcional
}

interface ErrorResponse {
  message?: string;  
}

export default function useAxios<T>({ axiosInstance, method, url, othersConfigs }: ConfigRequest) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axiosInstance[method](url, othersConfigs);
        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        const returnErro = axiosError.response ? `Error: ${axiosError.response.data?.message}` : `Error fetching data: ${err}`;
        setError(returnErro);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance, method, url, othersConfigs] );

  return { data, loading, error };
}
