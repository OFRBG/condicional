import { mapper, Mapping } from './mapper'

export function cond<T>(...arg: Parameters<typeof mapper>) {
  const { map, functions } = mapper<T>(...arg)

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

    if (typeof current === 'string' && current[0] === '$') {
      return functions[current] as T
    }

    return current
  }
}
