import React, {useState, useContext} from 'react';

import Axios, { AxiosInstance } from "axios";

interface IApiContext {
    Api: AxiosInstance;
    setBaseURL(url:string):void
}


export const ApiContext = React.createContext<IApiContext>({} as IApiContext);

export const ApiProvider: React.FC = ({ children }) => {

    const [baseURL, setBaseURL] = useState("http://localhost:3333");

    const Api = Axios.create({
        baseURL
    })

    return (
        <ApiContext.Provider value={ { Api, setBaseURL } }>
            {children}
        </ApiContext.Provider>
    );
}

export const useApi = () => useContext(ApiContext);