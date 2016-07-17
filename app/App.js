import React from 'react'
import {
  createEventTypes,
  createUpdate,
  component,
} from './fun-react'

import OrdinaryCounter from './OrdinaryCounter'
import CycleCounter from './CycleCounter'
import Counter, * as CM from './Counter'
// CM stand for Counter module

const Msg = createEventTypes('TOP', 'MIDDLE', 'BOTTOM')

export const init = (top, middle, bottom) => ({
  topCounter: CM.init(top),
  middleCounter: CM.init(middle),
  bottomCounter: CM.init(bottom)
})

// TODO consider use immutable js?
export const update = createUpdate({
  [Msg.TOP]: (msg, model) => ({
    ...model, topCounter: CM.update(msg, model.topCounter)
  }),
  [Msg.MIDDLE]: (msg, model) => ({
    ...model, middleCounter: CM.update(msg, model.middleCounter)
  }),
  [Msg.BOTTOM]: (msg, model) => ({
    ...model, bottomCounter: CM.update(msg, model.bottomCounter)
  })
})

const compose = (f, g) => x => f(g(x))

export default component('App', (event, props) => {
  return props.get('model').map(({topCounter, middleCounter, bottomCounter}) => (
    <div>
      <div>
        {event.map(Msg.TOP, <Counter count={topCounter} />)}
      </div>
      <div>
        {event.mapWithObj({
          onIncClick: compose(Msg.MIDDLE, CM.Msg.INC),
          _otherwise: Msg.MIDDLE
        }, <CycleCounter count={middleCounter} />)}
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
