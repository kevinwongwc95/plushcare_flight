import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import moment from 'moment';

import SeatSelection from './SeatSelection'
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
      year: [2018],
      totalSeats: 20,
      departureDate: {
        day: 1,
        month: 1,
        year: 2018,
      },
      returnDate: {
        day: 1,
        month: 1,
        year: 2018,
      },
      numberOfSeats: 1, //number of seats selected in the dropdown box
      flightData: null, //data set back from get request after searching for flight
      searchClicked: false, //set to true when search button clicked
      flightBooked: null, // flight booked information
      flightBookedConf: null, // flight confirmation information
      flightSelected: null,
      seatsBooked: [], //list of seat IDs which the user wants to book for flight

      //Error state variables
      currentDateError: false,
      departAfterReturnError: false,
      postError: false,
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.seatChange = this.seatChange.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.clearFlight = this.clearFlight.bind(this);
    this.bookFlight = this.bookFlight.bind(this);
    this.selectFlight = this.selectFlight.bind(this);
    this.setSeatsBooked = this.setSeatsBooked.bind(this);
  }

  selectFlight(flight){
    this.setState({
      flightSelected: flight,
    })
  }

  //function called when booking flight called
  bookFlight(){
    //When booking a flight create a post request
    const request = new Request(postapiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //send the flight ID as a parameter in the body
        flight_id: this.state.flightSelected.id,
        seats: this.state.seatsBooked,
      })
    });

    fetch(request)
    .then(data => data.json())
    .then(jsonData => {
      this.setState({
        flightBookedConf: jsonData,
        flightBooked: this.state.flightSelected,
      });
    });
  }

  //called to change the state date objects
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

  //function called when search button is clicked
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

      //check for date errors
      if(this.dateCheck(this.state.departureDate, this.state.returnDate)){
        return;
      };

      departureDate = 'departure_date=' + departureDate;
      returnDate = 'arrival_date=' + returnDate;

    //create the query params for the GET request
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
        console.log(jsonData);
        if(Object.keys(jsonData).length === 0){
         this.setState({
           noSeatsMessage: true,
         })
       }
        // Update the state object to notify in UI that no flights could be found
        this.setState({
          flightData: jsonData,
          searchClicked: true,
        });
      });
  }

  //called to check the two dates to see if there are errors
  dateCheck(depart_date, return_date){
    if(moment(depart_date).isAfter(return_date)){
      this.setState({
        departAfterReturnError: true,
      });
      return true;
    }
    else{
      this.setState({
        departAfterReturnError: false,
      });
      return false;
    }
  }

  // used to set the state object for arrivalDate or returnDate based on parameter
  // arrivalOrDeparture variable
  dateHandler(dateObject, arrivalOrDeparture) {
    if (arrivalOrDeparture == 'departure') {
      this.setState({ departureDate: dateObject });
    } else {
      this.setState({ returnDate: dateObject });
    }
  }

  //function called when the selection changes in the seat dropdown menu, used to update numberOfSeats
  seatChange(numberOfSeats) {
    this.setState({ numberOfSeats: numberOfSeats.target.value });
  }

  //Called on new Search Button click, used to clear state
  clearFlight() {
    this.setState({
      departureDate: {
        day: 1,
        month: 1,
        year: 2018,
      },
      returnDate: {
        day: 1,
        month: 1,
        year: 2018,
      },
      numberOfSeats: 1,
      flightFound: false,
      searchClicked: false,
      flightData: null, //response from get request listing all the flights
      flightBooked: null,
      flightBookedConf: null,
      currentDateError: false,
      departAfterReturnError: false,
      postError: false,
      noSeatsMessage: false,
      flightSelected: null,
      seatsBooked: [],
    });
  }

  //function which renders the Search Butto
  renderNewSearchButton(){
    if(this.state.searchClicked){
      return(
        <button className="btn btn-warning" onClick={this.clearFlight}>
          New Search
        </button>
      );
    }
  }

  //function which is called when checkboxes are checked in seat selection menu.
  // sets the state of which seats are booked
  setSeatsBooked(seat_id){
    var seatList = this.state.seatsBooked;
    if(seatList.includes(seat_id)){
      const index = seatList.indexOf(seat_id);
      seatList.splice(index, 1);
    }
    else{
      seatList.push(seat_id);
    }
    this.setState({
      seatsBooked: seatList,
    })
  }

  render() {
    console.log(this.state.flightSelected);
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

        {this.state.departAfterReturnError && (
          <div className="error">
            Departing Flight Date must be BEFORE Returning Flight Date
          </div>
        )}

        {this.state.flightData && !this.state.flightBooked && !this.state.noSeatsMessage && !this.state.flightSelected &&(
          <div className="flight-booker">
            <FlightSelector selectFlight={this.selectFlight} flightData={this.state.flightData} />
          </div>
        )}

        {this.state.flightSelected && !this.state.flightBookedConf &&(
            <SeatSelection
              flightSelected={this.state.flightSelected}
              setSeatsBooked={this.setSeatsBooked}
              seatsBooked={this.state.seatsBooked}
            />
        )}

        {this.state.flightSelected && !this.state.flightBookedConf &&(
          <button onClick={()=>this.bookFlight()}  className="btn btn-primary">
            Book Flight
          </button>
        )}

        {this.state.noSeatsMessage && (
          <div className="error">
            No SEATS FOUND!
          </div>
        )}

        {this.state.flightBookedConf &&
          <Confirmation flightBooked={this.state.flightBooked} flightBookedConf={this.state.flightBookedConf}/>
        }

        {this.renderNewSearchButton()}
      </div>
    );
  }
}

ReactDOM.render(<PlushMars />, document.querySelector('.react-wrapper'));
