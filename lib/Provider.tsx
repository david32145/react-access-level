import React, { useState, useContext, useCallback } from 'react'
import Context from './Context'
import ProcessQuery from './RulesUtil'
import { QueryRule, User } from './typings'

export interface ReactACLProps {
  extractInitialRoles?: () => string[]
  extractInitialUser?: () => User,
  defaultUnauthorizedComponent?: React.ReactElement
}

const ReactACLProvider: React.FC<ReactACLProps> = ({
  children,
  extractInitialRoles = () => [],
  extractInitialUser = () => true,
  defaultUnauthorizedComponent = <p>unauthorized</p>
}) => {
  const [roles, setRoles] = useState<string[]>(extractInitialRoles())
  const [logged, setLogged] = useState<User>((extractInitialUser()))
  const [unauthorizedComponent] = useState<React.ReactElement>(defaultUnauthorizedComponent)

  const matchRoles = useCallback((query: QueryRule) => {
    return ProcessQuery(query, roles)
  }, [roles])

  const addRole = useCallback((role: string): void => {
    if (roles.includes(role)) {
      return
    }

    setRoles([...roles, role])
  }, [roles])

  const updateRole = useCallback((oldRole: string, newRole: string): void => {
    let shouldUpdate = false
    const newRoles = roles.map(role => {
      if (role === oldRole) {
        shouldUpdate = true
        return newRole
      }
      return role
    })

    if (shouldUpdate) {
      setRoles(newRoles)
    }
  }, [roles])

  const deleteRole = useCallback((role: string): void => {
    const filteredRoles = roles.filter(rl => rl !== role)
    if (filteredRoles.length === roles.length) {
      return
    }
    setRoles(filteredRoles)
  }, [roles])

  const login = useCallback((user: User): void => {
    setLogged(user)
  }, [])

  const logout = useCallback((): void => {
    setLogged(false)
  }, [])

  return (
    <Context.Provider value={{
      roles,
      matchRoles,
      logged,
      unauthorizedComponent,
      addRole,
      updateRole,
      deleteRole,
      login,
      logout
    }}>
      {children}
    </Context.Provider>
  )
}

export function useRoles () {
  return useContext(Context).roles
}

export function useMatch () {
  return useContext(Context).matchRoles
}

export function useLogged () {
  return useContext(Context).logged
}

export function useUnauthorizedComponent () {
  return useContext(Context).unauthorizedComponent
}

export function useManagerRoles () {
  return {
    addRole: useContext(Context).addRole,
    updateRole: useContext(Context).updateRole,
    deleteRole: useContext(Context).deleteRole
  }
}

export function useLogin () {
  return useContext(Context).login
}

export function useLogout () {
  return useContext(Context).logout
}

export default ReactACLProvider
