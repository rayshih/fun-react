/* global console */

import React from 'react'
import {component, createTypes, caseOf} from '../src/index'
import {Observable} from 'rx'

const Msg = createTypes(
  'onClick1',
  'Click2'
)

const Item = component('Item', ({interactions, event}, props) => {
  return {
    view: props.get('name').map(name => (
      <div>
        {name}
        <button
          onClick={interactions.listener('on_click_1')}>
          Button 1
        </button>
        <button onClick={event(Msg.Click2, () => name)}>
          Button 2
        </button>
      </div>
    )),
    events: {
      onClick1: interactions.get('on_click_1')
      .withLatestFrom(props.get('name'), (evt, name) => name)
    }
  }
})

const List = component('List', ({interactions, link}, props) => {
  return props.map(() => (
    <div>
      {
        [1, 2, 3].map(i => `item ${i}`).map(name => (
          link.map(caseOf({
            onClick1: name => Msg.onClick1(`mapped ${name} for onClick1`),
            Click2: name => Msg.Click2(`mapped ${name} for Click2`)
          }), (
              <Item
                key={name}
                name={name}
              />
          ))
        ))
      }
    </div>
  ))
})

export default component('MixNested', () => {
  return Observable.just(
    <List
      onClick1={name => console.log('button 1', name)}
      Click2={name => console.log('button 2', name)}
    />
  )
})
