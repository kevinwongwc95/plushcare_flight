# Plushcare Takehome

## Issues
The components were originally maintaining their own state, when they could have been stateless, which is recommended per React guidelines/docs.


## API
I noticed the GET request to `API_URL/flights/search` was not working if either `depart_date` or `return_date` was provided as a parameter. From using Postman, and testing, it seemed like regardless of what was sent besides those parameters, random data would be returned.

Additionally the data returned back in the GET request is seemingly random regardless of what query parameters sent to it.

The POST request instructions seem to be incorrect, again using Postman to test sending `{"flight_id": `1-2-3`}`, yielded a 422 error.

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
