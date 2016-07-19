// TODO peer dependencies?
import React from 'react'
import ReactDOM from 'react-dom'
import {Observable, Subject} from 'rx'

// ----- main functions ------
// this only works on web
export const beginnerProgram = ({
  model,
  update,
  view
}, rootEl) => {
  const rootEvent$ = new Subject()
  const handleEvent = msg => rootEvent$.onNext(msg)

  const store$ = Observable.just(model).concat(rootEvent$)
  .scan((model, msg) => update(msg, model))

  store$.subscribe(model => {
    const root = React.createElement(
      view, {model, onEvent: handleEvent}
    )

    ReactDOM.render(root, rootEl)
  })
}
