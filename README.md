# Plushcare Takehome

## Error Handling
When fixing the application, I assumed that `departure_date` had to occur before `return_date` or else the user would be prompted with an error message.

If the GET or POST requests failed, a message would be displayed to the user.

## Assumptions
I assumed that all valid dates were available to be sent in the query even if the date was before the current date, just as long as the `departure_date` was not after the `return_date`

## Issues
The components were originally maintaining their own state, when they could have been stateless. I took the state out of the original components and maintained state in the outermost component `app.jsx`.

### API
I noticed the GET request to `API_URL/flights/search` was not working if either `depart_date` or `return_date` was provided as a parameter. From using Postman, and testing, it seemed like regardless of what was sent besides those parameters, random data would be returned.

#### GET request
When searching for flights, a GET request was sent with `numberOfSeats`, `departure_date`, and `return_date`.

#### POST request
When sending a POST request to book a flight, the id of the flight booked was sent, along with a list of the `seat_id` which were being booked.

## Components

#### `App.jsx`
Outermost component of the app, which manages the state of the application which it passes down as props to sub-components.

#### `DatePicker.jsx`
Used to select Departure date and Returning flight date. Through an `onChange` function passed as props, the state in `App.jsx` is updated to reflect the current values in the fields.

#### `FlightSelector.jsx`
Displays in a table view the information about each flight returned when clicking the search button which fills the state with a JSON object of the response from a GET request. When clicking the button to book a flight it calls the `bookFlight`, which will then initiate a POST request with the flight_id of the flight associated with the button id, which is the same as the flight_id.

#### `Confirmation.jsx`
Rendered when the post request has returned successfully with information and updated `flightBookedConf` state variable. The component displays the basic information from the result of the post request.

#### `TotalCost.jsx`
Displays the total cost of the flight based on the seats selected and the price per seat of the flight selected.

#### `FlightInfo.jsx`
Displays the information regarding a particular flight based on the props called `FlightSelected`

#### `SeatSelection.jsx`
Component which displays the seats on a particular flight, based on props `flight_selected`. This allows the user to pick the seat position and shows the user the total cost when adding each seat.

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

`departAfterReturnError` Variable which is set to true if the `departure_date` was before the `return_date`.
`postError` Variable which is set to true if the POST request fails when booking a flight.
`getError` Variable which is set to true if the GET request fails to search for flights.
