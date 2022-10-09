<div id="top"></div>

[![npm](https://img.shields.io/npm/v/condicional?style=flat-square)](https://www.npmjs.com/package/condicional)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/condicional?style=flat-square)](https://bundlephobia.com/package/condicional)
[![GitHub license](https://img.shields.io/github/license/ofrbg/condicional?style=flat-square)](https://github.com/ofrbg/condicional/blob/main/LICENSE)

<br />
<div align="center">
  <a href="https://github.com/ofrbg/condicional">
    <img src="assets/logo.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">condicional</h3>

  <p align="center">
    Maybe better conditionals
    <br />
    <a href="https://github.com/ofrbg/condicional/issues">Report Bug</a>
    ·
    <a href="https://github.com/ofrbg/condicional/issues">Request Feature</a>
  </p>
</div>

## About The Project

<blockquote>
  ⚠️ `condicional` is based on a PEG grammar and is not battle-tested.
</blockquote>

Often times there's some mapping logic that needs to be applied to components to return values. Simple mappings can be achieved with a plain object. Adding a default value commonly adds an edge case. Things get more complicated once logic needs to be applied to an input e.g. the input is odd. The uncommon but existing case is nesting logic for checks. The tool that most resembles what comfortably covers these cases is Ramda's `cond` and its derivatives. However, it lacks feature richness and suffers from array overload.

<p align="right">(<a href="#top">back to top</a>)</p>

### Package Details

- [npm](https://www.npmjs.com/package/condicional)
- [Bundlephobia](https://bundlephobia.com/package/condicional)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

`condicional` uses tagged template literals to combine runtime data and static pieces in a single, concise mapper. The syntax in a nutshell is

```ts
cond`
  static_value_1 result_1
  static_value_2 result_2
  ${isEven} {
    static_value_3 result_3
    fallback_1
  }
  fallback
`
```

### Installation

```sh
pnpm add condicional
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Basic Usage

Just import `cond` from `condicional` and build your mapper.

```ts
const mapper = cond`
  ${isEven} 0
  ${isOdd} 1
  ${'not an integer'}
`

mapper(10) === '0' // true
mapper(5) === '1' // true
mapper(0.5) === 'not an integer' // true
```
