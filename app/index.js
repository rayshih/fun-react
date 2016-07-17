import {beginnerProgram} from './fun-react'
import App, * as AM from './App'

const rootEl = document.getElementById('app')
beginnerProgram({
  model: AM.init(0, 0),
  update: AM.update,
  view: App
}, rootEl)

