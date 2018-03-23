import React from 'react'
import ReactDOM from 'react-dom'

class SeatPicker extends React.Component {

  constructor(props) {
    super()
    this.state = {
      totalSeats:20,
      seatsSelected: 1
    }

    this.seatChange = this.seatChange.bind(this)
  }

  componentWillMount() {
    this.seatChange(1)
  }

  seatChange(numberOfSeats) {
    this.props.seatChange(numberOfSeats)
  }

  render() {
    let seatArray = []
    for (let i = 1; i < this.state.totalSeats + 1; i ++) {
      seatArray.push(i)
    }

    return (
      <div className="seat-picker">
        <select className="seat-select" onChange={this.seatChange}>
        { seatArray.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
        })}
        </select>
      </div>
    )
  }

}

export default SeatPicker