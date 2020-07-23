import { AxiosInstance } from "axios"

export interface IApiContext {
    Api: AxiosInstance;
    baseURL: string;
    setBaseURL(url:string):void,
    useAxios<Data=any, Error=any>(url:string): IuseAxios<Data, Error>;
}

export interface IuseAxios<Data, Error>{
    data: Data | undefined;
    error: Error | undefined
}