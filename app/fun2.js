import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from 'cycle-react'
import {Observable, Subject} from 'rx'

// util functions
const id = a => a

export const createUpdate = updateMap => (msg, model) => (
  updateMap[msg.eventType](msg.payload, model)
)

export const component = (componentName, defFn, componentOptions) => {
  const cycleDefFn = (interaction, props, self, lifecycles) => {
    // event system
    const eventTypes = []
    const event$ = new Subject()
    const sendEvent = event => {
      event$.onNext(event)
    }

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

    const mapEvent = (mapper, element) => {
      if (typeof mapper === 'string') {
        const eventType = mapper
        mapper = event => ({eventType, payload: event})
      }

      return React.cloneElement(element, {
        onEvent: event => {
          sendEvent(mapper(event))
        }
      })
    }

    const linkEvent = element => mapEvent(id, element)

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

export const beginnerProgram = ({
  model,
  update,
  view
}, rootEl) => {
  const rootEvent$ = new Subject()
  const handleEvent = msg => rootEvent$.onNext(msg)

  const store$ = Observable.just(model).concat(rootEvent$)
  .scan((model, msg) => update(msg, model))

  store$.subscribe(model => {
    const root = React.createElement(
      view, {model, onEvent: handleEvent}
    )

    ReactDOM.render(root, rootEl)
  })
}

