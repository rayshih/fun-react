import {Subject} from 'rx'
import createBridge from './bridge'
import {id} from './util'

export default
  (React, Cycle) => (componentName, defFn, componentOptions) =>
{
  const bridge = createBridge(React, Cycle)

  const cycleDefFn = (interactions, props, self, lifecycles) => {
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
    const registerEvent = (eventType, transform = id) => {
      // eventTypeName
      const etn = eventType.typeName
      if (!eventTypes.includes(etn)) {
        eventTypes.push(etn)
        forwardEvent(etn, interactions.get(etn).map(transform))
      }

      return interactions.listener(etn)
    }

    // cycle compatible
    registerEvent.get = interactions.get
    registerEvent.listener = interactions.listener

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

