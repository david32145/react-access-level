import React, { useState, useContext, useCallback } from 'react'
import Context from './context'
import ProcessQuery, { QueryRule } from '@lib/utils/includesRules'

export interface ReactACLProps {
  extractInitialRole: () => string[]
}

const ReactACLProvider: React.FC<ReactACLProps> = ({ children, extractInitialRole }) => {
  const [rules] = useState<string[]>(extractInitialRole())

  const matchRule = useCallback((query: QueryRule) => {
    return ProcessQuery(query, rules)
  }, [rules])

  return (
    <Context.Provider value={{ rules, matchRule }}>
      {children}
    </Context.Provider>
  )
}

export function useRules () {
  return useContext(Context).rules
}

export function useMatch () {
  return useContext(Context).matchRule
}

export default ReactACLProvider
