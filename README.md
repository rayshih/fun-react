# Fun React

Fun React is a React framework.

## Introduction

### If you know ELM:

Great! Fun React is perfect for you. Because it basically mimic almost everything of ELM 0.17. I bet you can know how to use Fun React right after check the following example.

### If you are using Redux:

The overall concept is the same: the state reducer. The main differences are:

1. We call `reducers` as `update` functions
2. We use simple type system to replace redux action
3. We use `program` instead of `<Provider />`
4. There is no `connect`. For data, we encourage to pass data all the way down. For event, we use very simple event system, there is only two function need to know:
	- `event`: event declaration
	- `link`: event binding between parent and children


### If you are using Cycle React:

TODO

## Installation

```
npm install --save fun-react cycle-react react rx
```

## Example


## Philosophy

Why name it Fun React:

1. We treat react element as a functor of event and the virtual dom is the context of the functor, so Fun React means: Functor React.
2. It is fun.


## TODO

- write doc
- restructure examples
- add test
