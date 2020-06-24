import React from 'react';
import Routes from './routes/routes';
import { AuthProvider } from "./Contexts/Auth";

import "./custom.scss";
import { FormsProvider } from './Contexts/Forms';
function App() {
  return (
    <AuthProvider>
      <FormsProvider>
        <Routes />
      </FormsProvider>
    </AuthProvider>
  )
}

export default App;
