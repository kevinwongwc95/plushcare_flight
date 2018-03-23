import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import DatePicker from './DatePicker'
import SeatPicker from './SeatPicker'
import FlightSelector from './FlightSelector'

import styles from './css/plushmars.scss'

class PlushMars extends React.Component {

  constructor(props) {
    super()
    this.state = {
      departureDate: null,
      returnDate: null,
      numberOfSeats: 1,
      flightFound: false,
      months: [1,2,3,4,5,6,7,8,9,10,11,12],
      days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      year: [2017],
      seats: 20,
      flightData: null,
      apiUrl: 'http://ec2-54-190-51-40.us-west-2.compute.amazonaws.com/flights/search/?'
    }

    this.submitSearch = this.submitSearch.bind(this)
    this.dateHandler = this.dateHandler.bind(this)
    this.seatChange = this.seatChange.bind(this)
  }

  componentWillMount() {
  }

  submitSearch() {
    let url = this.state.apiUrl
    let seats = 'number_seats=' + this.state.numberOfSeats
    let departureDateObject = this.state.departureDate
    let returnDateObject = this.state.returnDate
    let departureMonth = departureDateObject.month ? departureDateObject.month.toString().length > 1 : '0' + departureDateObject.month 
    let departureDay =  departureDateObject.day ? departureDateObject.day.toString().length > 1 : '0' + departureDateObject.day
    let departureYear = departureDateObject.year

    let departureDate = 'depart_date=' + departureMonth + '-' + departureDay + '-' + departureYear
    let returnDate = 'return_date=' + returnDateObject.month + '-' + returnDateObject.day + '-' + returnDateObject.year

    const request = new Request(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    fetch(request)
      .then(data=>data.json())
      .then(jsonData=>{
      })
    this.setState({flightFound: true})
  }

  dateHandler(dateObject, arrivalOrDeparture) {
    if (arrivalOrDeparture == 'departure') {
      this.setState({departureDate: dateObject})
    } else {
      this.setState({returnDate: dateObject})
    }
  }

  seatChange(numberOfSeats) {
    this.setState({numberOfSeats: numberOfSeats})
  }

  render() {
    let flightFound = this.state.flightFound
    let months = this.state.months
    let days = this.state.days
    let year = this.state.year
    let flightData = this.state.flightData

    return (
      <div>
        <div className="header">Welcome to PlushMars!</div>
          { !flightFound && 
          <div className='flight-finder'>
            <div>Select Departure Date</div>
            <DatePicker
              dateHandler = {this.dateHandler}
              months={months}
              days={days}
              year={year}
              arrivalOrDeparture='arrival'/>
            <div>Select Return Date</div>
            <DatePicker 
              dateHandler = {this.dateHandler}
              months={months}
              days={days}
              year={year}
              arrivalOrDeparture='departure'/>
            <div>Select Number of Seats</div>
            <SeatPicker seatChange={this.seatChange}/>
            <button onClick={this.submitSearch}>Find flights</button>
          </div>
          }

          { flightFound &&
          <div className='flight-booker'>
            <div>Select Seats</div>
            <div>Book this flight</div>
            <FlightSelector flightData={flightData}/>
          </div>
          }
      </div>
    )
  }

}


ReactDOM.render(
  <PlushMars />,
  document.querySelector('.react-wrapper'))
