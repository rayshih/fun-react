import React from 'react'
import Cycle from 'cycle-react'

import {
  mapEvent as _mapEvent,
  component as _component
} from './component'

export * from './type-system'

export const mapEvent = _mapEvent(React, Cycle)
export const component = _component(React, Cycle)

export * from './architecture'
export * from './html'
