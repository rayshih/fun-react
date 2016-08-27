// @flow

export type Typed<P> = { type: string, payload: P }
export type TypedCtor<P> = (payload: P) => Typed<P>
type TypedCtorMap = { [key: string]: TypedCtor<mixed> }

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

export type MapFn<A, B, C> = (obj: A, extra?: B) => C
export type FnMap<A, B, C> = { [key: string]: MapFn<A, B, C> }

export const caseOf = <B, C> (fnMap: FnMap<Typed<any>, B, C>): MapFn<Typed<any>, B, C> => (obj: Typed<any>, extra?: B) => {
  const otherwise = fnMap._otherwise
  const fn = fnMap[obj.type]

  if (fn) {
    return fn(obj.payload, extra)
  }

  if (otherwise) {
    return otherwise(obj, extra)
  }

  throw new Error('obj type not handled with type' + obj.type)
}

export type Fn<A, B> = (a: A) => B

export const compose = <A, B, C> (f: Fn<B, C>, g: Fn<A, B>): Fn<A, C> => {
  const h = x => f(g(x))
  h.typeName = f.typeName
  return h
}
