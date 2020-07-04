import ProcessRule, { and, or } from '@lib/utils/includesRules'

describe('Includes rules', () => {
  test("It should be return true if has role 'user:list'", () => {
    const rules = ['user:list']
    const matches = ProcessRule(or('user:list'), rules)
    expect(matches).toBe(true)
  })

  test("It should be return true if has any role in ['user:list', 'user:create']", () => {
    const rules = ['user:show', 'user:delete', 'user:list', 'user:create']
    const matches = ProcessRule(or('user:list', 'user:create'), rules)
    expect(matches).toBe(true)
  })

  test("It should be return false if has not all role in ['user:list', 'user:create']", () => {
    const rules = ['user:show', 'user:delete', 'user:create']
    const matches = ProcessRule(and('user:list', 'user:create'), rules)
    expect(matches).toBe(false)
  })

  test('It should be return combine conditions', () => {
    let rules = ['user:show', 'user:edit']
    let matches = ProcessRule(and('user:edit', or('user:show', 'user:list')), rules)
    expect(matches).toBe(true)

    rules = ['user:list', 'user:edit']
    matches = ProcessRule(and('user:edit', or('user:show', 'user:list')), rules)
    expect(matches).toBe(true)

    rules = ['user:edit']
    matches = ProcessRule(and('user:edit', or('user:show', 'user:list')), rules)
    expect(matches).toBe(false)

    rules = ['user:show']
    matches = ProcessRule(and('user:edit', or('user:show', 'user:list')), rules)
    expect(matches).toBe(false)

    rules = ['user:show', 'user:list']
    matches = ProcessRule(or('user:edit', and('user:show', 'user:list')), rules)
    expect(matches).toBe(true)

    rules = ['user:edit']
    matches = ProcessRule(or('user:edit', and('user:show', 'user:list')), rules)
    expect(matches).toBe(true)

    rules = ['user:show']
    matches = ProcessRule(or('user:edit', and('user:show', 'user:list')), rules)
    expect(matches).toBe(false)
  })
})
