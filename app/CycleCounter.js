import React from 'react'
import {component} from './fun-react'

// You can just replace the Cycle.component to Fun.component
// and every thing works like Fun
export default component('Counter', (interaction, props) => {
  const view = props.get('count').map(count => (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={interaction.listener('inc')}>INC</button>
      <button onClick={interaction.listener('dec')}>DEC</button>
    </div>
  ))

  return {
    view,
    events: {
      onIncClick: interaction.get('inc'),
      onDecClick: interaction.get('dec'),
    }
  }
})
