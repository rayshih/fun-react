import React from 'react'
import {component, createUpdate} from './fun'

const Msg = {
  INC: 'INC',
  DEC: 'DEC'
}

export const init = count => count

export const update = createUpdate({
  [Msg.INC]: (_, model) => model + 1,
  [Msg.DEC]: (_, model) => model - 1
})

export default component('Counter', (event, props) => {
  return props.get('count').map(count => (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={event(Msg.INC)}>INC</button>
      <button onClick={event(Msg.DEC)}>DEC</button>
    </div>
  ))
})