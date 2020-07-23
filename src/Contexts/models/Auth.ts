import { User } from 'firebase';

export interface IAuthContext {
    currentUser?: User | null;
    LogOut():void;
    SignUp(signUpData: ISignUpData):void;
    DeleteUser(email:string, password:string):void;
    UpdateUser(data:IUpdateData):void;
    LogIn(email:string, password:string):void;
}
export interface ISignUpData{
    email:string;
    password:string;
    name:string;
}
export interface IUpdateData{
    email:string;
    password:string;
    newName?:string|null;
    newEmail?:string|null;
    newPassword?:string|null;
}