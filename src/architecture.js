// ----- events -----
export const createEventTypes = (...typeNames) => (
  typeNames.reduce((r, n) => {
    const ctor = payload => ({
      eventType: n,
      payload
    })

    ctor.typeName = n
    ctor.toString = () => n

    r[n] = ctor
    return r
  }, {})
)

// ----- updates -----
export const createUpdate = updateMap => (msg, model) => (
  updateMap[msg.eventType](msg.payload, model)
)
