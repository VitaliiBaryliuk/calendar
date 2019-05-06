import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as calendarActions from '../actions/calendar'
import * as addEventModalActions from '../actions/addEventModal'
import * as eventsActions from '../actions/events'

import DayItem from './DayItem'
import AddEventModal from './AddEventModal'

class Calendar extends Component {
  componentDidMount() {
    this.props.getEventsList()
    this.props.setMonth() 
  }

  render() {
    const {  monthData, setMonth, setSelectedDate, isOpenAddEventModal, eventsList} = this.props
    const date =  monthData ? monthData.date : null

    return (
      <div className="calendar">
        { isOpenAddEventModal && <AddEventModal /> }
        <div className="calendar__month-changer">
          <button className="calendar__button" onClick={() => setMonth(new Date(date.setMonth(monthData.date.getMonth() - 1)))}>&#60;</button>
          { monthData && `${monthData.title} ${monthData.date.getFullYear()}` }
          <button className="calendar__button" onClick={() => setMonth(new Date(date.setMonth(monthData.date.getMonth() + 1)))}>&#62;</button>          
          <button className="calendar__button" onClick={() => {
            setMonth(new Date())
            setSelectedDate(new Date().setHours(0,0,0,0))
          }}
          >
            Сегодня
          </button>
        </div>
        <table className="calendar__table">
        <tbody>
          { monthData && monthData.items.map((week, rowIndex) => 
              <tr key={rowIndex} >
                { week.map((day, weekIndex) => 
                  <DayItem 
                    key={weekIndex} 
                    date={day}
                    rowIndex={rowIndex} 
                    weekIndex={weekIndex} 
                    event={ eventsList && eventsList[day.setHours(0,0,0,0)]}
                  />
                )}
              </tr>  
          ) }
        </tbody>
        </table>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const monthData = state.calendarReducer.monthData
  const isOpenAddEventModal = state.modalReducer.isOpenAddEventModal
  const eventsList = state.eventsReducer.eventsList
  
  return {
    monthData,
    isOpenAddEventModal,
    eventsList
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMonth: (newDate) => dispatch(calendarActions.setMonth(newDate)),
  closeAddEventModal: () => dispatch(addEventModalActions.closeAddEventModal()),
  getEventsList: () => eventsActions.getEventsList(dispatch),
  setSelectedDate: (selectedDate) => dispatch(calendarActions.setSelectedDate(selectedDate))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

