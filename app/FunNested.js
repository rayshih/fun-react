/* global console */

import React from 'react'
import {Observable} from 'rx'
import {
  createEventTypes,
  component,
} from '../index'

export const Msg = createEventTypes('CLICK')

const Item = component('Item', ({event}, props) => {
  return props.get('name').map(name => (
    <div>
      {name}
      <button
        onClick={event(Msg.CLICK, () => name)}>
        Button
      </button>
    </div>
  ))
})

const List = component('List', ({link}) => {
  return Observable.just(
    <div>
      {link(<Item name="item 1" />)}
      {link(<Item name="item 2" />)}
      {link(<Item name="item 3" />)}
    </div>
  )
})

export default component('FunNested', () => {
  return Observable.just(
    <List onEvent={evt => console.log(evt.payload)} />
  )
})
