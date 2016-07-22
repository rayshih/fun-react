import React from 'react'
import {
  createTypes,
  createUpdate,
  component,
  caseOf,
  compose,
} from '../src/index'

import OrdinaryCounter from './OrdinaryCounter'
import CycleCounter from './CycleCounter'
import Counter, * as CM from './Counter'
// CM stand for Counter module

const Msg = createTypes('TOP', 'MIDDLE', 'BOTTOM')

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

export default component('App', ({link, event}, props) => {
  return props.get('model').map(({topCounter, middleCounter, bottomCounter}) => (
    <div>
      <div>
        {link.map(Msg.TOP, <Counter count={topCounter} />)}
      </div>
      <div>
        {link.map(caseOf({
          onIncClick: compose(Msg.MIDDLE, CM.Msg.INC),
          _otherwise: Msg.MIDDLE
        }), <CycleCounter count={middleCounter} />)}
      </div>
      <div>
        <OrdinaryCounter
          count={bottomCounter}
          onIncClick={event(compose(Msg.BOTTOM, CM.Msg.INC))}
          onDecClick={event(compose(Msg.BOTTOM, CM.Msg.DEC))}
        />
      </div>
    </div>
  ))
})
