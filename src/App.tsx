import React from 'react';
import Routes from './routes/routes';
import { AuthProvider } from "./Contexts/Auth";

import "./custom.scss";
import { FormsProvider } from './Contexts/Forms';
import { ApiProvider } from './Contexts/Api';
function App() {
  return (
    <AuthProvider>
      <FormsProvider>
        <ApiProvider>
          <Routes />
        </ApiProvider>
      </FormsProvider>
    </AuthProvider>
  )
}

export default App;
