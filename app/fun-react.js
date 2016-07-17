import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from 'cycle-react'
import {Observable, Subject} from 'rx'

// util functions
const id = a => a

// ----- bridge functions -----
export const bridge = (element, ...eventTypesList) => {
  class Bridged extends React.Component {
    dispatchEvent = (evt) => {
      this.props.onEvent(evt)
    }

    eventHandlers = eventTypesList.reduce((r, eventType) => {
      r[eventType] = payload => {
        this.dispatchEvent({eventType, payload})
      }
      return r
    }, {})

    render() {
      return React.cloneElement(element, this.eventHandlers)
    }
  }

  return React.createElement(Bridged)
}

// ----- events -----
export const createEventTypes = (...typeNames) => (
  typeNames.reduce((r, n) => {
    const ctor = payload => ({
      eventType: n,
      payload
    })

    ctor.typeName = n
    ctor.toString = () => n

    r[n] = ctor
    return r
  }, {})
)

// ----- updates -----
export const createUpdate = updateMap => (msg, model) => (
  updateMap[msg.eventType](msg.payload, model)
)

// ----- component -----
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
      // eventTypeName
      const etn = eventType.typeName
      if (!eventTypes.includes(etn)) {
        eventTypes.push(etn)

        interaction.get(etn).subscribe(payload => {
          sendEvent({eventType: etn, payload})
        })
      }

      return interaction.listener(etn)
    }

    const mapEvent = (mapper, element) => {
      return React.cloneElement(element, {
        onEvent: event => {
          sendEvent(mapper(event))
        }
      })
    }

    const mapOrdinaryEvent = (eventMap, element) => {
      const mapper = evt => eventMap[evt.eventType](evt.payload)
      return mapEvent(mapper, bridge(element, ...Object.keys(eventMap)))
    }

    const linkEvent = element => mapEvent(id, element)

    registerEvent.map = mapEvent
    registerEvent.link = linkEvent
    registerEvent.mapOrdinary = mapOrdinaryEvent

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

// ----- main functions ------
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

