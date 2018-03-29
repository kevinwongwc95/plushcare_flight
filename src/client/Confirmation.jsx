import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import TotalCost from './TotalCost';
import FlightInfo from './FlightInfo';

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Flight Booked !
        </h1>
        <h3>
          {this.props.flightBookedConf.confirmation_message}
        </h3>
        <h4>
          Confirmation ID: {this.props.flightBookedConf.confirmation_id}
        </h4>
        <FlightInfo flightSelected={this.props.flightBooked}/>
        <TotalCost flightSelected={this.props.flightBooked} seatsBooked={this.props.seatsBooked}/>
      </div>
    )
  }
}

export default Confirmation
