// @flow

export const DEV_MODE: boolean = process.env.NODE_ENV !== 'production'

type Config = {
  logViewRender: boolean,
  logEvents: boolean,
}

export const config: Config = {
  logViewRender: false,
  logEvents: false,
  rootComponent: 'div'
}
