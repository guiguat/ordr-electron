import React, {useState, useEffect} from 'react';
import { User } from 'firebase';
import app from "../firebase";

interface IAuthContext {
    currentUser?: User | null;
    LogOut():void;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User| null>(null);

    useEffect(()=>{
        app.auth().onAuthStateChanged(userState => setCurrentUser(userState));        
    },[]);

    function LogOut(){
        app.auth().signOut();
    }

    return (
        <AuthContext.Provider value={ { currentUser, LogOut } }>
            {children}
        </AuthContext.Provider>
    );
}