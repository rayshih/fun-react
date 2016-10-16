// @flow

import {component} from './component'
import type {FunDefHelpers, CycleDef} from './component'

export type RenderFn = (props: Object, fun: FunDefHelpers) => CycleDef

const shallowCompare = (a: Object, b: Object) => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false

  for (const k of aKeys) {
    const va = a[k]
    const vb = b[k]
    if (va !== vb) return false
  }

  return true
}

export const createView = (viewName: string, renderFn: RenderFn) => {
  return component(viewName, (fun, props$) => {
    return props$.distinctUntilChanged(null, shallowCompare)
      .map(props => renderFn(props, fun))
  })
}
