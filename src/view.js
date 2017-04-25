// @flow

import {any} from 'ramda'
import {component} from './component'
import type {
  FunDefHelpers,
  CycleDef,
  ComponentOptions,
} from './component'

export type RenderFn = (props: Object, fun: FunDefHelpers) => CycleDef

const shallowCompare = (a: Object, b: Object) => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false

  return !any(k => {
    const va = a[k]
    const vb = b[k]
    if (va !== vb) return true
  }, aKeys)
}

export const createView = (
  viewName: string,
  renderFn: RenderFn,
  options?: ComponentOptions
) => {
  return component(viewName, (fun, props$) => {
    return props$.distinctUntilChanged(null, shallowCompare)
      .map(props => renderFn(props, fun))
  }, options)
}
