// @flow

import React from 'react'
import {Observable, Subject} from 'rx'
import {component} from './component'

import type {Typed, MapFn} from './type-system'

// ----- main functions ------
export type UpdateFn<M, R> = MapFn<Typed<any>, M, R>
export type Reaction<M> = [M, Array<Observable>]
export type UpdateFnR<M> = UpdateFn<M, Reaction<M>> // UpdateFn with Reaction

export type ProgramParam<M> = {
  init: Reaction<M>,
  update: UpdateFn<M, Reaction<M>>,
  view: ReactClass<*>
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
export const fromSimpleInit = <M> (model: M): Reaction<M> => [model, []]
export const fromSimpleUpdate = <M, R> (
  update: UpdateFn<M, M>
): UpdateFn<M, Reaction<M>> => (
  (msg: Typed<any>, model: M) => [
    update(msg, model),
    []
  ]
)

