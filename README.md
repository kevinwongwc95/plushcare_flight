# Plushcare Takehome

## Error Handeling
When fixing the application, I assumed that `departure_date` had to occur before `return_date` or else the user would be prompted with an error message.

## Assumptions
When searching for flights, a GET request with `numberOFSeats`, `departure_date`, and `return_date`.

## Issues
The components were originally maintaining their own state, when they could have been stateless. I took the state out of the original components and maintained state in the outermost component `app.jsx`.


### API
I noticed the GET request to `API_URL/flights/search` was not working if either `depart_date` or `return_date` was provided as a parameter. From using Postman, and testing, it seemed like regardless of what was sent besides those parameters, random data would be returned.

## Components

#### `App.jsx`
Outermost component of the app, which manages the state of the application which it passes down as props to sub-components.

#### `DatePicker.jsx`
Used to select Departure date and Returning flight date. Through an `onChange` function passed as props, the state in `App.jsx` is updated to reflect the current values in the fields.

#### `FlightSelector.jsx`
Displays in a table view the information about each flight returned when clicking the search button which fills the state with a json object of the response from a GET request. When clicking the buttton to book a flight it calls the `bookFlight`, which will then initiate a POST request with the flight_id of the flight associated with the button id, which is the same as the flight_id.

#### `Confirmation.jsx`
Rendered when the post request has returned successfully with information and updated `flightBookedConf` state variable. The component displays the basic information from the result of the post request.

## State variables & Management

`departureDate` Holds the current departure date of the dropdown menu
`returnDate` Holds the current departure date of the dropdown menu
`numberOfSeats` Holds the current number of seats from the dropdown menu
`months`The possible months to be booked
`days` The possible days to be booked
`year`: The possible years to be booked
`totalSeats` Represents the Total seats possible to be booked
`flightData` Flight Data is the response data from the GET requests with the given parameters
`flightBooked` Holds JSON data and is loaded once the booked button is clicked and the post request return with an ok.
