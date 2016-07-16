import React from 'react'
import {component} from 'cycle-react'
import {Observable} from 'rx'

export default component('App', (interaction, props) => {
  const view = props.get('store').map(store => (
    <div>
      <h1>Counter: {store}</h1>
      <button onClick={interaction.listener('inc')}>INC</button>
      <button onClick={interaction.listener('dec')}>DEC</button>
    </div>
  ))

  return {
    view,
    events: {
      onInc: interaction.get('inc'),
      onDec: interaction.get('dec')
    }
  }
})
