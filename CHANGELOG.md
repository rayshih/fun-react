# Change Log

## v0.3.8

2017-04-25

- Upgrade flow to 0.40 and fix warning

## v0.3.7

2017-04-25

- Add ComponentOptions arguments.

## v0.3.6

2017-03-03

- upgrade flow to 0.37 and fix warning

## v0.3.5

2016-12-11

- upgrade npm dependency
- partially fix flowtype error

## v0.3.4

2016-11-27

- fix rootComponent type annotation
- fix rootComponent application timing problem

## v0.3.3

2016-11-22

- add rootComponent config

## v0.3.2

2016-10-30

- fix race condition problem
- add `logViewRender` and `logEvents` config to help debug and performance tuning

## v0.3.0

2016-10-16

- refactor shallow compare to prevent unsupport Symbol problem in react native

2016-10-7

- fix null react key expose problem
- migrate counter-pair example


2016-09-18

- implement `createView` (simplier view definition)
- port counter example
- fix trace function

## v0.2.0

2016-09-07

- implement inputs(subscription)
- add `UpdateFnR<M>` type, which equals to `UpdateFn<M, Reaction<M>>`

## v0.1.3

2016-09-03

- add @flow to index.js

## v0.1.2

2016-09-03

- fix Proxy not found problem
- try flow-copy-source
- fix events not defined (cycle interface)
- implement props.select

## v0.1.1

- try babel flow comment plugin

## v0.1.0

- 2016-08-29: introduce flowtype and remove `createUpdate` function

