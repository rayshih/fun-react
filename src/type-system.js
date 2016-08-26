// @flow

type Typed<P> = { type: string, payload: P }
type TypedCtor<P> = (payload: P) => Typed<P>
type TypedCtorMap = { [key: string]: TypedCtor<any> }

export const createTypes = (...typeNames: Array<string>): TypedCtorMap => (
  typeNames.reduce((r, n) => {
    const ctor = payload => ({
      type: n,
      payload
    })

    ctor.typeName = n
    ctor.toString = () => n

    r[n] = ctor
    return r
  }, {})
)

type MapFn<P, R> = (obj: Typed<P>, rest: Array<any>) => R
type FnMap = { [key: string]: MapFn<any, any> }

export const caseOf = (fnMap: FnMap) => (obj: Typed<any>, ...rest: Array<any>) => {
  const otherwise = fnMap._otherwise
  const fn = fnMap[obj.type]

  if (fn) {
    return fn(obj.payload, ...rest)
  }

  if (otherwise) {
    return otherwise(obj, ...rest)
  }

  return obj // by pass if not handled
}

type Fn<A, B> = (a: A) => B

export const compose = <A, B, C> (f: Fn<B, C>, g: Fn<A, B>): Fn<A, C> => {
  const h = x => f(g(x))
  h.typeName = f.typeName
  return h
}
