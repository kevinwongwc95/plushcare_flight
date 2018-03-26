import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

class Confirmation extends React.Component {
  render() {
    console.log(this.props.flightBooked)
    return (
      <div>
        <h3>
          Flight Confirmed !
        </h3>
        <h4>
          Flight ID: {this.props.flightBooked.id}
        </h4>
        <h4>
            Departure Date :
            <Moment>
              {this.props.flightBooked.depart_date}
            </Moment>
        </h4>
        <h4>
          Return Date :
          <Moment>
            {this.props.flightBooked.return_date}
          </Moment>
        </h4>
      </div>
    )
  }
}

export default Confirmation
