import { cond, Mapping } from './cond'

export function ap<T extends string>(...arg: Parameters<typeof cond>) {
  const { map, functions } = cond<T>(...arg)

  return (value: any): T | undefined => {
    let current: Mapping<T> | T = map

    while (typeof current === 'object') {
      if (current[value]) {
        current = current[value]
        continue
      }

      let match: Mapping<T> | T

      for (const key of Object.keys(current)) {
        if (key[0] === '$' && functions[key](value)) {
          match = current[key]
          break
        }
      }

      current = match ?? current['*']
    }

    return current
  }
}
