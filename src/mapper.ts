import { parse } from './generated/parser'

export type Mapping<T = string> = {
  [Key in `$$${number}` | string]: Mapping<T> | T
}

export type Cond<T> = {
  map: Mapping<T>
  functions: Record<string, Function>
}

type Placeholder =
  | Function
  | ((input: number) => boolean)
  | ((input: string) => boolean)
  | string
  | number
  | Record<string, unknown>

function builder<T extends Placeholder>(
  strings: TemplateStringsArray,
  ...placeholders: T[]
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

export function mapper<T>(...arg: Parameters<typeof builder>): Cond<T> {
  const [res, userFunctions] = builder(...arg)

  const { functions, map } = <Cond<T>>parse(res.trim())

  return {
    map,
    functions: { ...functions, ...userFunctions },
  }
}
