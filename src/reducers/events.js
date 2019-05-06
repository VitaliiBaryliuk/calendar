import { EVENTS } from '../constants'

export const eventsReducer = (state = {}, action) => {
  switch(action.type) {
    case EVENTS.SET_EVENTS_LIST:
      return { ...state, eventsList: action.payload}

    default:
      return state  
  }
} 