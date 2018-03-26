import React from 'react'
import ReactDOM from 'react-dom'

class DatePicker extends React.Component {
  render() {

    return (
      <div className="date-picker">
        <label>Month</label>
        <select name="month" onChange={(e)=>this.props.dateChanged(this.props.arrivalOrDeparture,e)}>
         { this.props.months.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
        <label>Day</label>
        <select name="day" onChange={(e)=>this.props.dateChanged(this.props.arrivalOrDeparture,e)}>
         { this.props.days.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
        <label>Year</label>
        <select name="year" onChange={(e)=>this.props.dateChanged(this.props.arrivalOrDeparture,e)}>
         { this.props.year.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
      </div>
    )
  }

}

export default DatePicker
