# Fun React

[![Join the chat at https://gitter.im/rayshih/fun-react](https://badges.gitter.im/rayshih/fun-react.svg)](https://gitter.im/rayshih/fun-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Fun React is a React framework.

## Why?

Because I love functional programming and ELM, but I can only use JS in work.

## Introduction

### If you know ELM:

Great! Fun React is perfect for you. Because it basically mimic almost everything of ELM 0.17. I bet you can know how to use Fun React right after check the following example.

### If you are using Redux:

The overall concept is the same: the state reducer. The main differences are:

1. We call `reducers` as `update` functions
2. We use simple type system to replace redux action
3. We use `program` instead of `<Provider />`
4. There is no `connect`.
	- For data, we encourage to pass data all the way down.
	- For event, we use very simple event system, there is only two function need to know:
		- `event`: event declaration
		- `link`: event binding between parent and children

### If you are using Cycle React:

TODO

## Installation

```
npm install --save fun-react cycle-react react rx
```

## Example

To run example

```bash
cd examples/__the_example__
npm install
npm start
```

then open `http://localhost:8080` in browser.

### Basic counter

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {
  createProgram,
  fromSimpleInit,
  fromSimpleUpdate,
  createTypes,
  caseOf,
  createView
} from '../../src'

// 1. define message types by function createTypes
const Msg = createTypes('INC', 'DEC')

// 2. define init data
const init = 0

// 3. define update function
const update = caseOf({
  INC: (_, count) => count + 1,
  DEC: (_, count) => count - 1
})

// 4. define view by function createView
const Counter = createView('Counter', ({model}, {event}) => (
  <div>
    <h1>Count: {model}</h1>
    <button onClick={event(Msg.INC)}>INC</button>
    <button onClick={event(Msg.DEC)}>DEC</button>
  </div>
))

// 5. compose program by the defined `init`, `update`, `view`
const Program = createProgram({
  init: fromSimpleInit(init),
  update: fromSimpleUpdate(update),
  view: Counter,
  inputs: () => []
})

// 6. mount the Program to actual DOM
const rootEl = document.getElementById('app')
ReactDOM.render(<Program />, rootEl)
```

### Nested counter

### Use with vanilla React

### Learn more

## Philosophy

The name imply the philosophy. So why name it Fun React:

1. We treat react element as a functor of event and the virtual dom is the context of the functor, so Fun React means: Functor React.
2. It is fun.

TODO explain what is Functor, and why can react element be a functor

## TODO

- restructure examples
	- nested counter
	- todo list
	- cycle interoperable
	- react interoperable
- write doc
	- README
	- API document
- add jsbin env
- add test
- Try to upgrade to rx 5 or annotate rx 4

## Contributers

- rayshih: that's me
- wuct: <https://github.com/wuct>
