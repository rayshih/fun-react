// @flow

import {DEV_MODE} from './config'

export type Typed<P> = { type: string, payload: P }
export type TypedCtor<P> = (payload: P) => Typed<P>
export type TypedCtorMap = { [key: string]: TypedCtor<mixed> }

export const createTypes = (...typeNames: Array<string>): TypedCtorMap => {
  const types = typeNames.reduce((r, n) => {
    const ctor = payload => ({
      type: n,
      payload
    })

    ctor.typeName = n
    ctor.toString = () => n

    r[n] = ctor
    return r
  }, {})

  if (DEV_MODE && global.Proxy) {
    return new Proxy(types, {
      get(target, name) {
        if (typeof target[name] === 'undefined') {
          throw new Error(`Type ${name} is not defined`)
        }

        return target[name]
      }
    })
  }

  return types
}


export type MapFn<A, B, C> = (obj: A, extra: B) => C
export type MapFnMap<A, B, C> = {[key: string]: MapFn<A, B, C>}

export const caseOf = <P, B, C>
  (
    fnMap: MapFnMap<P, B, C>,
    otherwise?: MapFn<Typed<P>, B, C>
  ): MapFn<Typed<P>, B, C> =>
  (obj: Typed<P>, extra: B): C => {

    const fn = fnMap[obj.type]
    if (fn) {
      return fn(obj.payload, extra)
    }

    if (otherwise) {
      return otherwise(obj, extra)
    }

    throw new Error('obj type not handled with type: ' + obj.type)

  }

export type Fn<A, B> = (a: A) => B

export const compose =
  <A, B, C>
  (f: Fn<B, C>, g: Fn<A, B>): Fn<A, C> => {
    const h = x => f(g(x))
    h.typeName = f.typeName
    return h
  }
