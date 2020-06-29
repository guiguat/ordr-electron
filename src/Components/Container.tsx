import React from 'react';

// import { Container } from './styles';

const Container: React.FC = ({children}) => {
    return <div className="row m-0 p-0 d-flex h-100 w-100">{children}</div>;
}

export default Container;