import React from 'react'
import {Observable, Subject} from 'rx'
import {component} from './component'

// ----- main functions ------
export const beginnerProgram = ({
  model,
  update,
  view
}) => component('BeginnerProgram', () => {
  const rootEvent$ = new Subject()
  const handleEvent = msg => rootEvent$.onNext(msg)

  const store$ = Observable.just(model).concat(rootEvent$)
  .scan((model, msg) => update(msg, model))
  .share() // TODO implement CMD

  return store$.map(model => React.createElement(
    view, {model, onEvent: handleEvent}
  ))
})
