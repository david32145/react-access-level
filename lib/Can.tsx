import React, { useMemo } from 'react'
import { useRoles, useMatch, useUnauthorizedComponent } from './Provider'
import { QueryRule } from './typings'
import { includesRules } from './RulesUtil'

function isCanRenderProps (children: CanChildren): children is CanRenderProps {
  if (children instanceof Function) {
    return true
  }
  return false
}

type CanRenderProps = (accept: boolean) => React.ReactElement

type CanChildren = CanRenderProps | JSX.Element

export interface CanProps {
  resource?: string
  authority?: string
  match?: QueryRule
  children: CanChildren,
  otherwiseComponent?: React.ReactElement
  showAnauthorizedComponent?: boolean
}

const Can: React.FC<CanProps> = ({
  children,
  resource,
  authority,
  match,
  otherwiseComponent: OtherwiseComponent,
  showAnauthorizedComponent
}) => {
  const roles = useRoles()
  const matchRules = useMatch()
  const UnauthorizedComponent = useUnauthorizedComponent()

  const accept = useMemo(() => {
    if (match) {
      return matchRules(match)
    } else {
      if (resource && authority) {
        return includesRules(`${resource}:${authority}`, roles)
      }
    }
    return true
  }, [roles, matchRules, resource, authority, match])

  if (isCanRenderProps(children)) {
    return children(accept)
  }

  if (!accept) {
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

export default Can
