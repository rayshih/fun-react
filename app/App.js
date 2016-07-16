import React from 'react'
import {component} from 'cycle-react'
import {Observable} from 'rx'

const fun = (componentName, defFn, componentOptions) => {
  const cycleDefFn = (interaction, props, self, lifecycles) => {
    const eventTypes = []
    const event = eventType => {
      if (!eventTypes.includes(eventType)) {
        eventTypes.push(eventType)
      }

      return interaction.listener(eventType)
    }

    const view = defFn(event, props, self, lifecycles)
    const eventObservables = eventTypes.map(type => (
      interaction.get(type)
      .map(payload => ({eventType: type, payload}))
    ))

    return {
      view,
      events: {
        onEvent: Observable.merge(
          ...eventObservables
        )
      }
    }
  }

  return component(componentName, cycleDefFn, componentOptions)
}

export default fun('App', (event, props) => {
  const incEvent = event('inc')
  const decEvent = event('dec')
  return props.get('store').map(store => (
    <div>
      <h1>Counter: {store}</h1>
      <button onClick={incEvent}>INC</button>
      <button onClick={decEvent}>DEC</button>
    </div>
  ))
})

// export default component('App', (interaction, props) => {
//   const view = props.get('store').map(store => (
//     <div>
//       <h1>Counter: {store}</h1>
//       <button onClick={interaction.listener('inc')}>INC</button>
//       <button onClick={interaction.listener('dec')}>DEC</button>
//     </div>
//   ))
//
//   return {
//     view,
//     events: {
//       onEvent: Observable.merge(
//         interaction.get('inc').map(() => 'inc'),
//         interaction.get('dec').map(() => 'dec')
//       )
//     }
//   }
// })
