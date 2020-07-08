import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ReactACLProvider, Can, or, Logged } from '../lib'

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

const WithMatchRoles: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => ['user:read', 'user:create']}
    >
      <h1>Read an users</h1>
      <Can match={or('user:read', 'user:show')}>
        {accept => accept ? <p>true</p> : <p>false</p>}
      </Can>
    </ReactACLProvider>
  )
}

const WithUnauthorizedComponent: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
      defaultUnauthorizedComponent={ <div data-denied="denied">unauthorized</div>}
    >
      <h1>Read an users</h1>
      <Can match={or('user:read', 'user:show')} showAnauthorizedComponent>
        <p>content</p>
      </Can>
    </ReactACLProvider>
  )
}

const WithDefaultUnauthorizedComponent: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
    >
      <h1>Read an users</h1>
      <Can match={or('user:read', 'user:show')} showAnauthorizedComponent>
        <p>content</p>
      </Can>
    </ReactACLProvider>
  )
}

const CustomUnauthorizedComponent: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
    >
      <h1>Read an users</h1>
      <Can match={or('user:read', 'user:show')} otherwiseComponent={<span>denied</span>}>
        <p>content</p>
      </Can>
    </ReactACLProvider>
  )
}

const WithUnauthorizedComponentLogged: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
      defaultUnauthorizedComponent={ <div data-denied="denied">unauthorized</div>}
    >
      <h1>Read an users</h1>
      <Logged showAnauthorizedComponent>
        <p>content</p>
      </Logged>
    </ReactACLProvider>
  )
}

const WithDefaultUnauthorizedComponentLogged: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
    >
      <h1>Read an users</h1>
      <Logged showAnauthorizedComponent>
        <p>content</p>
      </Logged>
    </ReactACLProvider>
  )
}

const CustomUnauthorizedComponentLogged: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialUser={() => false}
    >
      <h1>Read an users</h1>
      <Logged otherwiseComponent={<span>denied</span>}>
        <p>content</p>
      </Logged>
    </ReactACLProvider>
  )
}

const NoRolesApplied: React.FC = () => {
  return (
    <ReactACLProvider
      extractInitialRole={() => ['user:read', 'user:create']}
    >
      <h1>Read an users</h1>
      <Can>
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

  test('it should render <p>true</p> with render props and custom match rules', () => {
    const { container } = render(<WithMatchRoles />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(1)
    expect(paragraphs[0]).not.toBeNull()
    expect(paragraphs[0]).toHaveTextContent('true')
  })

  test('it should render <p>true</p> when no rules have been applied', () => {
    const { container } = render(<NoRolesApplied />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(1)
    expect(paragraphs[0]).not.toBeNull()
    expect(paragraphs[0]).toHaveTextContent('true')
  })

  test('It should render the unauthorized component', () => {
    const { container } = render(<WithUnauthorizedComponent />)
    const unauthorizedComponent = container.querySelector('[data-denied="denied"]')
    expect(unauthorizedComponent).not.toBeNull()
    expect(unauthorizedComponent).toHaveTextContent('unauthorized')
  })

  test('It should render the default unauthorized component', () => {
    const { container } = render(<WithDefaultUnauthorizedComponent />)
    const unauthorizedComponent = container.querySelector('p')
    expect(unauthorizedComponent).not.toBeNull()
    expect(unauthorizedComponent).toHaveTextContent('unauthorized')
  })

  test('It shoulbe render an custom unauthorized component', () => {
    const { container } = render(<CustomUnauthorizedComponent />)
    const unauthorizedComponent = container.querySelector('span')
    expect(unauthorizedComponent).not.toBeNull()
    expect(unauthorizedComponent).toHaveTextContent('denied')
  })

  test('It should render the unauthorized component', () => {
    const { container } = render(<WithUnauthorizedComponentLogged />)
    const unauthorizedComponent = container.querySelector('[data-denied="denied"]')
    expect(unauthorizedComponent).not.toBeNull()
    expect(unauthorizedComponent).toHaveTextContent('unauthorized')
  })

  test('It should render the default unauthorized component', () => {
    const { container } = render(<WithDefaultUnauthorizedComponentLogged />)
    const unauthorizedComponent = container.querySelector('p')
    expect(unauthorizedComponent).not.toBeNull()
    expect(unauthorizedComponent).toHaveTextContent('unauthorized')
  })

  test('It shoulbe render an custom unauthorized component', () => {
    const { container } = render(<CustomUnauthorizedComponentLogged />)
    const unauthorizedComponent = container.querySelector('span')
    expect(unauthorizedComponent).not.toBeNull()
    expect(unauthorizedComponent).toHaveTextContent('denied')
  })
})
