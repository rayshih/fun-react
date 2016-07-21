export default
  (React) => (element, ...eventTypesList) =>
{
  class Bridged extends React.Component {
    dispatchEvent = (evt) => {
      this.props.onEvent(evt)
    }

    eventHandlers = eventTypesList.reduce((r, eventType) => {
      r[eventType] = payload => {
        this.dispatchEvent({eventType, payload})
      }
      return r
    }, {})

    render() {
      return React.cloneElement(element, this.eventHandlers)
    }
  }

  return React.createElement(Bridged)
}
