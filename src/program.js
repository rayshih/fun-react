// @flow

import React from 'react'
import {Observable, Subject} from 'rx'
import {component} from './component'
import type {ComponentOptions} from './component'

import type {Typed, MapFn} from './type-system'
import {DEV_MODE, config} from './config'

// ----- main functions ------
export type UpdateFn<M, R> = MapFn<Typed<any>, M, R>
export type Reaction<M> = [M, Array<Observable>]
export type UpdateFnR<M> = UpdateFn<M, Reaction<M>> // UpdateFn with Reaction

export type ProgramParam<M> = {
  init: Reaction<M>,
  update: UpdateFn<M, Reaction<M>>,
  view: ReactClass<*>,
  inputs: (model: M) => Array<Observable>,
  options?: ComponentOptions
}

export const createProgram = <M> ({
  init,
  update,
  view,
  inputs,
  options,
}: ProgramParam<M>) => component('Program', () => {
  const rootEvent$ = new Subject()
  const dispatchMsg = msg => {
    if (DEV_MODE && config.logEvents) console.log(msg)
    rootEvent$.onNext(msg)
  }

  // update
  const update$ = Observable.just(init).concat(rootEvent$)
  .scan(([model], msg) => update(msg, model))
  .shareReplay(1)

  // model update
  const model$ = update$.map(([model]) => model)

  // side effect triggered by msg
  const effect$ = update$
  .flatMap(([, effects]) => Observable.merge(effects).delay(10))

  // inputs: global side effect, a.k.a subscription
  const input$ = model$.switchMap(model => {
    const obsList = inputs(model)
    return Observable.merge(obsList)
  })

  effect$
  .merge(input$)
  .subscribe(dispatchMsg)

  return model$.map(model => React.createElement(
    view, {model, onEvent: dispatchMsg}
  ))
}, options)

// ----- update function helper ------
export const fromSimpleInit = <M> (model: M): Reaction<M> => [model, []]
export const fromSimpleUpdate = <M> (
  update: UpdateFn<M, M>
): UpdateFn<M, Reaction<M>> => (
  (msg: Typed<any>, model: M) => [
    update(msg, model),
    []
  ]
)

