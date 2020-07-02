import React from 'react'
import { useRules, Rule } from './store'

const includesRule = (rule: Rule, rules: Rule[]): boolean => {
  return rules.findIndex(rl =>
    rl.resource === rule.resource &&
    rl.authority === rule.authority
  ) !== -1
}

export interface CanProps {
  resource: string
  authority: string
}

const Can: React.FC<CanProps> = ({ children, ...rule }) => {
  const rules = useRules()
  if (!includesRule(rule, rules)) {
    return null
  }
  return <>{children}</>
}

export default Can
