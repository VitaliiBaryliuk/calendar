import { CALENDAR } from '../constants'

export const calendarReducer = (state = {}, action) => {
  switch(action.type) {
    case CALENDAR.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload }
    case CALENDAR.SET_MONTH: {
      return { ...state, monthData: action.payload}
    }

    default:
      return state
  }
}