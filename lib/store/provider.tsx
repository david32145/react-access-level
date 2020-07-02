import React, { useState, useContext } from 'react'
import Context from './context'

export interface ReactACLProps {
  extractInitialRole: () => string[]
}

const ReactACLProvider: React.FC<ReactACLProps> = ({ children, extractInitialRole }) => {
  const [rules] = useState<string[]>(extractInitialRole())
  return (
    <Context.Provider value={{ rules }}>
      {children}
    </Context.Provider>
  )
}

export function useRules () {
  return useContext(Context).rules
}

export default ReactACLProvider
