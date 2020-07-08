import React from 'react';
import { ReactACLProvider } from "react-access-level"
import Home from './Home';
import Hook from './Hook';

function App() {
  function getInitialUser() {
    return false
  }

  function getInitialRules() {
    console.log('here')
    return ["user:create", "user:read", "user:update"]
  }

  return (
    <ReactACLProvider
      extractInitialUser={getInitialUser}
      extractInitialRole={getInitialRules}
      defaultUnauthorizedComponent={
      <span 
        style={{
          background: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 400,
          height: 200
        }}>
        DENIED ACCESS 
      </span>}
    >
      <Home />
      <Hook />
    </ReactACLProvider>
  );
}

export default App;
