// @flow

import React from 'react'
import {
  createTypes,
  caseOf,
  createView
} from '../../src'

import Counter, * as C from './Counter'

export const Msg = createTypes('TOP', 'BOTTOM')

export const init = (topCount: number, bottomCount: number) => ({
  topCount: C.init(topCount),
  bottomCount: C.init(bottomCount)
})

export const update = caseOf({
  TOP: (_, model) => ({
    ...model,
    topCount: C.update(_, model.topCount)
  }),

  BOTTOM: (_, model) => ({
    ...model,
    bottomCount: C.update(_, model.bottomCount)
  }),
})

export default createView('CounterPair', ({topCount, bottomCount}, {link}) => (
  <div>
    {link.map(Msg.TOP, <Counter count={topCount} />)}
    {link.map(Msg.BOTTOM, <Counter count={bottomCount} />)}
  </div>
))
