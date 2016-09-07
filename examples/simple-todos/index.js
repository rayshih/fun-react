// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {
  createTypes,
  caseOf,
  component,
  createProgram,
  fromSimpleInit,
  fromSimpleUpdate,
  trace,
} from '../../src'

// 1. define your init model
const init = {
  currentInputText: '', // input state
  seq: 0,               // sequential id
  todos: []             // no todo item initially
}

// 2. define Msg, which is basically a wrapper of ui event
// createTypes help us to annotate the data
const Msg = createTypes(
  'InputChange',
  'Add', 'Delete',
  'Check', 'ChangeVisibility'
)

// 3. define update function (the reducer)
const update = caseOf({
  InputChange: (event: Object, model) => ({
    ...model,
    currentInputText: trace(event.target.value)
  }),

  Add: (_, model) => ({
    ...model,
    currentInputText: '',
    seq: model.seq + 1,
    todos: [...model.todos, {
      id: model.seq + 1, title: model.currentInputText
    }]
  })
})

// 4. define view
const SimpleTodoList = component('SimpleTodoList', ({event}, props) => {
  return props.get('model').map(model => (
    <div>
      {
        trace(model).todos.map(item => (
          <div key={item.id}>
            {item.id}: {item.title}
          </div>
        ))
      }
      <input value={model.currentInputText} onChange={event(Msg.InputChange)} />
      <button onClick={event(Msg.Add)}>Add</button>
    </div>
  ))
})

const rootEl = document.getElementById('app')

const Program = createProgram({
  init: fromSimpleInit(init),
  update: fromSimpleUpdate(update),
  view: SimpleTodoList,
  inputs: () => []
})

ReactDOM.render(<Program />, rootEl)
