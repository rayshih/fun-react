export const createTypes = (...typeNames) => {
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

  if (process.env.NODE_ENV !== 'production') {
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


export const caseOf = fnMap => (obj, ...rest) => {
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

export const compose = (f, g) => {
  const h = x => f(g(x))
  h.typeName = f.typeName
  return h
}
