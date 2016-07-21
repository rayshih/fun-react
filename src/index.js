import React from 'react'
import Cycle from 'cycle-react'

import {
  mapEvent as _mapEvent,
  component as _component
} from './component'

export const mapEvent = _mapEvent(React, Cycle)
export const component = _component(React, Cycle)

export * from './lib/architecture'
export * from './lib/html'
