// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {
  createProgram,
  fromSimpleInit,
  fromSimpleUpdate,
  createView
} from '../../src'

import Counter, {init, update} from './Counter'

const rootEl = document.getElementById('app')

const App = createView('App', ({model}, {link}) => (
  link(<Counter count={model} />)
))

const Program = createProgram({
  init: fromSimpleInit(init(0)),
  update: fromSimpleUpdate(update),
  view: App,
  inputs: () => []
})

ReactDOM.render(<Program />, rootEl)
