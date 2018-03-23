import React from 'react'
import ReactDOM from 'react-dom'

class DatePicker extends React.Component {

  constructor(props) {
    super()
    this.state = {
      months: props.months,
      days: props.days,
      year: props.year,
      selectedMonth: 1,
      selectedDay: 1,
      selectedYear: 2017,
      arrivalOrDeparture: props.arrivalOrDeparture
    }

    this.dateChanged = this.dateChanged.bind(this)
  }

  componentWillMount() {
    this.dateChanged({
      month:this.state.selectedMonth,
      day: this.state.selectedDay,
      year: this.state.selectedYear
    })
  }

  dateChanged() {
    let date = {
      month: this.state.selectedMonth,
      day: this.state.selectedDay,
      year: this.state.selectedYear
    }
    this.props.dateHandler(date, this.state.arrivalOrDeparture)
  }

  render() {
    let months = this.state.months
    let days = this.state.days
    let year = this.state.year 

    return (
      <div className="date-picker">
        <label>Month</label>
        <select name="month">
         { months.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
        <label>Day</label>
        <select name="day">
         { days.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
        <label>Year</label>
        <select name="year">
         { year.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
      </div>
    )
  }

}

export default DatePicker