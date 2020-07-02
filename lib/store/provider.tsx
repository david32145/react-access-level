import React, { useState, useContext } from 'react'
import Context, { Rule } from './context'

export interface ReactACLProps {
  extractInitialRole: () => Rule[]
}

const ReactACLProvider: React.FC<ReactACLProps> = ({ children, extractInitialRole }) => {
  const [rules] = useState<Rule[]>(extractInitialRole())
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
