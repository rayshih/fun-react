import {Subject} from 'rx'
import createBridge from './bridge'
import {id} from './util'

export const mapEvent = (React, Cycle) => {
  const Mapper = Cycle.component('Mapper', (interactions, props) => {
    const mapFn$ = props.get('mapFn')
    const event$ = interactions.get('on_event')
    .withLatestFrom(mapFn$, (evt, mapFn) => mapFn(evt))

    return {
      view: props.get('element').map(element => (
        React.cloneElement(element, {
          onEvent: interactions.listener('on_event')
        })
      )),
      events: {
        onEvent: event$
      }
    }
  })

  return (mapFn, element) => {
    return React.createElement(Mapper, {
      key: element.key,
      mapFn,
      element
    })
  }
}

export const component =
  (React, Cycle) => (componentName, defFn, componentOptions) =>
{
  // binding context
  const bridge = createBridge(React, Cycle)
  const map = mapEvent(React, Cycle)

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

    // link
    const linkEvent = element => {
      return React.cloneElement(element, {
        onEvent: sendEvent
      })
    }

    // map
    const mapEventWithObj = (obj, element) => {
      const otherwise = obj._otherwise
      const mapFn = evt => {
        const fn = obj[evt.eventType]
        if (fn) {
          return fn(evt.payload)
        }

        if (otherwise) {
          return otherwise(evt)
        }

        return evt // by pass if not handled
      }

      return map(mapFn, element)
    }

    const mapOrdinaryEvent = (eventMap, element) => {
      const mapFn = evt => eventMap[evt.eventType](evt.payload)
      return map(mapFn, bridge(element, ...Object.keys(eventMap)))
    }

    // map and link
    const mapAndLinkEvent = (mapFn, element) => {
      return linkEvent(
        map(mapFn, element)
      )
    }

    const mapAndLinkEventWithObj = (obj, element) => {
      return linkEvent(
        mapEventWithObj(obj, element)
      )
    }

    const mapAndLinkOrdinaryEvent = (eventHandlerMap, element) => {
      return linkEvent(
        mapOrdinaryEvent(eventHandlerMap, element)
      )
    }

    // binding API
    linkEvent.map = mapAndLinkEvent
    linkEvent.mapWithObj = mapAndLinkEventWithObj
    linkEvent.mapOrdinary = mapAndLinkOrdinaryEvent

    const fun = {
      event: registerEvent,
      link: linkEvent,

      map: map,
      mapWithObj: mapEventWithObj,
      mapOrdinary: mapOrdinaryEvent,

      interactions, // cycle compatible
    }

    const cycleDef = defFn(fun, props, self, lifecycles)
    const {view, events: cycleEvents} = cycleDef.view
      ? cycleDef
      : {view: cycleDef, events: {}}

    // dispatch cycle events
    Object.keys(cycleEvents).forEach(eventType => {
      const obs$ = cycleEvents[eventType]
      forwardEvent(eventType, obs$)
    })

    // TODO write test
    const dispatchToOrdinaryReactInterface = evt => {
      const cb = self.props[evt.eventType]
      if (cb) {
        cb(evt.payload)
      }
    }

    return {
      view,
      events: {
        onEvent: event$.doOnNext(dispatchToOrdinaryReactInterface)
      }
    }
  }

  return Cycle.component(componentName, cycleDefFn, componentOptions)
}

