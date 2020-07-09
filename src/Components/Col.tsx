import React from 'react';

// import { Container } from './styles';
interface IColProps{
    type?:string
}
const Col: React.FC<IColProps> = ({children, type}) => {
    if(type === "nav") return <div className="col col-md-2 h-100 p-0">{children}</div>;
    else return <div className="col col-md-10 px-4 py-3 h-100 overflow-auto">{children}</div>
}

export default Col;