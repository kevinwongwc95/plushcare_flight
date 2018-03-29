import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class FlightInfo extends React.Component {
  render() {
    return (
      <div>
        <h4>
          Departure Date : {moment(this.props.flightSelected.depart_date).format('LLL')}
        </h4>
        <h4>
          Return Date : {moment(this.props.flightSelected.return_date).format('LLL')}
        </h4>
        <h4>
          Craft Name : {this.props.flightSelected.craft_name}
        </h4>
      </div>
    )
  }
}

export default FlightInfo
