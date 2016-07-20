import React from 'react'
import {component} from '../index'

import {Msg} from './Counter'

// You can just replace the Cycle.component to Fun.component
// every thing just work
// and you can mix cycle and fun together
export default component('CycleCounter', ({interactions, event}, props) => {
  const view = props.get('count').map(count => (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={interactions.listener('inc')}>INC</button>
      <button onClick={event(Msg.DEC)}>DEC</button>
    </div>
  ))

  return {
    view,
    events: {
      onIncClick: interactions.get('inc'),
    }
  }
})
