import React from 'react'
import ReactDOM from 'react-dom'

class SeatPicker extends React.Component {
  render() {
    let seatArray = []
    for (let i = 1; i < this.props.totalSeats + 1; i ++) {
      seatArray.push(i)
    }

    return (
      <div className="seat-picker">
        <select className="seat-select" onChange={this.props.seatChange}>
        { seatArray.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
        })}
        </select>
      </div>
    )
  }

}

export default SeatPicker
