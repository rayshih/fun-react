import React from 'react'
import {component} from './fun'

const Counter = component('Counter', (event, props) => {
  return props.get('store').map(store => (
    <div>
      <h1>Counter: {store}</h1>
      <button onClick={event('inc')}>INC</button>
      <button onClick={event('dec')}>DEC</button>
    </div>
  ))
})

export default component('App', (event, props) => {
  const {link} = event
  return props.get('store').map(store => (
    link(<Counter store={store} />)
  ))
})
