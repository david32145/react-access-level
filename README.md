# React ACL

<h3 align="center"> 
  An awesome library for access level in <code>ReactJS</code>
</h3>

<div align="center">
  <a href="https://github.com/david32145/csv-node/action">
    <img src="https://github.com/david32145/react-access-level/workflows/ci/badge.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=react-access-level">
    <img src="https://img.shields.io/npm/dm/react-access-level.svg" />
  </a>
  <a href="http://standardjs.com/">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg">
  </a>
   <a href="https://www.npmjs.com/package/react-access-level">
    <img src="https://badge.fury.io/js/react-access-level.svg">
  </a>
   <a href="https://www.npmjs.com/package/react-access-level">
    <img src="https://img.shields.io/badge/language-typescript-blue">
  </a>
</div>

## Features

- Show component if has an role;
- Edit style of component if has or not an role;
- Enable if else components for show or not components based in authorities;
- Provide one way for set inital roles;

### Usage

Around your main component put `ReactACLProvider` like that.

```js
import React from 'react';
import { ReactACLProvider } from "react-access-level"

function App() {
  return (
    <ReactACLProvider>
      <div>
        my App
      </div>
    </ReactACLProvider>
  );
}

export default App;
```

The component `ReactACLProvider` can receive two properties:

- extractInitialRole: `() => string[]`.

This function extract the initials roles of application, default is `[]`.

- extractInitialUser: `() => object | boolean | string | null`.

This function extract the initial user state, default is `false`.


```js
import React from 'react';
import { ReactACLProvider } from "react-access-level"
import Home from './Home';

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
    </ReactACLProvider>
  );
}

export default App;
```

### Manager Rules

The help component for manager access level was:

- Logged: Show an component if user is logged;
- NotLogged: Show an component if user is not logged;
- Can: Show an component if user have the access.

```js
import {
  Logged,
  NotLogged,
  Can
} from "react-access-level"
```

Simple example.

```js
export default function Home() {
  return (
    <div>
      <Logged>
        <p>user logged</p>
      </Logged>
      <NotLogged>
        <p>user not logged</p>
      </NotLogged>
    </div>
  )
}
```

Can component.

```jsx
<Can>
  <p>no effect</p>
</Can>

<Can resource="user" authority="create">
  <button>Create user</button>
</Can>
```

With render props

```jsx
<Can resource="user" authority="destroy">
  {accept => <button disabled={!accept}>delete user</button>}
</Can>
```

Custom rule.

```js
import { and, or } from "react-access-level"
```

```jsx
<Can match={and("user:create", or("user:delete", "user:update"))}>
  <p>it's ok!!</p>
</Can>
```

Use hooks.

```js
import React from "react"
import { useLogged, useRules } from "react-access-level"

export default function Hook() {
  const logged = useLogged()
  const rules = useRules()

  return (
    <>
      <h1>{logged ? "you are logged!!!" : "you are not logged!!!"}</h1>
      <ul>
        {rules.map(rule => <li key={rule}>{rule}</li>)}
      </ul>
    </>
  )
}
```

The component that uses `Components` or custom `hooks` must be have an children of `ReactACLProvider`.