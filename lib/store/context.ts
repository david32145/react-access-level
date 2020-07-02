import { createContext } from 'react'

export interface Rule {
  resource: string
  authority: string
}

interface ReactACLStore {
  rules: string[]
}

const INITIAL_STATE: ReactACLStore = {
  rules: []
}

const context = createContext<ReactACLStore>(INITIAL_STATE)

export default context
