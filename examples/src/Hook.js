import React from "react"
import { 
  useLogged, 
  useRoles, 
  useLogin, 
  useLogout,
  useManagerRoles
} from "react-access-level"

export default function Hook() {
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