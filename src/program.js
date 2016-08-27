// @flow

import React from 'react'
import {Observable, Subject} from 'rx'
import {component} from './component'

import {caseOf} from './type-system'
import type {Typed, FnMap} from './type-system'

// ----- main functions ------
export type Reaction<M> = [M, Array<Observable>]

export type ProgramParam<M> = {
  init: Reaction<M>,
  update: UpdateFn<M, Reaction<M>>,
  view: ReactClass<{}>
}

export const createProgram = <M> ({
  init,
  update,
  view,
  // inputs, // TODO
}: ProgramParam<M>) => component('Program', () => {
  const rootEvent$ = new Subject()
  const handleEvent = msg => rootEvent$.onNext(msg)

  const update$ = Observable.just(init).concat(rootEvent$)
  .scan(([model], msg) => update(msg, model))
  .shareReplay(1)

  const model$ = update$.map(([model]) => model)
  const effect$ = update$
  .flatMap(([, effects]) => Observable.merge(effects))

  effect$.subscribe(handleEvent)

  return model$.map(model => React.createElement(
    view, {model, onEvent: handleEvent}
  ))
})

// ----- update function helper ------
export type UpdateFn<M, R> = (msg: Typed<any>, model: M) => R
export type UpdateFnMap<M, R> = { [key: string]: UpdateFn<M, R> }

export const createSimpleUpdate = <M> (updateMap: UpdateFnMap<M, M>): UpdateFn<M, M> => {
  const fnMap = {...updateMap}

  if (!fnMap._otherwise) {
    fnMap._otherwise = (_, model: any): any => model
  }

  return caseOf(fnMap)
}

export const createUpdate = <M, R: Reaction<M>> (updateMap: UpdateFnMap<M, R>): UpdateFn<M, R> => {
  const fnMap = {...updateMap}

  if (!fnMap._otherwise) {
    fnMap._otherwise = (_, model: any): any => [model, []]
  }

  return caseOf(fnMap)
}

export const fromSimpleInit = <M> (model: M): Reaction<M> => [model, []]
export const fromSimpleUpdate = <M, R> (
  update: UpdateFn<M, M>
): UpdateFn<M, Reaction<M>> => (
  (msg: Typed<any>, model: M) => [
    update(msg, model),
    []
  ]
)

