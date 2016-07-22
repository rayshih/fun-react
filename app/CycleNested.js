/* global console */

import React from 'react'
import Cycle from 'cycle-react'
import {Observable} from 'rx'

const Item = Cycle.component('Item', (interactions, props) => {
  return {
    view: props.get('name').map(name => (
      <div>
        {name}
        <button
          onClick={interactions.listener('on_click_1')}>
          Button 1
        </button>
        <button
          onClick={interactions.listener('on_click_2')}>
          Button 2
        </button>
      </div>
    )),
    events: {
      onClick1: interactions.get('on_click_1')
      .withLatestFrom(props.get('name'), (evt, name) => name),
      onClick2: interactions.get('on_click_2')
      .withLatestFrom(props.get('name'), (evt, name) => name),
    }
  }
})

const List = Cycle.component('List', (interactions) => {
  return {
    view: Observable.just(
      <div>
        <Item
          name="item 1"
          onClick1={interactions.listener('on_item_click_1')}
          onClick2={interactions.listener('on_item_click_2')}
        />
        <Item
          name="item 2"
          onClick1={interactions.listener('on_item_click_1')}
          onClick2={interactions.listener('on_item_click_2')}
        />
        <Item
          name="item 3"
          onClick1={interactions.listener('on_item_click_1')}
          onClick2={interactions.listener('on_item_click_2')}
        />
      </div>
    ),
    events: {
      onItemClick1: interactions.get('on_item_click_1'),
      onItemClick2: interactions.get('on_item_click_2')
    }
  }
})

export default Cycle.component('CycleNested', () => {
  return Observable.just(
    <List
      onItemClick1={name => console.log('button 1', name)}
      onItemClick2={name => console.log('button 2', name)}
    />
  )
})
