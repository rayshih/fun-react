import React from 'react'
import {Observable, Subject} from 'rx'
import {component} from './component'

// ----- main functions ------
export const createProgram = ({
  init,
  update,
  view,
  // inputs, // TODO
}) => component('Program', () => {
  const rootEvent$ = new Subject()
  const handleEvent = msg => rootEvent$.onNext(msg)

  const update$ = Observable.just(init).concat(rootEvent$)
  .scan(([model], msg) => update(msg, model))
  .share()

  const model$ = update$.map(([model]) => model)
  const effect$ = update$
  .flatMap(([, effects]) => Observable.merge(effects))

  effect$.subscribe(handleEvent)

  return model$.map(model => React.createElement(
    view, {model, onEvent: handleEvent}
  ))
})
