import React, { useMemo } from 'react'
import { useRules, useMatch } from './Provider'
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
  children: CanChildren
}

const Can: React.FC<CanProps> = ({ children, resource, authority, match }) => {
  const rules = useRules()
  const matchRules = useMatch()

  const accept = useMemo(() => {
    if (match) {
      return matchRules(match)
    } else {
      if (resource && authority) {
        return includesRules(`${resource}:${authority}`, rules)
      }
    }
    return true
  }, [rules, matchRules, resource, authority, match])

  if (isCanRenderProps(children)) {
    return children(accept)
  }

  if (!accept) {
    return null
  }

  return children
}

export default Can
