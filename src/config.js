// @flow

export const DEV_MODE: boolean = process.env.NODE_ENV !== 'production'
export const config = {
  logViewRender: false,
  logEvents: false,
  rootComponent: 'div'
}
