import React from 'react'
import ReactDOM from 'react-dom'

import TotalCost from './TotalCost';
import FlightInfo from './FlightInfo';

class SeatSelection extends React.Component {
  render() {
    var seatList = this.props.flightSelected.available_seats.map(seat=>{
      return(
        <div key={seat.id}>
          <input className="seat-check-box" type="checkbox" id={seat.id} value={seat.position} onClick={()=>{this.props.setSeatsBooked(seat.id)}} />
          <label className="seat-label"> Seat Position {seat.position}</label>
        </div>
      )
    })
    return(
      <div>
        <h2>
          Select Seats For Your Flight Below
        </h2>
        <FlightInfo flightSelected={this.props.flightSelected}/>
        <div>
          {seatList}
        </div>
        <TotalCost flightSelected={this.props.flightSelected} seatsBooked={this.props.seatsBooked}/>
      </div>
    );
  }
}

export default SeatSelection
