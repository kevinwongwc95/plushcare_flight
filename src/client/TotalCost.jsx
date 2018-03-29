import React from 'react'
import ReactDOM from 'react-dom'

class TotalCost extends React.Component {
  render() {
    return(
      <div>
        Total Cost: {this.props.flightSelected.price_per_seat * this.props.seatsBooked.length}
      </div>
    );
  }
}

export default TotalCost
