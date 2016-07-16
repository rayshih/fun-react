import Cycle from 'cycle-react'
import {Subject} from 'rx'

export const component = (componentName, defFn, componentOptions) => {
  const cycleDefFn = (interaction, props, self, lifecycles) => {
    // event system
    const eventTypes = []
    const event$ = new Subject()

    // register function
    const event = eventType => {
      if (!eventTypes.includes(eventType)) {
        eventTypes.push(eventType)

        interaction.get(eventType).subscribe(payload => {
          event$.onNext({eventType, payload})
        })
      }

      return interaction.listener(eventType)
    }

    // only allow view
    const view = defFn(event, props, self, lifecycles)

    return {
      view,
      events: {
        onEvent: event$
      }
    }
  }

  return Cycle.component(componentName, cycleDefFn, componentOptions)
}
