import React from 'react'
import { useLogged } from './store'

export interface NotLoggedProps {
  children: React.ReactElement
}

const NotLogged: React.FC<NotLoggedProps> = ({ children }) => {
  const logged = useLogged()

  if (logged) {
    return null
  }

  return children
}

export default NotLogged
