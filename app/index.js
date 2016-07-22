/* global document */

// import React from 'react'
// import ReactDom from 'react-dom'

// import CycleNested from './CycleNested'
// import FunNested from './FunNested'
// import MixNested from './MixNested'

import {beginnerProgram} from '../index'
import App, * as AM from './App'

const rootEl = document.getElementById('app')

// ReactDom.render(<CycleNested />, rootEl)
// ReactDom.render(<MixNested />, rootEl)

beginnerProgram({
  model: AM.init(0, 0, 0),
  update: AM.update,
  view: App
}, rootEl)
