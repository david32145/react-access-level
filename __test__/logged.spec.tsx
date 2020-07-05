import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { ReactACLProvider, Logged, NotLogged } from '../lib'

afterEach(cleanup)

const UserList: React.FC = () => (
  <ul data-component="userlist">
    <li>User 1</li>
    <li>User 2</li>
    <li>User 3</li>
  </ul>
)

const LoggedApp: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => true}
    >
      <h1>Read an users</h1>
      <Logged>
        <UserList />
      </Logged>
    </ReactACLProvider>
  )
}

const NotLoggedApp: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
    >
      <h1>Read an users</h1>
      <Logged>
        <UserList />
      </Logged>
    </ReactACLProvider>
  )
}

const AppNotLogged: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
    >
      <h1>Read an users</h1>
      <NotLogged>
        <UserList />
      </NotLogged>
    </ReactACLProvider>
  )
}

const AppLogged: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => true}
    >
      <h1>Read an users</h1>
      <NotLogged>
        <UserList />
      </NotLogged>
    </ReactACLProvider>
  )
}

describe('Logged Component', () => {
  test('It should be render <UserList />', () => {
    const { container } = render(<LoggedApp />)
    const userList = container.querySelector('[data-component="userlist"]')
    expect(userList).not.toBeNull()
  })

  test('It should not be render <UserList />', () => {
    const { container } = render(<NotLoggedApp />)
    const userList = container.querySelector('[data-component="userlist"]')
    expect(userList).toBeNull()
  })
})

describe('NotLogged Component', () => {
  test('It should be render <UserList />', () => {
    const { container } = render(<AppNotLogged />)
    const userList = container.querySelector('[data-component="userlist"]')
    expect(userList).not.toBeNull()
  })

  test('It should not be render <UserList />', () => {
    const { container } = render(<AppLogged />)
    const userList = container.querySelector('[data-component="userlist"]')
    expect(userList).toBeNull()
  })
})
