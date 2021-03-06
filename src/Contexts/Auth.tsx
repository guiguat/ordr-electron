import React, {useState, useEffect, useContext} from 'react';
import { User } from 'firebase';
import app from "../services/firebase";
import { IAuthContext, ISignUpData, IUpdateData } from './models/Auth';

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User| null>(null);

    useEffect(()=>{
        app
          .auth()
          .onAuthStateChanged(userState => setCurrentUser(userState));        
    },[]);

    function LogOut(){
        app
          .auth()
          .signOut();
    }

    function LogIn(email:string, password:string){
        app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error=>alert(error));
    }

    function SignUp(signUpData:ISignUpData){
        app
          .auth()
          .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
          .then(result => {
            return result.user?.updateProfile({
                displayName: signUpData.name
            });
          })
          .then( ()=>alert("User Created"))
          .catch(error=>alert(error));
    }

    function DeleteUser(email:string, password:string){
        app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(res=>{
            res.user?.delete();
            alert("User deleted")
          })
          .catch(error=>alert(error))
    }

    function UpdateUser(data:IUpdateData){
        app
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(res => {
            if(data.newEmail) res.user?.updateEmail(data.newEmail);
            if(data.newName) res.user?.updateProfile({displayName:data.newName});
            if(data.newPassword) res.user?.updatePassword(data.newPassword);
          })
          .then(()=>alert("User data changed successfully"))
          .catch(error => alert(error))
    }

    return (
        <AuthContext.Provider value={ { currentUser, LogOut, SignUp, DeleteUser, UpdateUser, LogIn } }>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);