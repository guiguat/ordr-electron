import React, {useState, useContext} from 'react';

interface IFormsContext {
    btnClicked: string;
    setBtnClicked(btnType:string):void;
    prodSelected:IProductsData;
    setProdSelected(product:IProductsData):void
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

    const [btnClicked, setBtnClicked] = useState("");
    const [prodSelected, setProdSelected] = useState({} as IProductsData);

    return (
        <FormsContext.Provider value={ { btnClicked, setBtnClicked, prodSelected, setProdSelected } }>
            {children}
        </FormsContext.Provider>
    );
}

export const useForms = () => useContext(FormsContext);