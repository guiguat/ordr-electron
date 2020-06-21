import React from 'react';
import Routes from './routes/routes';
import { AuthProvider } from "./Contexts/Auth";

import "./custom.scss";
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;
