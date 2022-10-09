import { ap } from './ap'

describe('ap', () => {
  it('matches simple objects', () => {
    const result = ap`
    {k1 v1}
    {k2 v2}
    `('k1')

    expect(result).toBe('v1')
  })

  it('matches conditionals', () => {
    const fn = ap`
    {>0 v1}
    {<-10 v2}
    catchall
    `

    expect(fn(22)).toBe('v1')
    expect(fn(-11)).toBe('v2')
    expect(fn(-2)).toBe('catchall')
  })

  it('matches nested conditionals', () => {
    const fn = ap`
    {>0
        {<10 v2}
        {<100 v3}
        catchall2
    } catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(9)).toBe('v2')
    expect(fn(55)).toBe('v3')
    expect(fn(101)).toBe('catchall2')
  })

  it.fails('matches with userland key objects', () => {
    const fn = ap`
    { ${{ 5: 'v2', 6: 'v3' }} v1 } catchall1
    `

    expect(fn(5)).toBe('v3')
  })

  it('matches with userland predicate objects', () => {
    const fn = ap`
    {>0
        ${{ 5: 'v2', 6: 'v3' }}
    } catchall1
    `

    expect(fn(-1)).toBe('catchall1')
    expect(fn(5)).toBe('v2')
    expect(fn(6)).toBe('v3')
  })

  it('matches with userland conditionals', () => {
    const fn = ap`
    {${(v) => v < 10} v1}
    catchall1
    `

    expect(fn(-1)).toBe('v1')
  })
})
