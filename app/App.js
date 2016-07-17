import React from 'react'
import {
  createEventTypes,
  createUpdate,
  component,
} from './fun-react'

import OrdinaryCounter from './OrdinaryCounter'
import Counter, * as CM from './Counter'
// CM stand for Counter module

const Msg = createEventTypes('TOP', 'BOTTOM')

export const init = (top, bottom) => ({
  topCounter: CM.init(top),
  bottomCounter: CM.init(bottom)
})

// TODO consider use immutable js?
export const update = createUpdate({
  [Msg.TOP]: (msg, model) => ({
    ...model, topCounter: CM.update(msg, model.topCounter)
  }),
  [Msg.BOTTOM]: (msg, model) => ({
    ...model, bottomCounter: CM.update(msg, model.bottomCounter)
  })
})

const compose = (f, g) => x => f(g(x))

export default component('App', (event, props) => {
  return props.get('model').map(({topCounter, bottomCounter}) => (
    <div>
      <div>
        {event.map(Msg.TOP, <Counter count={topCounter} />)}
      </div>
      <div>
        {event.mapOrdinary({
          onIncClick: compose(Msg.BOTTOM, CM.Msg.INC),
          onDecClick: compose(Msg.BOTTOM, CM.Msg.DEC),
        }, <OrdinaryCounter count={bottomCounter} />)}
      </div>
    </div>
  ))
})
