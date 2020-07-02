import React from 'react'
import { useRules, Rule } from './store'

const includesRule = (rule: Rule, rules: string[]): boolean => {
  return rules.includes(`${rule.resource}:${rule.authority}`)
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
