import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

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
          <td>
            {flight.id}
          </td>
          <td>
            {flight.craft_name}
          </td>
          <td>
            {'$' + flight.price_per_seat}
          </td>
          <td>
            <Moment>
              {flight.depart_date}
            </Moment>
          </td>
          <td>
            <Moment>
              {flight.return_date}
            </Moment>
          </td>
          <td>
            {flight.available_seats.length}
          </td>
          <td>
            <button id={flight.id} onClick={()=>this.props.bookFlight(flight)} className="btn btn-primary">Book Flight</button>
          </td>
        </tr>
      );
    }

    // const listItems = flightList.map((val) => {
    //   console.log(typeof val.craft_name);
    //     <li>
    //       1
    //     </li>
    // });

    // const numbers = ['1', '2', '3', '4', '5'];
    //
    // const listItems = numbers.map((number) =>{
    //   console.log(number);
    //   <li key={number}>{number}</li>
    // });
    //
    // console.log(listItems.length)
    // console.log(listItems);

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Flight id</th>
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
