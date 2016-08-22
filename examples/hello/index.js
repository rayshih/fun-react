import React from 'react'
import ReactDom from 'react-dom'
import {component} from 'fun-react'

const rootEl = document.getElementById('app')

const Hello = component('Hello', (_, props) => {
  return props.map(() => (
    <h1>Hello world</h1>
  ))
})

ReactDom.render(<Hello />, rootEl)
