import { IProduct } from "../../Product/models";

export interface ISale{
    id:number;
    products:IProduct[];
    seller_name: string,
    table_num: number,
    date_time: string
}

export interface ISaleItemProps{
    data: ISale[]
}