import { createContext } from 'react'
import { QueryRule, User } from './typings'

export interface ReactACLStore {
  rules: string[],
  matchRule: (query: QueryRule) => boolean
  logged: User
}

const INITIAL_STATE: ReactACLStore = {
  rules: [],
  matchRule: () => true,
  logged: null
}

const context = createContext<ReactACLStore>(INITIAL_STATE)

export default context
