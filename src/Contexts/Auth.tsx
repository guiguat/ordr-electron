import React, {useState, useEffect} from 'react';
import { User } from 'firebase';
import app from "../firebase";

interface IAuthContext {
    currentUser?: User | null;
    LogOut():void;
    SignUp(signUpData: ISignUpData):void
}
interface ISignUpData{
    email:string;
    password:string;
    name:string;
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

    function SignUp(signUpData:ISignUpData){
        app.auth().createUserWithEmailAndPassword(signUpData.email, signUpData.password)
            .then(result => {
            return result.user?.updateProfile({
                    displayName: signUpData.name
                });
            }).catch(function(error) {
            console.log(error);
            });
    }

    return (
        <AuthContext.Provider value={ { currentUser, LogOut, SignUp } }>
            {children}
        </AuthContext.Provider>
    );
}