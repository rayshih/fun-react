// @flow

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {
  createTypes,
  caseOf,
  createView,
  createProgram,
  fromSimpleInit,
  fromSimpleUpdate,
} from 'fun-react'

export const Msg = createTypes('INC', 'DEC')

export const init = (count: number) => count

export const update = caseOf({
  INC: (_, count) => count + 1,
  DEC: (_, count) => count - 1
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const Button = ({children, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
)

const Counter = createView('Counter', ({count}, {event}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Count: {count}</Text>
    <Button onPress={event(Msg.INC)}>INC</Button>
    <Button onPress={event(Msg.DEC)}>DEC</Button>
  </View>
))

const App = createView('App', ({model}, {link}) => (
  link(<Counter count={model} />)
))

const ReactNativeDemo = createProgram({
  init: fromSimpleInit(init(0)),
  update: fromSimpleUpdate(update),
  view: App,
  inputs: () => []
})

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo)
