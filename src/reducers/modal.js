import { MODAL } from '../constants'

export const modalReducer = (state = {}, action) => {
  switch(action.type) {
    case MODAL.SHOW_ADD_EVENT_MODAL:
      return {
        ...state,
        isOpenAddEventModal: action.payload
      }
    case MODAL.CLOSE_ADD_EVENT_MODAL:
      return {
      ...state,
      isOpenAddEventModal: action.payload
    }
    
    default:
      return state
  }
}