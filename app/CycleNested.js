/* global console */

import React from 'react'
import Cycle from 'cycle-react'
import {Observable} from 'rx'

const Item = Cycle.component('Item', (interactions, props) => {
  return {
    view: props.get('name').map((name) => (
      <div>
        {name}
        <button
          onClick={interactions.listener('on_click')}>
          Button
        </button>
      </div>
    )),
    events: {
      onClick: interactions.get('on_click')
      .withLatestFrom(props.get('name'), (evt, name) => name)
    }
  }
})

const List = Cycle.component('List', (interactions) => {
  return {
    view: Observable.just(
      <div>
        <Item
          name="item 1"
          onClick={interactions.listener('on_item_click')} />
        <Item
          name="item 2"
          onClick={interactions.listener('on_item_click')} />
        <Item
          name="item 3"
          onClick={interactions.listener('on_item_click')} />
      </div>
    ),
    events: {
      onItemClick: interactions.get('on_item_click')
    }
  }
})

export default Cycle.component('CycleNested', () => {
  return Observable.just(
    <List onItemClick={name => console.log(name)} />
  )
})
