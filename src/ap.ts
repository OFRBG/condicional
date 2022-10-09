import { cond, Mapping } from './cond'

export function ap(...arg: Parameters<typeof cond>) {
  const { map, functions } = cond(...arg)

  return (value: any): string | undefined => {
    let current: Mapping | string = map

    while (typeof current === 'object') {
      if (current[value]) {
        current = current[value]
        continue
      }

      let match: Mapping | string

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
