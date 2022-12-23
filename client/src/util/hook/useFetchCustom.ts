import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:9000/api"

export const useAxios = (axiosParams: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(true);

    const fetchData = async (params: AxiosRequestConfig) => {
        setLoading(true)
        try{
            const result = await axios.request(params);
            setResponse(result);
        }catch (error:any) {
            setError(error)
        }finally{
            setLoading(false)
        }
    };

    const sendData = () => {
        fetchData(axiosParams)
    }

    useEffect(() => {
        if(axiosParams.method === "GET" || axiosParams.method === "get"){
            fetchData(axiosParams)
        }
    },[])

    return {response, error, loading, sendData};
}