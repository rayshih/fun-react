import React from 'react'
import {
  createTypes,
  createUpdate,
  component,
  beginnerProgram
} from 'fun-react'

/**
 * This is an example ported from http://elm-lang.org/examples/http
 */

const trace = v => {
  console.log(v)
  return v
}

// 1. define your init model
const init = topic => ([
  {
    topic,
    gifUrl: "waiting.gif"
  },
  // TODO CMD here
])

// 2. define Msg, which is basically a wrapper of ui event
// createTypes help us to annotate the data
const Msg = createTypes(
  'InputChange',
  'Add', 'Delete',
  'Check', 'ChangeVisibility'
)

// 3. define update function (the reducer)
const update = createUpdate({
  [Msg.InputChange]: (event, model) => ({
    ...model,
    currentInputText: trace(event.target.value)
  }),

  [Msg.Add]: (_, model) => ({
    ...model,
    seq: model.seq + 1,
    todos: [...model.todos, {
      id: model.seq + 1, title: model.currentInputText
    }]
  })
})

// 4. define view
const HttpExample = component('HttpExample', ({event}, props) => {
  return props.get('model').map(model => (
    <div>
      {
        model.todos.map(item => (
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

beginnerProgram({
  model: init,
  update,
  view: HttpExample
}, rootEl)
