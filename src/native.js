import React from 'react-native'
import Cycle from 'cycle-react/native'

import {
  mapEvent as _mapEvent,
  component as _component
} from './component'

export * from './type'

export const mapEvent = _mapEvent(React, Cycle)
export const component = _component(React, Cycle)

export * from './architecture'
