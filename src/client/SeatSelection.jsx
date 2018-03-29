import React from 'react'
import ReactDOM from 'react-dom'

import TotalCost from './TotalCost'

class SeatSelection extends React.Component {
  render() {
    var seatList = this.props.flightSelected.available_seats.map(seat=>{
      return(
        <div key={seat.id}>
          <input type="checkbox" id={seat.id} value={seat.position} onClick={()=>{this.props.setSeatsBooked(seat.id)}} />
          <label>Seat Position {seat.position}</label>
        </div>
      )
    })
    return(
      <div>
        <h2>
          Select Seats!
        </h2>
        <div>
          {seatList}
        </div>
        <TotalCost flightSelected={this.props.flightSelected} seatsBooked={this.props.seatsBooked}/>
      </div>
    );
  }
}

export default SeatSelection
