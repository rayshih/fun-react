import React from 'react'
import {component} from 'cycle-react'
import {Observable} from 'rx'

export default component('App', () => {
  return Observable.just(<h1>Hello world</h1>)
})
