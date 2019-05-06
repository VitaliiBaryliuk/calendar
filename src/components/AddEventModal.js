import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as addEventModalActions from '../actions/addEventModal'
import * as eventsActions from '../actions/events'
import * as calendarActions from '../actions/calendar'

import closeIcon from '../images/close-icon.png'

class AddEventModal extends Component {
  constructor() {
    super()

    this.state = {
      eventName: '',
      eventDate: '',
      eventInvited: '',
      eventDescription: ''
    }    
  }

  componentDidMount() {
    if (this.props.eventsList[this.props.selectedDate]) {
      this.setState({
        ...this.props.eventsList[this.props.selectedDate]
      })
    }
  }

  handlerInputChage({target}) {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const { eventName, eventDate, eventInvited, eventDescription } = this.state
    const { closeAddEventModal, addEvent, setMonth, setSelectedDate, removeEvent, eventsList } = this.props
    const selectedDate =  eventDate ? new Date(eventDate).setHours(0,0,0,0)  : this.props.selectedDate 
    const newEvent = { 
      [selectedDate] : { 
        ...this.state 
      } 
    }

    return (
      <div className="modal">
        <img className="modal__close-icon" src={closeIcon} onClick={() => closeAddEventModal()} alt="close icon"/>
        <form className="modal__form"> 
          <input type="text" onChange={(e) => this.handlerInputChage(e)} value={eventName} name="eventName" placeholder="Событие" required />
          <input type="date" onChange={(e) => this.handlerInputChage(e)} value={eventDate} name="eventDate" placeholder="День, месяц, год" />
          <input type="text" onChange={(e) => this.handlerInputChage(e)} value={eventInvited} name="eventInvited" placeholder="Имена участников" />
          <textarea onChange={(e) => this.handlerInputChage(e)} value={eventDescription} name="eventDescription" placeholder="Описание"></textarea>
          <div className="modal__buttons">
            <button onClick={async (event) => {
                setMonth(new Date(selectedDate))
                setSelectedDate(selectedDate)
                addEvent(newEvent, eventsList)
                closeAddEventModal()
                event.preventDefault()
              }
            }>Готово</button>
            <button onClick={() => {
              removeEvent(selectedDate, eventsList)
              closeAddEventModal()
            }}>Удалить</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const eventsList = state.eventsReducer.eventsList
  const selectedDate = state.calendarReducer.selectedDate

  return {
    eventsList,
    selectedDate
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeAddEventModal: () => dispatch(addEventModalActions.closeAddEventModal()),
  addEvent: (newEvent, eventsList) => eventsActions.addEvent(dispatch, newEvent, eventsList),
  removeEvent: (event, eventsList) => eventsActions.removeEvent(dispatch, event, eventsList),
  setMonth: (newDate) => dispatch(calendarActions.setMonth(newDate)),
  setSelectedDate: (selectedDate) => dispatch(calendarActions.setSelectedDate(selectedDate)) 
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AddEventModal)