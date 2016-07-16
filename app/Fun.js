import React from 'react'
import Cycle from 'cycle-react'
import {Subject} from 'rx'

// util functions
const id = a => a

export const component = (componentName, defFn, componentOptions) => {
  const cycleDefFn = (interaction, props, self, lifecycles) => {
    // event system
    const eventTypes = []
    const event$ = new Subject()
    const sendEvent = event => event$.onNext(event)

    // register function
    const registerEvent = eventType => {
      if (!eventTypes.includes(eventType)) {
        eventTypes.push(eventType)

        interaction.get(eventType).subscribe(payload => {
          sendEvent({eventType, payload})
        })
      }

      return interaction.listener(eventType)
    }

    const mapEvent = mapper => element => {
      return React.cloneElement(element, {
        onEvent: event => sendEvent(mapper(event))
      })
    }

    const linkEvent = mapEvent(id)

    registerEvent.map = mapEvent
    registerEvent.link = linkEvent

    // only allow view
    const view = defFn(registerEvent, props, self, lifecycles)

    return {
      view,
      events: {
        onEvent: event$
      }
    }
  }

  return Cycle.component(componentName, cycleDefFn, componentOptions)
}
