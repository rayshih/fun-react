import React from 'react'
import ReactDom from 'react-dom'
import {createView} from '../../src'

const rootEl = document.getElementById('app')

const Hello = createView('Hello', () => (
  <h1>Hello world</h1>
))

// of course you can do this
// const Hello = () => <h1>Hello world</h1>

ReactDom.render(<Hello />, rootEl)
