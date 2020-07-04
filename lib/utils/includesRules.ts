import { QueryArray, QueryRule } from '@lib/models'
export function includesRules (rule: string, rules: string[]) {
  return rules.includes(rule)
}

export function and (...requiredRules: Array<object | string>): object {
  return {
    and: requiredRules
  }
}

export function or (...requiredRules: Array<object | string>): object {
  return {
    or: requiredRules
  }
}

export function processAnd (query: QueryArray, rules: string[]): boolean {
  for (let i = 0; i < query.length; i++) {
    const queryItem = query[i]
    let value: boolean | undefined
    if (queryItem instanceof Object) {
      value = process(queryItem, rules)
    } else {
      value = includesRules(queryItem, rules)
    }
    if (!value) {
      return false
    }
  }
  return true
}

export function processOr (query: QueryArray, rules: string[]): boolean {
  for (let i = 0; i < query.length; i++) {
    const queryItem = query[i]
    let value: boolean | undefined
    if (!(queryItem instanceof Object)) {
      value = includesRules(queryItem, rules)
    } else {
      value = process(queryItem, rules)
    }
    if (value) {
      return true
    }
  }
  return false
}

export default function process (obj: QueryRule, rules: string[]): boolean {
  if (obj.and) {
    return processAnd(obj.and, rules)
  } else {
    return processOr(obj.or!, rules)
  }
}
