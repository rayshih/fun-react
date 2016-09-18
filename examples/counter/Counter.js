// @flow

import React from 'react'
import {
  createTypes,
  caseOf,
  createView,
} from '../../src'

export const Msg = createTypes('INC', 'DEC')

export const init = (count: number) => count

export const update = caseOf({
  INC: (_, count) => count + 1,
  DEC: (_, count) => count - 1
})

export default createView('Counter', ({count}, {event}) => (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={event(Msg.INC)}>INC</button>
    <button onClick={event(Msg.DEC)}>DEC</button>
  </div>
))
