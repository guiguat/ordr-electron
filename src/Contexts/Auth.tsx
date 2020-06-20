import React, {useState, useEffect} from 'react';
import { User } from '@firebase/auth-types';
import app from "../firebase";

interface IAuthContext {
    currentUser?: User | null;
    // changeState():Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User| null>(null);

    useEffect(()=>{
        app.auth().onAuthStateChanged(userState => setCurrentUser(userState));        
    },[]);

    async function changeState(){
        await app.auth().onAuthStateChanged(userState => setCurrentUser(userState));
    }

    

    return (
        <AuthContext.Provider value={ { currentUser } }>
            {children}
        </AuthContext.Provider>
    );
}

// import React, { useEffect, useState } from "react";
// import firebase from "../firebase";
// type ContextProps = {
//     currentUser: firebase.User | null;
//     authenticated: boolean;
//     setCurrentUser: any;
//     loadingAuthState: boolean;
// };
// export const AuthContext = React.createContext<Partial<ContextProps>>({});
// export const AuthProvider = ({ children }: any) => {

//     const [currentUser, setCurrentUser] = useState(null as firebase.User | null);
//     const [loadingAuthState, setLoadingAuthState] = useState(true);
//     useEffect(() => {
//         firebase.auth().onAuthStateChanged((user: any) => {
//         setCurrentUser(user);
//         setLoadingAuthState(false);
//     });
//     }, []);

//     return (
//         <AuthContext.Provider
//         value={{
//             currentUser,
//             authenticated: currentUser !== null,
//             setCurrentUser,
//             loadingAuthState
//         }}>
//         {children} 
//     </AuthContext.Provider>
//     );
// }