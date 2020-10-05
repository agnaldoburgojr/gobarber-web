import React from 'react';
// import Signin from './pages/Signin';
import Signup from './pages/Signup';

import GlobalStyle from './styles/global';
const App: React.FC = () => {
  return (
    <>
      <Signup />
      <GlobalStyle />
    </>
  );
};

export default App;
