import React from 'react'
import { useLogged } from './Provider'

export interface LoggedProps {
  children: React.ReactElement
}

const Logged: React.FC<LoggedProps> = ({ children }) => {
  const logged = useLogged()

  if (!logged) {
    return null
  }

  return children
}

export default Logged
