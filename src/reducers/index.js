import { combineReducers } from 'redux'

import { calendarReducer } from './calendar'
import { modalReducer } from './modal'
import { eventsReducer } from './events'

export default combineReducers({
  calendarReducer,
  modalReducer,
  eventsReducer
})