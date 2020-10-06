import React from 'react';
import Signin from './pages/Signin';
//import Signup from './pages/Signup';

import GlobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
