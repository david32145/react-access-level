import React from 'react'
import { useRules, Rule } from './store'

const includesRule = (rule: Rule, rules: string[]): boolean => {
  return rules.includes(`${rule.resource}:${rule.authority}`)
}

function isCanRenderProps (children: CanChildren): children is CanRenderProps {
  if (children instanceof Function) {
    return true
  }
  return false
}

type CanRenderProps = (accept: boolean) => React.ReactElement

type CanChildren = CanRenderProps | JSX.Element

export interface CanProps {
  resource: string
  authority: string
  children: CanChildren
}

const Can: React.FC<CanProps> = ({ children, ...rule }) => {
  const rules = useRules()
  const accept = includesRule(rule, rules)

  if (isCanRenderProps(children)) {
    return children(accept)
  }

  if (!accept) {
    return null
  }

  return <>{children}</>
}

export default Can
