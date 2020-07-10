import React from 'react';

interface IColProps{
    type?:string;
    className?:string;
}
const Col: React.FC<IColProps> = ({children, type, className}) => {
    if(type === "nav") return <div className={`col col-md-2 h-100 p-0 ${className}`} >{children}</div>;
    else return <div className={`col col-md-10 px-4 py-3 h-100 overflow-auto ${className}`}>{children}</div>
}

export default Col;