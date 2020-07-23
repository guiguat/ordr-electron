import React, {useState, useContext} from 'react';
import useSWR from 'swr';
import Axios from "axios";
import { IApiContext } from './models/Api';

export const ApiContext = React.createContext<IApiContext>({} as IApiContext);

export const ApiProvider: React.FC = ({ children }) => {

    const [baseURL, setFinalBaseURL] = useState(getBaseUrl());

    function setBaseURL(url:string){
        if(url){
            localStorage.setItem("Ordr@baseUrl", url);
            setFinalBaseURL(url);
        }
    }

    function getBaseUrl(){
        const baseurl = localStorage.getItem("Ordr@baseUrl");
        return baseurl??"http://localhost:3333";
    }

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
        <ApiContext.Provider value={ { Api, baseURL, setBaseURL, useAxios } }>
            {children}
        </ApiContext.Provider>
    );
}

export const useApi = () => useContext(ApiContext);