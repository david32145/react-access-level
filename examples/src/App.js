import React from 'react';
import { ReactACLProvider } from "react-access-level"
import Home from './Home';
import Hook from './Hook';

function App() {
  function getInitialUser() {
    return true
  }

  function getInitialRules() {
    console.log('here')
    return ["user:create", "user:read", "user:update"]
  }

  return (
    <ReactACLProvider
      extractInitialUser={getInitialUser}
      extractInitialRole={getInitialRules}
    >
      <Home />
      <Hook />
    </ReactACLProvider>
  );
}

export default App;
