import React, {useState, useContext} from 'react';

interface IFormsContext {
    btnClicked: string;
    setBtnClicked(btnType:string):void
}


export const FormsContext = React.createContext<IFormsContext>({} as IFormsContext);

export const FormsProvider: React.FC = ({ children }) => {

    const [btnClicked, setBtnClicked] = useState("");

    return (
        <FormsContext.Provider value={ { btnClicked, setBtnClicked } }>
            {children}
        </FormsContext.Provider>
    );
}

export const useForms = () => useContext(FormsContext);