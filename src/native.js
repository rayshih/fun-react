import React from 'react-native'
import Cycle from 'cycle-react/native'

import {
  mapEvent as _mapEvent,
  component as _component
} from './lib/component'

export const mapEvent = _mapEvent(React, Cycle)
export const component = _component(React, Cycle)

export * from './lib/architecture'
