import React from 'react'
import Cycle from 'cycle-react'

import {Subject} from 'rx'

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

    const forwardEvent = (eventType, evt$) => (
      evt$.subscribe(payload => {
        sendEvent({eventType, payload})
      })
    )

    // register function
    const registerEvent = eventType => {
      // eventTypeName
      const etn = eventType.typeName
      if (!eventTypes.includes(etn)) {
        eventTypes.push(etn)
        forwardEvent(etn, interaction.get(etn))
      }

      return interaction.listener(etn)
    }

    // cycle compatible
    registerEvent.get = interaction.get
    registerEvent.listener = interaction.listener

    const mapEvent = (mapper, element) => {
      return React.cloneElement(element, {
        onEvent: event => {
          sendEvent(mapper(event))
        }
      })
    }

    const mapEventWithObj = (obj, element) => {
      const otherwise = obj._otherwise
      const mapper = evt => {
        const fn = obj[evt.eventType]
        if (fn) {
          return fn(evt.payload)
        }

        if (otherwise) {
          return otherwise(evt)
        }
      }

      return mapEvent(mapper, element)
    }

    const mapOrdinaryEvent = (eventMap, element) => {
      const mapper = evt => eventMap[evt.eventType](evt.payload)
      return mapEvent(mapper, bridge(element, ...Object.keys(eventMap)))
    }

    const linkEvent = element => mapEvent(id, element)

    registerEvent.map = mapEvent
    registerEvent.mapWithObj = mapEventWithObj
    registerEvent.link = linkEvent
    registerEvent.mapOrdinary = mapOrdinaryEvent

    const cycleDef = defFn(registerEvent, props, self, lifecycles)
    const {view, events: cycleEvents} = cycleDef.view
      ? cycleDef
      : {view: cycleDef, events: {}}

    Object.keys(cycleEvents).forEach(eventType => {
      const obs$ = cycleEvents[eventType]
      forwardEvent(eventType, obs$)
    })

    return {
      view,
      events: {
        onEvent: event$
      }
    }
  }

  return Cycle.component(componentName, cycleDefFn, componentOptions)
}

