import React from 'react'

class OrdinaryCounter extends React.Component {
  render() {
    const {count, onIncClick, onDecClick} = this.props
    return (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={onIncClick}>INC</button>
        <button onClick={onDecClick}>DEC</button>
      </div>
    )
  }
}

export default OrdinaryCounter


