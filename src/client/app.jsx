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

//URL POST api endpoint
const postapiUrl =
    'http://ec2-54-190-51-40.us-west-2.compute.amazonaws.com/flights/select/';

class PlushMars extends React.Component {
  constructor(props) {
    super();
    this.state = {
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: [moment().year()],
      totalSeats: 20,
      departureDate: {
        day: moment().day() + 1,
        month: moment().month() + 1,
        year: moment().year() + 1,
      },
      returnDate: {
        day: moment().day() + 1,
        month: moment().month() + 1,
        year: moment().year() + 1,
      },
      numberOfSeats: 1,
      flightData: null,
      searchClicked: false,
      flightBooked: null,
      flightBookedConf: null,

      //Error state variables
      currentDateError: false,
      departAfterReturnError: false,
      postError: false,
      noSeatsMessage: false,
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.seatChange = this.seatChange.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.clearFlight = this.clearFlight.bind(this);
    this.bookFlight = this.bookFlight.bind(this);
  }

  bookFlight(flight){
    //When booking a flight create a post request
    const request = new Request(postapiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //send the flight ID as a parameter in the bod y
        flight_id: flight.id,
      })
    });

    fetch(request)
    .then(data => data.json())
    .then(jsonData => {
      this.setState({
        flightBookedConf: jsonData,
        flightBooked: flight,
      });
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

      this.dateCheck(departureDate, returnDate);

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
        let filteredFlights = jsonData.filter(x => x.available_seats.length >= this.state.numberOfSeats);
        console.log(filteredFlights);
        if(Object.keys(filteredFlights).length === 0){
          this.setState({
            noSeatsMessage: true,
          })
        }
        this.setState({
          //filter the flightData results and only populate the state with
          //which meet the seat requirement
          flightData: filteredFlights,
          searchClicked: true,
        });
      });
  }

  dateCheck(depart_date, return_date){
    if(moment(depart_date).isAfter(return_date)){
      this.setState({
        departAfterReturnError: true,
      })
    }
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

  //Called on new Search Button click, used to clear state
  clearFlight() {
    this.setState({
      flightFound: false,
      searchClicked: false,
      flightData: null,
      flightBooked: null,
      flightBookedConf: null,
      currentDateError: false,
      departAfterReturnError: false,
      postError: false,
      noSeatsMessage: false,
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
                days={this.state.days}
                months={this.state.months}
                year={this.state.year}
                arrivalOrDeparture="departure"
                dateChanged={this.dateChanged}
              />
            </div>
            <div className="row">
              <h2>Return Date</h2>
              <DatePicker
                days={this.state.days}
                months={this.state.months}
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

        {this.state.flightData && !this.state.flightBooked && !this.state.noSeatsMessage && (
          <div className="flight-booker">
            <FlightSelector bookFlight={this.bookFlight} flightData={this.state.flightData} />
          </div>
        )}

        {this.state.noSeatsMessage && (
          <div>
            No SEATS FOUND!
          </div>
        )}

        {this.state.flightBookedConf &&
          <Confirmation flightBooked={this.state.flightBooked} flightBookedConf={this.state.flightBookedConf}/>
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
