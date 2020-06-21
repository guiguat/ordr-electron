import React, {useState, useEffect, useContext} from 'react';
import { User } from 'firebase';
import app from "../firebase";

interface IAuthContext {
    currentUser?: User | null;
    LogOut():void;
    SignUp(signUpData: ISignUpData):void;
    DeleteUser(email:string, password:string):void;
    UpdateUser(data:IUpdateData):void
}
interface ISignUpData{
    email:string;
    password:string;
    name:string;
}
interface IUpdateData{
    email:string;
    password:string;
    newName?:string|null;
    newEmail?:string|null;
    newPassword?:string|null;
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
            }).then(
                ()=>alert("User Created")
                ).catch(function(error) {
                    alert(error);
                    });
    }

    function DeleteUser(email:string, password:string){
        app.auth()
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
        <AuthContext.Provider value={ { currentUser, LogOut, SignUp, DeleteUser, UpdateUser } }>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);