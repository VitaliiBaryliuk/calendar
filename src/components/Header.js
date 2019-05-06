import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as calendarActions from '../actions/calendar'
import * as addEventModalActions from '../actions/addEventModal'
import searchIcon from '../images/search-icon.png'
var debounce = require('lodash.debounce')

class Header extends Component {
  constructor() {
    super()

    this.state = {
      searchValue: ''
    }
  }

  handlerSearchInput = ({target}) => {
    const searchValue = target.value

    this.setState({
      searchValue 
    })
  }

  searchInCalendar = (eventsList) => {
    let searchValue = this.state.searchValue
    let dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/

    if (new Date(searchValue) !== 'Invalid date' && dateReg.test(searchValue)) {
      this.props.setMonth(new Date(searchValue))
      this.props.setSelectedDate(new Date(searchValue).setHours(0,0,0,0))
    }

    Object.entries(eventsList).map(([date, eventData]) => {
      if (searchValue && (eventData.eventName.includes(searchValue) || eventData.eventInvited.includes(searchValue))) {
        this.props.setMonth(new Date(Number(date)))
        this.props.setSelectedDate(new Date(Number(date)).setHours(0,0,0,0))       
      }
    })
  }

  render() {
    const { showAddEventModal, setSelectedDate, eventsList } = this.props
    
    let debouncedSearchInCalendar = debounce( this.searchInCalendar , 500)

    return (
      <header className="header">
        <div className="header__buttons-menu">
          <button className="header__button" onClick={() => {
            setSelectedDate(null)
            showAddEventModal()
          }}
          >
            Добавить
          </button>
          <button className="header__button"
            onClick={() => setSelectedDate(null)}
          >Обновить</button>
        </div>
        <div className="header__search-menu">
          <img src={searchIcon}  width="35" height="35" alt="search icon"/>
          <input 
            type="text" 
            onChange={(event) => {
              this.handlerSearchInput(event)
              debouncedSearchInCalendar(eventsList)
            }}
            placeholder="Событие, дата(год-мес-день) или участник" 
          />
        </div>
      </header>
    )
  }
} 

const mapStateToProps = (state) => {
  const eventsList = state.eventsReducer.eventsList

  return {
    eventsList
  }
}

const mapDispatchToProps = (dispatch) => ({
  showAddEventModal: () => dispatch(addEventModalActions.showAddEventModal()),
  setSelectedDate: (selectedDate) => dispatch(calendarActions.setSelectedDate(selectedDate)),
  setMonth: (newDate) => dispatch(calendarActions.setMonth(newDate))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);