import React from 'react'
import { useLogged, useUnauthorizedComponent } from './Provider'

export interface LoggedProps {
  children: React.ReactElement
  otherwiseComponent?: React.ReactElement
  showAnauthorizedComponent?: boolean
}

const Logged: React.FC<LoggedProps> = ({
  children,
  otherwiseComponent: OtherwiseComponent,
  showAnauthorizedComponent
}) => {
  const logged = useLogged()
  const UnauthorizedComponent = useUnauthorizedComponent()

  if (!logged) {
    if (OtherwiseComponent) {
      return OtherwiseComponent
    }

    if (showAnauthorizedComponent) {
      return UnauthorizedComponent
    }
    return null
  }

  return children
}

export default Logged
