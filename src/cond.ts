import { parse } from './generated/parser'

export type Mapping = {
  [Key in `$$${number}` | string]: Mapping | string
}

export type Cond = {
  map: Mapping
  functions: Record<string, Function>
}

function builder(
  strings: TemplateStringsArray,
  ...placeholders: unknown[]
): [string, Record<string, Function>] {
  let res = strings[0]
  let functions = {}

  for (let i = 1; i < strings.length; i++) {
    const placeholder = placeholders[i - 1]
    const isFunction = typeof placeholder === 'function'

    const input = isFunction ? '$' + i : placeholder
    isFunction && (functions['$' + i] = placeholder)

    res += `<${JSON.stringify(input)}>${strings[i]}`
  }

  return [res, functions]
}

export function cond(...arg: Parameters<typeof builder>): Cond {
  const [res, userFunctions] = builder(...arg)

  const { functions, map } = <Cond>parse(res.trim())

  return {
    map,
    functions: { ...functions, ...userFunctions },
  }
}
