import { parse } from './generated/parser'

export type Mapping<T extends string = string> = {
  [Key in `$$${number}` | string]: Mapping<T> | T
}

export type Cond<T extends string> = {
  map: Mapping<T>
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

export function mapper<T extends string>(
  ...arg: Parameters<typeof builder>
): Cond<T> {
  const [res, userFunctions] = builder(...arg)

  const { functions, map } = <Cond<T>>parse(res.trim())

  return {
    map,
    functions: { ...functions, ...userFunctions },
  }
}
