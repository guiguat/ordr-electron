import React, {useState, useContext} from 'react';
import {IProduct} from '../Pages/Product/models';

export interface IFormsContext {
    prodSelected:IProduct;
    setProdSelected(product:IProduct):void;
}


export const FormsContext = React.createContext<IFormsContext>({} as IFormsContext);

export const FormsProvider: React.FC = ({ children }) => {

    const [prodSelected, setProdSelected] = useState({} as IProduct);

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