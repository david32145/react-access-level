import React, { useState, useContext, useCallback } from 'react'
import Context from './Context'
import ProcessQuery from './RulesUtil'
import { QueryRule, User } from './typings'

export interface ReactACLProps {
  extractInitialRole?: () => string[]
  extractInitialUser?: () => User,
  defaultUnauthorizedComponent?: React.ReactElement
}

const ReactACLProvider: React.FC<ReactACLProps> = ({
  children,
  extractInitialRole = () => [],
  extractInitialUser = () => true,
  defaultUnauthorizedComponent = <p>unauthorized</p>
}) => {
  const [rules] = useState<string[]>(extractInitialRole())
  const [logged] = useState<User>((extractInitialUser()))
  const [unauthorizedComponent] = useState<React.ReactElement>(defaultUnauthorizedComponent)

  const matchRule = useCallback((query: QueryRule) => {
    return ProcessQuery(query, rules)
  }, [rules])

  return (
    <Context.Provider value={{ rules, matchRule, logged, unauthorizedComponent }}>
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

export function useUnauthorizedComponent () {
  return useContext(Context).unauthorizedComponent
}

export default ReactACLProvider
