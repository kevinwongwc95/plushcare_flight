import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class FlightSelector extends React.Component {
  render() {
    var flightList = [];
    //append values of object into a list
    for (var key in this.props.flightData) {
      let flight = this.props.flightData[key];
      flightList.push(
        <tr key={key}>
          <td>
            <img src={flight.craft_image} height="42"/>
          </td>
          <td className="tabledata">
            {flight.craft_name}
          </td>
          <td className="tabledata">
            {'$' + flight.price_per_seat}
          </td>
          <td className="tabledata">
              {moment(flight.depart_date).format('LLL')}
          </td>
          <td className="tabledata">
            {moment(flight.return_date).format('LLL')}
          </td>
          <td className="tabledata">
            {flight.available_seats.length}
          </td>
          <td className="tabledata">
            <button id={flight.id} onClick={()=>{this.props.selectFlight(flight)}} className="btn btn-primary">Select Flight</button>
          </td>
        </tr>
      );
    }

    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col">Craft Name</th>
            <th scope="col">$ Per Seat</th>
            <th scope="col">Departure Date</th>
            <th scope="col">Return Date</th>
            <th scope="col"> # of Seats</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {flightList}
        </tbody>
      </table>
    );
  }
}

export default FlightSelector;
