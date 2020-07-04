import React, { useState, useContext, useCallback } from 'react'
import Context from './context'
import ProcessQuery from '@lib/utils/includesRules'
import { QueryRule, User } from '@lib/models'

export interface ReactACLProps {
  extractInitialRole?: () => string[]
  extractInitialUser?: () => User
}

const ReactACLProvider: React.FC<ReactACLProps> = ({
  children,
  extractInitialRole = () => [],
  extractInitialUser = () => true
}) => {
  const [rules] = useState<string[]>(extractInitialRole())
  const [logged] = useState<User>((extractInitialUser()))

  const matchRule = useCallback((query: QueryRule) => {
    return ProcessQuery(query, rules)
  }, [rules])

  return (
    <Context.Provider value={{ rules, matchRule, logged }}>
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

export function useLogged () {
  return useContext(Context).logged
}

export default ReactACLProvider
