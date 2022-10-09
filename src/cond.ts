import { parse } from './generated/parser'

function builder(
  strings: TemplateStringsArray,
  ...placeholders: unknown[]
): [string, Record<string, Function>] {
  let res = strings[0]
  let functions = {}

  for (let i = 1; i < strings.length; i++) {
    const placeholder = placeholders[i - 1]
    const isFunction = typeof placeholder === 'function'

    const interpolation = isFunction ? '$' + i : JSON.stringify(placeholder)
    isFunction && (functions['$' + i] = placeholder)

    res += `<${interpolation}>${strings[i]}`
  }

  return [res, functions]
}

export type Mapping = {
  [Key in `$${number}` | string]: Mapping | string
}

export type Cond = {
  map: Mapping
  functions: Record<string, Function>
}

export function cond(...arg: Parameters<typeof builder>): Cond {
  const [res, userFunctions] = builder(...arg)
  const { functions, map } = <Cond>parse(res.trim())

  return { map, functions: { ...functions, ...userFunctions } }
}

export function ap(...arg: Parameters<typeof builder>) {
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
