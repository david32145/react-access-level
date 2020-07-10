import { createContext } from 'react'
import { QueryRule, User } from './typings'

export interface ReactACLStore {
  roles: string[],
  matchRoles: (query: QueryRule) => boolean
  logged: User
  unauthorizedComponent: React.ReactElement
  addRole: (role: string) => void
  updateRole: (oldRole: string, newRole: string) => void
  deleteRole: (role: string) => void
  login: (user: User) => void
  logout: () => void
}

/* istanbul ignore next */
const INITIAL_STATE: ReactACLStore = {
  roles: [],
  matchRoles: () => true,
  logged: null,
  unauthorizedComponent: null as unknown as React.ReactElement,
  addRole: () => {},
  updateRole: () => {},
  deleteRole: () => {},
  login: () => {},
  logout: () => {}
}

const context = createContext<ReactACLStore>(INITIAL_STATE)

export default context
