import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ReactACLProvider, Can } from '@lib/index.ts'

afterEach(cleanup)

const UserList: React.FC = () => (
  <ul data-component="userlist">
    <li>User 1</li>
    <li>User 2</li>
    <li>User 3</li>
  </ul>
)

const WithRoles: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => ['user:read']}
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

const WithoutRoleRenderProps: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => []}
    >
      <h1>Read an users</h1>
      <Can resource="user" authority="read">
        {accept => accept ? <p>true</p> : <p>false</p>}
      </Can>
    </ReactACLProvider>
  )
}

const WithRoleRenderProps: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => ['user:read']}
    >
      <h1>Read an users</h1>
      <Can resource="user" authority="read">
        {accept => accept ? <p>true</p> : <p>false</p>}
      </Can>
    </ReactACLProvider>
  )
}

describe('Main test', () => {
  test('it should not render <UserList />', () => {
    const { container } = render(<WithoutRoles />)
    const userList = container.querySelector('[data-component="userlist"]')
    expect(userList).toBeNull()
  })

  test('it should render <UserList />', () => {
    const { container } = render(<WithRoles />)
    const userList = container.querySelector('[data-component="userlist"]')
    expect(userList).not.toBeNull()
    expect(userList?.querySelectorAll('li').length).toBe(3)
  })

  test('it should render <p>false</p> with render props', () => {
    const { container } = render(<WithoutRoleRenderProps />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(1)
    expect(paragraphs[0]).not.toBeNull()
    expect(paragraphs[0]).toHaveTextContent('false')
  })

  test('it should render <p>true</p> with render props', () => {
    const { container } = render(<WithRoleRenderProps />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(1)
    expect(paragraphs[0]).not.toBeNull()
    expect(paragraphs[0]).toHaveTextContent('true')
  })
})
