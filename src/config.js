// @flow

import {Component} from 'react'

export const DEV_MODE: boolean = process.env.NODE_ENV !== 'production'

type Config = {
  logViewRender: boolean,
  logEvents: boolean,
  rootComponent: string | Component<any, any, any>
}

export const config: Config = {
  logViewRender: false,
  logEvents: false,
  rootComponent: 'div'
}
