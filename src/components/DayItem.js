import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import * as calendarActions from '../actions/calendar'
import * as modalActions from '../actions/addEventModal'
import { CALENDAR } from '../constants'

const DayItem = ({rowIndex, weekIndex, date, event, selectedDate, setSelectedDate, showAddEventModal}) => (
  <td 
    className={date.setHours(0,0,0,0) === selectedDate ? 'calendar__day selected' : 'calendar__day'} 
    onClick={() => setSelectedDate(date.setHours(0,0,0,0))}
    onDoubleClick={() => showAddEventModal()}
    style={
      new Date().setHours(0,0,0,0) === date.setHours(0,0,0,0) 
      ? {'backgroundColor': '#F4F4F4'} 
      : event 
      ? {'backgroundColor': 'rgba(0, 153, 255, 0.5)'} 
      : {} 
    }>
    { 
      rowIndex === 0 && date === '' 
      ? CALENDAR.WEEK_DEYS_TITLES[weekIndex]
      : rowIndex === 0 
      ? <Fragment>{CALENDAR.WEEK_DEYS_TITLES[weekIndex]}, {date.getDate()}</Fragment> 
      : date.getDate()
    }
    {
      event 
      ? <p>{event.eventName}</p>
      : ''
    }
    <br />
  </td>
)

const mapStateToProps = (state) => {
  const selectedDate = state.calendarReducer.selectedDate 
  const monthData = state.calendarReducer.monthData
  return {
    selectedDate,
    monthData
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedDate:(selectedDate) => dispatch(calendarActions.setSelectedDate(selectedDate)),
  showAddEventModal: () => dispatch(modalActions.showAddEventModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayItem);