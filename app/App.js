import React from 'react'
import {component} from './fun'

export default component('App', (event, props) => {
  return props.get('store').map(store => (
    <div>
      <h1>Counter: {store}</h1>
      <button onClick={event('inc')}>INC</button>
      <button onClick={event('dec')}>DEC</button>
    </div>
  ))
})
