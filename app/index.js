import React from 'react'
import ReactDOM from 'react-dom'

import {Observable, Subject} from 'rx'
import Immutable from 'immutable'

import App from './App'

const inc$ = new Subject()
const inc = () => inc$.onNext()

const dec$ = new Subject()
const dec = () => dec$.onNext()

const store = Observable.merge(
  inc$.map(() => model => model + 1),
  dec$.map(() => model => model - 1)
)
.scan((store, mod) => mod(store), 0)
.startWith(0)

// main
const rootEl = document.getElementById('app')
store.subscribe(store => {
  ReactDOM.render(
    <App
      store={store}
      onInc={inc}
      onDec={dec}
    />, rootEl)
})
