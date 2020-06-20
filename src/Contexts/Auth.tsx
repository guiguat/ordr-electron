import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import app from "../firebase";

interface IAuthContext {
    currentUser: firebase.User | null
}

export const AuthContext = React.createContext<IAuthContext>({currentUser:null});

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null >(null);

    useEffect(()=>{
        app.auth().onAuthStateChanged(setCurrentUser);
    },[]);

    return (
        <AuthContext.Provider value={ {currentUser} }>
            {children}
        </AuthContext.Provider>
    );
}