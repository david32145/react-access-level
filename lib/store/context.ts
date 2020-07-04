import { createContext } from 'react'
import { QueryRule } from '@lib/utils/includesRules'

export interface Rule {
  resource: string
  authority: string
}

interface ReactACLStore {
  rules: string[],
  matchRule: (query: QueryRule) => boolean
}

const INITIAL_STATE: ReactACLStore = {
  rules: [],
  matchRule: () => false
}

const context = createContext<ReactACLStore>(INITIAL_STATE)

export default context
