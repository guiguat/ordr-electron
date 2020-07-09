import React, {useState, useContext} from 'react';
import useSWR from 'swr';
import Axios, { AxiosInstance } from "axios";

interface IApiContext {
    Api: AxiosInstance;
    setBaseURL(url:string):void,
    useAxios<Data=any, Error=any>(url:string): IuseAxios<Data, Error>;
}
interface IuseAxios<Data, Error>{
    data: Data | undefined;
    error: Error | undefined
}

export const ApiContext = React.createContext<IApiContext>({} as IApiContext);

export const ApiProvider: React.FC = ({ children }) => {

    const [baseURL, setBaseURL] = useState("http://localhost:3333");

    const Api = Axios.create({
        baseURL
    })

    function useAxios<Data=any, Error=any>(url:string){

        const { data, error } = useSWR<Data, Error>(url, async url => {
            const response = await Api.get(url);
            return response.data;
        })

        return { data, error }
    }

    return (
        <ApiContext.Provider value={ { Api, setBaseURL, useAxios } }>
            {children}
        </ApiContext.Provider>
    );
}

export const useApi = () => useContext(ApiContext);