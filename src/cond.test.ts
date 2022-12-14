import { cond } from './cond'

describe('cond', () => {
  it('matches simple objects', () => {
    const result = cond`
    k1 v1
    k2 v2
    `('k1')

    expect(result).toBe('v1')
  })

  it('matches conditionals', () => {
    const fn = cond`
    >0 v1
    <-10 v2
    catchall
    `

    expect(fn(22)).toBe('v1')
    expect(fn(-11)).toBe('v2')
    expect(fn(-2)).toBe('catchall')
  })

  it('matches nested conditionals', () => {
    const fn = cond`
    >0 {
      <10 v2
      <100 v3
      catchall2
    }
    catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(9)).toBe('v2')
    expect(fn(55)).toBe('v3')
    expect(fn(101)).toBe('catchall2')
  })

  it.fails('matches with input key objects', () => {
    const fn = cond`
    { ${{ 5: 'v2', 6: 'v3' }} v1 } catchall1
    `

    expect(fn(5)).toBe('v3')
  })

  it('matches with input predicate objects', () => {
    const fn = cond`
    >0 ${{ 5: 'v2', 6: 'v3' }}
    catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(5)).toBe('v2')
    expect(fn(6)).toBe('v3')
  })

  it('matches with input conditionals', () => {
    const fn = cond`
    ${(v) => v < 10} v1
    ${(v) => v > 10} v2
    ${(v) => v === 10} v3
    `

    expect(fn(-1)).toBe('v1')
    expect(fn(11)).toBe('v2')
    expect(fn(10)).toBe('v3')
  })

  it('matches with nested input conditionals', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${(v) => v < 10} {
      ${isEven} 0
      1
    } 
    catchall1
    `

    expect(fn(11)).toBe('catchall1')
    expect(fn(6)).toBe('0')
    expect(fn(5)).toBe('1')
  })

  it('matches with types', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${(v) => v < 10} {
      ${isEven} 0
      1
    } 
    catchall1
    `

    expect(fn(11)).toBe('catchall1')
    expect(fn(6)).toBe('0')
    expect(fn(5)).toBe('1')
  })
})

describe('cond', () => {
  it('matches simple objects', () => {
    const result = cond`
    k1 v1
    k2 v2
    `('k1')

    expect(result).toBe('v1')
  })

  it('matches conditionals', () => {
    const fn = cond`
    >0 v1
    <-10 v2
    catchall
    `

    expect(fn(22)).toBe('v1')
    expect(fn(-11)).toBe('v2')
    expect(fn(-2)).toBe('catchall')
  })

  it('matches nested conditionals', () => {
    const fn = cond`
    >0 {
      <10 v2
      <100 v3
      catchall2
    }
    catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(9)).toBe('v2')
    expect(fn(55)).toBe('v3')
    expect(fn(101)).toBe('catchall2')
  })

  it.fails('matches with input key objects', () => {
    const fn = cond`
    { ${{ 5: 'v2', 6: 'v3' }} v1 } catchall1
    `

    expect(fn(5)).toBe('v3')
  })

  it('matches with input predicate objects', () => {
    const fn = cond`
    >0 ${{ 5: 'v2', 6: 'v3' }}
    catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(5)).toBe('v2')
    expect(fn(6)).toBe('v3')
  })

  it('matches with input conditionals', () => {
    const fn = cond`
    ${(v) => v < 10} v1
    ${(v) => v > 10} v2
    ${(v) => v === 10} v3
    `

    expect(fn(-1)).toBe('v1')
    expect(fn(11)).toBe('v2')
    expect(fn(10)).toBe('v3')
  })

  it('matches with nested input conditionals', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${(v) => v < 10} {
      ${isEven} 0
      1
    } 
    catchall1
    `

    expect(fn(11)).toBe('catchall1')
    expect(fn(6)).toBe('0')
    expect(fn(5)).toBe('1')
  })

  it('matches with types', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${(v) => v < 10} {
      ${isEven} 0
      1
    } 
    catchall1
    `

    expect(fn(11)).toBe('catchall1')
    expect(fn(6)).toBe('0')
    expect(fn(5)).toBe('1')
  })

  it('returns user values', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${isEven} ${isEven}
    catchall1
    `

    expect(fn(2)).toBe(isEven)
    expect(fn(3)).toBe('catchall1')
  })
})

describe('<Cond />', () => {
  it('matches simple objects', () => {
    const result = cond`
    k1 v1
    k2 v2
    `('k1')

    expect(result).toBe('v1')
  })

  it('matches conditionals', () => {
    const fn = cond`
    >0 v1
    <-10 v2
    catchall
    `

    expect(fn(22)).toBe('v1')
    expect(fn(-11)).toBe('v2')
    expect(fn(-2)).toBe('catchall')
  })

  it('matches nested conditionals', () => {
    const fn = cond`
    >0 {
      <10 v2
      <100 v3
      catchall2
    }
    catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(9)).toBe('v2')
    expect(fn(55)).toBe('v3')
    expect(fn(101)).toBe('catchall2')
  })

  it.fails('matches with input key objects', () => {
    const fn = cond`
    { ${{ 5: 'v2', 6: 'v3' }} v1 } catchall1
    `

    expect(fn(5)).toBe('v3')
  })

  it('matches with input predicate objects', () => {
    const fn = cond`
    >0 ${{ 5: 'v2', 6: 'v3' }}
    catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(5)).toBe('v2')
    expect(fn(6)).toBe('v3')
  })

  it('matches with input conditionals', () => {
    const fn = cond`
    ${(v) => v < 10} v1
    ${(v) => v > 10} v2
    ${(v) => v === 10} v3
    `

    expect(fn(-1)).toBe('v1')
    expect(fn(11)).toBe('v2')
    expect(fn(10)).toBe('v3')
  })

  it('matches with nested input conditionals', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${(v) => v < 10} {
      ${isEven} 0
      1
    } 
    catchall1
    `

    expect(fn(11)).toBe('catchall1')
    expect(fn(6)).toBe('0')
    expect(fn(5)).toBe('1')
  })

  it('matches with types', () => {
    const isEven = (v) => Number(v) % 2 === 0

    const fn = cond`
    ${(v) => v < 10} {
      ${isEven} 0
      1
    } 
    catchall1
    `

    expect(fn(11)).toBe('catchall1')
    expect(fn(6)).toBe('0')
    expect(fn(5)).toBe('1')
  })
})

describe('<Cond />', () => {
  it('switches components', () => {})
})
