// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {
  createProgram,
  fromSimpleInit,
  fromSimpleUpdate,
  createView
} from '../../src'

import CounterPair, {init, update} from './CounterPair'

const rootEl = document.getElementById('app')

const App = createView('App', ({model}, {link}) => (
  link(<CounterPair {...model} />)
))

const Program = createProgram({
  init: fromSimpleInit(init(0, 0)),
  update: fromSimpleUpdate(update),
  view: App,
  inputs: () => []
})

ReactDOM.render(<Program />, rootEl)
