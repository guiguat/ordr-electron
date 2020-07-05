import React, {useState, useContext} from 'react';

interface IFormsContext {
    prodSelected:IProductsData;
    setProdSelected(product:IProductsData):void;
}

export interface IProductsData{
    id: number,
    name: string,
    price: number,
    stock: number,
    type: string
}

export const FormsContext = React.createContext<IFormsContext>({} as IFormsContext);

export const FormsProvider: React.FC = ({ children }) => {

    const [prodSelected, setProdSelected] = useState({} as IProductsData);

    return (
        <FormsContext.Provider value={ { 
                prodSelected,
                setProdSelected,
            } }>
            {children}
        </FormsContext.Provider>
    );
}

export const useForms = () => useContext(FormsContext);