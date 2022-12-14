import { mapper } from './mapper'

const pair = (k: string, v: unknown) => ({ [k]: v })
const shape = (map: unknown, functions: unknown = {}) => ({ map, functions })

describe('mapper', () => {
  it('parses a simple pair', () => {
    const result = mapper`k1 v1`

    expect(result).toEqual(shape(pair('k1', 'v1')))
  })

  it('parses multiple pairs', () => {
    const result = mapper`k1 v1 k2 v2`

    expect(result).toEqual(shape({ ...pair('k1', 'v1'), ...pair('k2', 'v2') }))
  })

  it('parses padded input', () => {
    const result = mapper`
        k1
        v1
    `

    expect(result).toEqual(shape(pair('k1', 'v1')))
  })

  it('parses nested input', () => {
    const result = mapper`k1 { k2 v2 }`

    expect(result).toEqual(shape(pair('k1', pair('k2', 'v2'))))
  })

  it('parses interpolated values', () => {
    const result = mapper`k1 ${'v2'}`

    expect(result).toEqual(shape(pair('k1', 'v2')))
  })

  it('parses interpolated objects', () => {
    const result = mapper`k1 ${{ jsKey1: 'jsValue1' }}`

    expect(result).toEqual(shape(pair('k1', { jsKey1: 'jsValue1' })))
  })

  it('parses conditions', () => {
    const result = mapper`>0 v1`
    const expected = shape(pair('$$1', 'v1'), {
      $$1: () => {},
    })

    expect(result.map).toEqual(expected.map)

    expect(result.functions['$$1'](1)).toBe(true)
    expect(result.functions['$$1'](-1)).toBe(false)
  })

  it('parses without static values', () => {
    const result = mapper`${1} ${'v1'} ${2}`
    const expected = shape({ ...pair('1', 'v1'), ...pair('*', 2) })

    expect(result.map).toEqual(expected.map)
  })

  it('parses nested conditions', () => {
    const result = mapper`>0 {<10 v1}`

    const expected = shape(pair('$$1', pair('$$2', 'v1')), {
      $$1: expect.any(Function),
      $$2: expect.any(Function),
    })

    expect(result).toMatchObject(expected)

    expect(result.functions['$$1'](1)).toBe(true)
    expect(result.functions['$$1'](-1)).toBe(false)

    expect(result.functions['$$2'](9)).toBe(true)
    expect(result.functions['$$2'](11)).toBe(false)
  })
})
