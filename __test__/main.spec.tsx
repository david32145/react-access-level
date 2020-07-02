import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ReactACLProvider, Can } from '@lib/index.ts'

afterEach(cleanup)

const UserList = () => (
  <ul className="user-list">
    <li>User 1</li>
    <li>User 2</li>
    <li>User 3</li>
  </ul>
)

const WithRoles: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => [{ resource: 'user', authority: 'read' }]}
    >
      <h1>Read an users</h1>
      <Can resource="user" authority="read">
        <UserList />
      </Can>
    </ReactACLProvider>
  )
}

const WithoutRoles: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => []}
    >
      <h1>Read an users</h1>
      <Can resource="user" authority="read">
        <UserList />
      </Can>
    </ReactACLProvider>
  )
}

describe('Main test', () => {
  it('it should not render <UserList />', () => {
    const { container } = render(<WithoutRoles />)
    const userList = container.querySelector('.user-list')
    expect(userList).toBeNull()
  })

  it('it should render <UserList />', () => {
    const { container } = render(<WithRoles />)
    const userList = container.querySelector('.user-list')
    expect(userList).not.toBeNull()
    expect(userList?.querySelectorAll('li').length).toBe(3)
  })
})
