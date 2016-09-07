// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {Observable} from 'rx'
import {
  createTypes,
  caseOf,
  component,
  createProgram,
  fromSimpleInit,
  fromSimpleUpdate,
} from '../../src'

const init = new Date()

const Msg = createTypes('Tick')

// 3. define update function (the reducer)
const update = caseOf({
  Tick: time => time
})

// 4. define view
const Time = component('Time', ({event}, props) => {
  return props.get('model').map(model => (
    <div>
      {model.toString()}
    </div>
  ))
})

const rootEl = document.getElementById('app')

// need seperate declare, otherwise it will re-generate
// observable every time model changed
const tick$ = Observable.interval(1000).map(() => Msg.Tick(new Date()))
const inputs = () => [tick$]

const Program = createProgram({
  init: fromSimpleInit(init),
  update: fromSimpleUpdate(update),
  view: Time,
  inputs
})

ReactDOM.render(<Program />, rootEl)
