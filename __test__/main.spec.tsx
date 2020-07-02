import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe('Main test', () => {
  it('it should render an <p>david</p>', () => {
    const { container } = render(<p>david</p>)
    expect(container).toHaveTextContent('david')
  })
})
