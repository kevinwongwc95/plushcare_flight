import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import moment from 'moment';

import DatePicker from './DatePicker';
import SeatPicker from './SeatPicker';
import FlightSelector from './FlightSelector';
import Confirmation from './Confirmation';

import styles from './css/plushmars.scss';

const apiUrl =
  'http://ec2-54-190-51-40.us-west-2.compute.amazonaws.com/flights/search/?';

class PlushMars extends React.Component {
  constructor(props) {
    super();
    this.state = {
      totalSeats: 20,
      departureDate: {
        month: 1,
        day: 1,
        year: 2017
      },
      returnDate: {
        month: 1,
        day: 1,
        year: 2017
      },
      numberOfSeats: 1,
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      year: [moment().year()],
      flightData: null,
      searchClicked: false,
      flightBooked: null,
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.seatChange = this.seatChange.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.clearFlight = this.clearFlight.bind(this);
    this.bookFlight = this.bookFlight.bind(this);
  }

  componentWillMount() {
  }

  bookFlight(flight){
    console.log(flight);
    this.setState({
      flightBooked: flight,
    });
  }

  dateChanged(arrivalOrDeparture, d) {
    let date = {};

    arrivalOrDeparture === 'departure'
      ? (date = this.state.departureDate)
      : (date = this.state.returnDate);

    switch (d.target.name) {
      case 'day':
        date['day'] = d.target.value;
        break;
      case 'month':
        date['month'] = d.target.value;
        break;
      case 'year':
        date['year'] = d.target.value;
        break;
    }


    if (arrivalOrDeparture == 'departure') {
      this.setState({ departureDate: date });
    } else {
      this.setState({ returnDate: date });
    }
  }

  submitSearch() {
    let seats = 'number_seats=' + this.state.numberOfSeats.toString();
    let departureDateObject = this.state.departureDate;
    let returnDateObject = this.state.returnDate;

    let departureDay = departureDateObject.day;
    let departureMonth = departureDateObject.month;
    let departureYear = departureDateObject.year.toString();

    let returnDay = returnDateObject.day;
    let returnMonth = returnDateObject.month;
    let returnYear = returnDateObject.year.toString();

    let departureDate =
      departureMonth +
      '-' +
      departureDay +
      '-' +
      departureYear;
    let returnDate =
      returnDateObject.month +
      '-' +
      returnDateObject.day +
      '-' +
      returnDateObject.year;

      departureDate = 'departure_date=' + moment(departureDate).format().toString();
      returnDate = 'arrival_date=' + moment(returnDate).format().toString();

    let combinedQuery = departureDate + '?' + returnDate + '?' + seats;

    const request = new Request(apiUrl + combinedQuery, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    fetch(request)
      .then(data => data.json())
      .then(jsonData => {
        this.setState({
          flightData: jsonData,
          searchClicked: true
        });
      });
  }

  dateHandler(dateObject, arrivalOrDeparture) {
    if (arrivalOrDeparture == 'departure') {
      this.setState({ departureDate: dateObject });
    } else {
      this.setState({ returnDate: dateObject });
    }
  }

  seatChange(numberOfSeats) {
    this.setState({ numberOfSeats: numberOfSeats.target.value });
  }

  clearFlight() {
    this.setState({
      flightFound: false,
      searchClicked: false,
      flightData: null,
      flightBooked: null,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <h1> Welcome to PlushMars!</h1>
        </div>
        {!this.state.searchClicked && !this.state.flightData && (
          <div className="flight-finder">
            <div className="row">
              <h2>Departure Date</h2>
              <DatePicker
                months={this.state.months}
                days={this.state.days}
                year={this.state.year}
                arrivalOrDeparture="departure"
                dateChanged={this.dateChanged}
              />
            </div>
            <div className="row">
              <h2>Return Date</h2>
              <DatePicker
                months={this.state.months}
                days={this.state.days}
                year={this.state.year}
                arrivalOrDeparture="arrival"
                dateChanged={this.dateChanged}
              />
            </div>
            <div className="row">
              <h3>Number of Seats</h3>
              <SeatPicker
                totalSeats={this.state.totalSeats}
                seatChange={this.seatChange}
              />
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={this.submitSearch}>
                Find flights
              </button>
            </div>
          </div>
        )}

        {this.state.searchClicked && this.state.flightData && !this.state.flightBooked && (
          <div className="flight-booker">
            <FlightSelector bookFlight={this.bookFlight} flightData={this.state.flightData} />
          </div>
        )}

        {this.state.flightBooked &&
          <Confirmation flightBooked={this.state.flightBooked}/>
        }

        {this.state.searchClicked && !this.state.flightData && (
            <div className="alert alert-danger" role="alert">
              No Flights Found!
            </div>
          )}

        {this.state.searchClicked && (
          <button className="btn btn-warning" onClick={this.clearFlight}>
            New Search
          </button>
        )}
      </div>
    );
  }
}

ReactDOM.render(<PlushMars />, document.querySelector('.react-wrapper'));
