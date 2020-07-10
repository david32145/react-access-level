import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {
  ReactACLProvider,
  useLogged,
  useLogin,
  useLogout,
  useRoles,
  useManagerRoles
} from '../lib'

afterEach(cleanup)

const App: React.FC = () => {
  const logged = useLogged()
  const roles = useRoles()
  const login = useLogin()
  const logout = useLogout()

  const { addRole, updateRole, deleteRole } = useManagerRoles()

  return (
    <div id="app">
      <h1>{logged ? 'logged' : 'not logged'}</h1>
      <ul id="roles-list">
        {roles.map(role => <li key={role}>{role}</li>)}
      </ul>

      <button
        id="btn-login"
        onClick={() => login(true)}
      >
        Login
      </button>
      <button
        id="btn-logout"
        onClick={() => logout()}
      >
        Logout
      </button>

      <button
        id="btn-addrole"
        onClick={() => addRole('user:read')}
      >
        Add role
      </button>

      <button
        id="btn-updaterole"
        onClick={() => updateRole('user:create', 'user:add')}
      >
        Update role
      </button>
      <button
        id="btn-deleterole"
        onClick={() => deleteRole('user:create')}
      >
        Update role
      </button>
    </div>
  )
}
const HooksApp: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => true}
      extractInitialRoles={() => ['user:create']}
    >
      <App />
    </ReactACLProvider>
  )
}

describe('Hooks', () => {
  test('It should be able swap between logged and not logged', () => {
    const { container } = render(<HooksApp />)
    const app = container.querySelector('#app')

    const header = app?.querySelector('h1')
    const btnLogin = app?.querySelector('#btn-login') as HTMLButtonElement
    const btnLogout = app?.querySelector('#btn-logout') as HTMLButtonElement

    expect(header?.textContent).toEqual('logged')

    btnLogout.click()
    expect(header?.textContent).toEqual('not logged')

    btnLogin.click()
    expect(header?.textContent).toEqual('logged')

    expect.assertions(3)
  })

  test('It should be able of add an new role', () => {
    const { container } = render(<HooksApp />)
    const app = container.querySelector('#app')

    const roleList = app?.querySelector('#roles-list') as HTMLUListElement
    const btnAddRole = app?.querySelector('#btn-addrole') as HTMLButtonElement

    const getCurrentRolesByUl = (ul: HTMLUListElement) => {
      return Array
        .prototype
        .slice
        .call(ul.querySelectorAll('li'))
        .map(listitem => String(listitem.textContent))
    }

    let currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:create'])

    btnAddRole.click()
    currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:create', 'user:read'])

    btnAddRole.click()
    currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:create', 'user:read'])
  })

  test('It should be able of update an role', () => {
    const { container } = render(<HooksApp />)
    const app = container.querySelector('#app')

    const roleList = app?.querySelector('#roles-list') as HTMLUListElement
    const btnUpdateRole = app?.querySelector('#btn-updaterole') as HTMLButtonElement
    const btnAddRole = app?.querySelector('#btn-addrole') as HTMLButtonElement

    btnAddRole.click()

    const getCurrentRolesByUl = (ul: HTMLUListElement) => {
      return Array
        .prototype
        .slice
        .call(ul.querySelectorAll('li'))
        .map(listitem => String(listitem.textContent))
    }

    let currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:create', 'user:read'])

    btnUpdateRole.click()
    currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:add', 'user:read'])

    btnUpdateRole.click()
    currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:add', 'user:read'])
  })

  test('It must be delete an role', () => {
    const { container } = render(<HooksApp />)
    const app = container.querySelector('#app')

    const roleList = app?.querySelector('#roles-list') as HTMLUListElement
    const btnDeleteRole = app?.querySelector('#btn-deleterole') as HTMLButtonElement
    const btnAddRole = app?.querySelector('#btn-addrole') as HTMLButtonElement

    btnAddRole.click()

    const getCurrentRolesByUl = (ul: HTMLUListElement) => {
      return Array
        .prototype
        .slice
        .call(ul.querySelectorAll('li'))
        .map(listitem => String(listitem.textContent))
    }

    let currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:create', 'user:read'])

    btnDeleteRole.click()
    currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:read'])

    btnDeleteRole.click()
    currentRoles = getCurrentRolesByUl(roleList)
    expect(currentRoles).toStrictEqual(['user:read'])
  })
})
