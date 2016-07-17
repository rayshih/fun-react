import React from 'react'
import {
  createEventTypes,
  createUpdate,
  component,
  bridge,
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

export default component('App', (event, props) => {
  return props.get('model').map(({topCounter, bottomCounter}) => (
    <div>
      <div>
        {event.map(Msg.TOP, <Counter count={topCounter} />)}
      </div>
      <div>
        {event.map(
          (evt) => {
            if (evt.eventType === 'onIncClick') {
              return Msg.BOTTOM(CM.Msg.INC(evt.payload))
            }

            if (evt.eventType === 'onDecClick') {
              return Msg.BOTTOM(CM.Msg.DEC(evt.payload))
            }
          },
          bridge(
            <OrdinaryCounter count={bottomCounter} />,
            'onIncClick',
            'onDecClick'
          )
        )}
      </div>
    </div>
  ))
})
