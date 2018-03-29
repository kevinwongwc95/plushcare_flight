import React from 'react'
import ReactDOM from 'react-dom'

class TotalCost extends React.Component {
  render() {
    let total = (this.props.flightSelected.price_per_seat * this.props.seatsBooked.length).toFixed(2);
    return(
      <div className="total-cost">
        <div>
          Price Per Seat: {this.props.flightSelected.price_per_seat} x {this.props.seatsBooked.length}
        </div>
        <div>
          Total: $ {total}
        </div>
      </div>
    );
  }
}

export default TotalCost
