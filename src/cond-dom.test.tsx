import '@testing-library/jest-dom'
import React, { FC, JSXElementConstructor, PropsWithChildren } from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import { cond } from './cond'

const Div = (props) => <div data-testid="div" {...props} />
const Span = (props) => <span data-testid="span" {...props} />

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}

describe('<Cond />', () => {
  it('switches components', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const mapper = cond<JSXElementConstructor<unknown>>`
    ${isEven} ${Div}
    ${Span}
    `

    const Cond = ({ input, ...props }) => {
      const Component = mapper(input)
      return <Component {...props} />
    }

    render(
      <Wrapper>
        <Cond input={2}>div</Cond>
      </Wrapper>
    )

    expect(screen.getByText('div')).toBeInTheDocument()
    expect(screen.getByTestId('div')).toBeInTheDocument()
  })
})
